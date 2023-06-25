## Koinos proto service
A service to help you decode Koinos operations and events.

## `functions/v1/decode-operations`
Endpoint to decode Koinos operations using abis. By default abis are pulled from the Koinos network directly.

Arguments:
  - network (required): 
    - description: network where to pull the contract abis from
    - accepted values: 
      - "harbinger"
      - "mainnet"
      - "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA=="
      - "EiAAKqFi-puoXnuJTdn7qBGGJa8yd-dcS2P0ciODe4wupQ=="
  - operations (required):
    - descriptions: list of encoded operations
  - abis (optional):
    - description: map that can be used to provide custom abis

Result: Array of operations that were decoded. All operations that were not decodable will not show in the result.

Example query:
```bash
curl  -X POST \
  'http://localhost:54321/functions/v1/decode-operations' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "network": "harbinger",
  "operations": [
    {
      "call_contract": {
        "contract_id": "19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ",
        "entry_point": 670398154,
        "args": "ChkA-JATcIGTbL82zeOOQLkWYPhc5KarXxq6EhkAz7mMv_Ho6Jr03EBzSjxT_RAq6uXhjEuKGIDQ28P0Ag=="
      }
    }
  ],
  "abis": {
    "19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ": {
    "methods": {
        "name": {
            "argument": "token.name_arguments",
            "return": "token.name_result",
            "description": "Returns the token's name",
            "entry_point": 2191741823,
            "read_only": true
        },
        "symbol": {
            "argument": "token.symbol_arguments",
            "return": "token.symbol_result",
            "description": "Returns the token's symbol",
            "entry_point": 3077209249,
            "read_only": true
        },
        "decimals": {
            "argument": "token.decimals_arguments",
            "return": "token.decimals_result",
            "description": "Returns the token's decimals precision",
            "entry_point": 4001430831,
            "read_only": true
        },
        "total_supply": {
            "argument": "token.total_supply_arguments",
            "return": "token.total_supply_result",
            "description": "Returns the token's total supply",
            "entry_point": 2967091508,
            "read_only": true
        },
        "max_supply": {
            "argument": "token.max_supply_arguments",
            "return": "token.max_supply_result",
            "description": "Returns the token's max supply",
            "entry_point": 46564349,
            "read_only": true
        },
        "balance_of": {
            "argument": "token.balance_of_arguments",
            "return": "token.balance_of_result",
            "description": "Checks the balance at an address",
            "entry_point": 1550980247,
            "read_only": true
        },
        "transfer": {
            "argument": "token.transfer_arguments",
            "return": "token.empty_message",
            "description": "Transfers the token",
            "entry_point": 670398154,
            "read_only": false
        },
        "mint": {
            "argument": "token.mint_arguments",
            "return": "token.empty_message",
            "description": "Mints the token",
            "entry_point": 3698268091,
            "read_only": false
        },
        "burn": {
            "argument": "token.burn_arguments",
            "return": "token.empty_message",
            "description": "Burns the token",
            "entry_point": 2241834181,
            "read_only": false
        }
    },
    "types": {
        "nested": {
            "token": {
                "nested": {
                    "empty_message": {
                        "fields": {}
                    },
                    "name_arguments": {
                        "fields": {}
                    },
                    "name_result": {
                        "fields": {
                            "value": {
                                "type": "string",
                                "id": 1
                            }
                        }
                    },
                    "symbol_arguments": {
                        "fields": {}
                    },
                    "symbol_result": {
                        "fields": {
                            "value": {
                                "type": "string",
                                "id": 1
                            }
                        }
                    },
                    "decimals_arguments": {
                        "fields": {}
                    },
                    "decimals_result": {
                        "fields": {
                            "value": {
                                "type": "uint32",
                                "id": 1
                            }
                        }
                    },
                    "total_supply_arguments": {
                        "fields": {}
                    },
                    "total_supply_result": {
                        "fields": {
                            "value": {
                                "type": "uint64",
                                "id": 1,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "max_supply_arguments": {
                        "fields": {}
                    },
                    "max_supply_result": {
                        "fields": {
                            "value": {
                                "type": "uint64",
                                "id": 1,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "balance_of_arguments": {
                        "fields": {
                            "owner": {
                                "type": "bytes",
                                "id": 1,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            }
                        }
                    },
                    "balance_of_result": {
                        "fields": {
                            "value": {
                                "type": "uint64",
                                "id": 1,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "transfer_arguments": {
                        "fields": {
                            "from": {
                                "type": "bytes",
                                "id": 1,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "to": {
                                "type": "bytes",
                                "id": 2,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "value": {
                                "type": "uint64",
                                "id": 3,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "mint_arguments": {
                        "fields": {
                            "to": {
                                "type": "bytes",
                                "id": 1,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "value": {
                                "type": "uint64",
                                "id": 2,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "burn_arguments": {
                        "fields": {
                            "from": {
                                "type": "bytes",
                                "id": 1,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "value": {
                                "type": "uint64",
                                "id": 2,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "balance_object": {
                        "fields": {
                            "value": {
                                "type": "uint64",
                                "id": 1,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "mint_event": {
                        "fields": {
                            "to": {
                                "type": "bytes",
                                "id": 1,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "value": {
                                "type": "uint64",
                                "id": 2,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "burn_event": {
                        "fields": {
                            "from": {
                                "type": "bytes",
                                "id": 1,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "value": {
                                "type": "uint64",
                                "id": 2,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    },
                    "transfer_event": {
                        "fields": {
                            "from": {
                                "type": "bytes",
                                "id": 1,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "to": {
                                "type": "bytes",
                                "id": 2,
                                "options": {
                                    "(koinos.btype)": "ADDRESS"
                                }
                            },
                            "value": {
                                "type": "uint64",
                                "id": 3,
                                "options": {
                                    "jstype": "JS_STRING"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
  }
}'
```

