export interface DecodedOperationJson {
  call_contract: {
    contract_id: string;
    entry_point: string;
    args?: Record<string, unknown>;
  }
}

export interface DecodedEventJson {
  sequence: number;
  source: string;
  name: string;
  data?: Record<string, unknown>;
  impacted: string[];
}