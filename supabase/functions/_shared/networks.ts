import { Provider } from "koilib"

export interface NetworkConfig {
  provider: Provider,
  chainId: string
}

const networks: Record<string, NetworkConfig> = {
  "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA==": {
    provider: new Provider(Deno.env.get("MAINNET_JSON_RPC")!),
    chainId: "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA=="
  },
  "EiAAKqFi-puoXnuJTdn7qBGGJa8yd-dcS2P0ciODe4wupQ==": {
    provider: new Provider(Deno.env.get("HARBINGER_JSON_RPC")!),
    chainId: "EiAAKqFi-puoXnuJTdn7qBGGJa8yd-dcS2P0ciODe4wupQ=="
  }
}

export function getNetworkConfig(network: string) {
  let parsedNetwork = network
  if (network === "mainnet") {
    parsedNetwork = "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA=="
  } else if (network === "harbinger") {
    parsedNetwork = "EiAAKqFi-puoXnuJTdn7qBGGJa8yd-dcS2P0ciODe4wupQ=="
  }

  return networks[parsedNetwork]
}