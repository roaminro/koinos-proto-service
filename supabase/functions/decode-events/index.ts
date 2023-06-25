import { serve } from "server"
import { interfaces, utils } from "koilib"
import { json } from "sift"
import { handlePreflight } from "../_shared/cors.ts"
import { ApplicationError, formatError } from "../_shared/errors.ts"
import { DecodedEventJson } from "../_shared/interfaces.ts"
import { getNetworkConfig } from "../_shared/networks.ts"
import { ContractsCache } from "../_shared/contracts-cache.ts"

serve(async (request: Request) => {
  try {
    handlePreflight(request);

    const { events, abis, network } = (await request.json()) as {
      events: interfaces.EventData[];
      abis: Record<string, interfaces.Abi>;
      network: string;
    };

    const networkConfig = getNetworkConfig(network)

    if (!network) {
      throw new ApplicationError("unknown network")
    }

    const decodedEvents: DecodedEventJson[] = []
    const contractsCache = new ContractsCache(networkConfig, abis)

    for (const ev of events) {
      const { source } = ev

      // handle cases where contract_id is not base58 encoded, but base64 encoded
      let decodedContractId = source
      try {
        utils.decodeBase58(source)
      } catch (_) {
        decodedContractId = utils.encodeBase58(utils.decodeBase64(source))
      }

      const contract = await contractsCache.getContract(decodedContractId)

      if (contract && contract.functions) {
        const decodedEvent = await contract.decodeEvent({
         ...ev,
         source: decodedContractId 
        })

        decodedEvents.push({
          sequence: decodedEvent.sequence,
          source: decodedEvent.source,
          name: decodedEvent.name,
          data: decodedEvent.args,
          impacted: decodedEvent.impacted,
        })
      }
    }

    return json({
      decodedEvents
    })
  } catch (error) {
    return formatError(error);
  }
})
