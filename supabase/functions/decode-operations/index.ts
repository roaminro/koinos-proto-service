import { serve } from "server"
import { interfaces, utils } from "koilib"
import { json } from "sift"
import { handlePreflight } from "../_shared/cors.ts"
import { ApplicationError, formatError } from "../_shared/errors.ts"
import { DecodedOperationJson } from "../_shared/interfaces.ts"
import { getNetworkConfig } from "../_shared/networks.ts"
import { ContractsCache } from "../_shared/contracts-cache.ts"

serve(async (request: Request) => {
  try {
    handlePreflight(request);

    const { operations, abis, network } = (await request.json()) as {
      operations: interfaces.OperationJson[];
      abis: Record<string, interfaces.Abi>;
      network: string;
    };

    const networkConfig = getNetworkConfig(network)

    if (!network) {
      throw new ApplicationError("unknown network")
    }

    const decodedOperations: DecodedOperationJson[] = []
    const contractsCache = new ContractsCache(networkConfig, abis)

    for (const op of operations) {
      const { call_contract } = op
      if (call_contract) {
        const { contract_id } = call_contract
        
        // handle cases where contract_id is not base58 encoded, but base64 encoded
        let decodedContractId = contract_id
        try {
          utils.decodeBase58(contract_id)
        } catch (_) {
          decodedContractId = utils.encodeBase58(utils.decodeBase64(contract_id))
        }

        const contract = await contractsCache.getContract(decodedContractId)

        if (contract && contract.functions) {
          const decodedOp = await contract.decodeOperation({
            call_contract: {
              ...call_contract,
              contract_id: decodedContractId
            }
          })

          decodedOperations.push({
            call_contract: {
              contract_id: decodedContractId,
              entry_point: decodedOp.name,
              args: decodedOp.args
            }
          })
        }
      }
    }

    return json({
      decodedOperations
    })
  } catch (error) {
    return formatError(error);
  }
})
