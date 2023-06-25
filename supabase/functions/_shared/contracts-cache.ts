import { Contract, interfaces, utils } from "koilib"
import { NetworkConfig } from "./networks.ts";
import { supabase } from "./client.ts";

export class ContractsCache {
  private contracts: Record<string, Contract> = {}
  private networkConfig: NetworkConfig

  constructor(networkConfig: NetworkConfig, abis?: Record<string, interfaces.Abi>) {
    this.networkConfig = networkConfig
    const { provider, chainId } = this.networkConfig

    for (const contractId in abis) {
      const abi = abis[contractId];

      this.contracts[contractId] = new Contract({
        id: contractId,
        abi: this.fixAbi(abi),
        provider
      })
    }

    const knownContracts: Record<string, Record<string, Contract>> = {
      // mainnet
      "iBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA==": {
        // Koin
        "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL": new Contract({
          id: "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
          provider,
          abi: utils.tokenAbi
        }),
        // VHP
        "1AdzuXSpC6K9qtXdCBgD5NUpDNwHjMgrc9": new Contract({
          id: "1AdzuXSpC6K9qtXdCBgD5NUpDNwHjMgrc9",
          provider,
          abi: utils.tokenAbi
        }),
      },
      // harbinger
      "EiAAKqFi-puoXnuJTdn7qBGGJa8yd-dcS2P0ciODe4wupQ==": {
        // Koin
        "19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ": new Contract({
          id: "19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ",
          provider,
          abi: utils.tokenAbi
        }),
        // VHP
        "1JZqj7dDrK5LzvdJgufYBJNUFo88xBoWC8": new Contract({
          id: "1JZqj7dDrK5LzvdJgufYBJNUFo88xBoWC8",
          provider,
          abi: utils.tokenAbi
        }),
      }
    }

    this.contracts = {
      ...this.contracts,
      ...knownContracts[chainId]
    }
  }

  fixAbi(abi: interfaces.Abi): interfaces.Abi {
    Object.keys(abi.methods).forEach((name) => {
      abi!.methods[name] = {
        ...abi!.methods[name]
      }

      //@ts-ignore this is needed to be compatible with "old" abis
      if (abi.methods[name]['entry-point']) {
        //@ts-ignore this is needed to be compatible with "old" abis
        abi.methods[name].entry_point = parseInt(abi.methods[name]['entry-point'])
      }
    })

    return abi
  }

  async getContract(contract_id: string): Promise<Contract | undefined> {
    if (!this.contracts[contract_id]) {
      const { data: contractAbi, error: selectError } = await supabase
        .from("contract_abis")
        .select()
        .eq("contract_id", contract_id)
        .eq("chain_id", this.networkConfig.chainId)
        .maybeSingle();

      if (selectError) {
        throw selectError;
      }

      let abi: interfaces.Abi | undefined

      if (contractAbi) {
        const deltaTime = new Date().getTime() - contractAbi.updated_at

        // 5 min cache
        if (deltaTime <= 60000 * 5) {
          abi = JSON.parse(contractAbi.abi)
        }
      }

      if (!abi) {
        const contract = new Contract({
          id: contract_id,
          provider: this.networkConfig.provider
        })

        abi = await contract.fetchAbi()

        if (abi) {
          abi = this.fixAbi(abi)
          const { error: upsertError } = await supabase
            .from('contract_abis')
            .upsert([{ contract_id, chain_id: this.networkConfig.chainId, abi: JSON.stringify(abi), updated_at: new Date().getTime() }])

          if (upsertError) {
            throw upsertError;
          }
        }
      }

      if (abi) {
        this.contracts[contract_id] = new Contract({
          id: contract_id,
          provider: this.networkConfig.provider,
          abi
        })
      }
    }

    return this.contracts[contract_id]
  }
}