Result:
```bash
{
    "decodedOperations": [
        {
            "call_contract": {
            "contract_id": "19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ",
            "entry_point": "transfer",
            "args": {
                "from": "1PfHB9SFTiM7vmZvMNeb9rY8adD8ZcUrtZ",
                "to": "1KwM9wFJ9u9qBgeAEs5v32GyB1EQ2bZQBB",
                "value": "100000000000"
            }
            }
        }
    ]
}
```

## `functions/v1/decode-events`
Endpoint to decode Koinos events using abis. By default abis are pulled from the Koinos network directly.

Arguments:
  - network (required): 
    - description: network where to pull the contract abis from
    - accepted values: 
      - "harbinger"
      - "mainnet"
      - "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA=="
      - "EiAAKqFi-puoXnuJTdn7qBGGJa8yd-dcS2P0ciODe4wupQ=="
  - events (required):
    - descriptions: list of encoded events
  - abis (optional):
    - description: map that can be used to provide custom abis

Result: Array of events that were decoded. All events that were not decodable will not show in the result.

Example query:
```bash
curl  -X POST \
  'http://localhost:54321/functions/v1/decode-events' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "network": "harbinger",
  "events": [
    {
      "sequence": 2,
      "source": "19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ",
      "name": "koinos.contracts.token.transfer_event",
      "data": "ChkAlAebhJfx6o777mZgdwaCxTKHOSQ1fr5jEhkAW_JVLsDZvLQZuobYyMrdRF7kVsUUDgpaGICJeg==",
      "impacted": [
        "19PAo2nmzaUWdDfez9HmaaWUeYD2KxxBsP",
        "1EVi7yBk44V6nwxdNtumXQtzFcHsQ74VMt"
      ]
    },
    {
      "sequence": 3,
      "source": "1JZqj7dDrK5LzvdJgufYBJNUFo88xBoWC8",
      "name": "koinos.contracts.token.transfer_event",
      "data": "ChkAnJlU7kczMVWpLUmMq8raNsjWfxZNGHJREhkAlAebhJfx6o777mZgdwaCxTKHOSQ1fr5jGMCEPQ==",
      "impacted": [
        "1EVi7yBk44V6nwxdNtumXQtzFcHsQ74VMt",
        "1FH26byhDERA3GiaSS6EmfVoYAeUp3CeRv"
      ]
    }
  ]
}'
```

Result:
```bash
{
    "decodedEvents": [
        {
            "sequence": 2,
            "source": "19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ",
            "name": "koinos.contracts.token.transfer_event",
            "data": {
            "from": "1EVi7yBk44V6nwxdNtumXQtzFcHsQ74VMt",
            "to": "19PAo2nmzaUWdDfez9HmaaWUeYD2KxxBsP",
            "value": "2000000"
            },
            "impacted": [
            "19PAo2nmzaUWdDfez9HmaaWUeYD2KxxBsP",
            "1EVi7yBk44V6nwxdNtumXQtzFcHsQ74VMt"
            ]
        },
        {
            "sequence": 3,
            "source": "1JZqj7dDrK5LzvdJgufYBJNUFo88xBoWC8",
            "name": "koinos.contracts.token.transfer_event",
            "data": {
            "from": "1FH26byhDERA3GiaSS6EmfVoYAeUp3CeRv",
            "to": "1EVi7yBk44V6nwxdNtumXQtzFcHsQ74VMt",
            "value": "1000000"
            },
            "impacted": [
            "1EVi7yBk44V6nwxdNtumXQtzFcHsQ74VMt",
            "1FH26byhDERA3GiaSS6EmfVoYAeUp3CeRv"
            ]
        }
    ]
}
```

### Development

```bash
git clone https://github.com/roaminro/koinos-proto-service.git
yarn install
yarn supabase:start
yarn supabase:serve-functions
```