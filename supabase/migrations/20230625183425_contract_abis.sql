create table "public"."contract_abis" (
    "contract_id" text not null,
    "chain_id" text not null,
    "updated_at" bigint not null,
    "abi" text not null
);


alter table "public"."contract_abis" enable row level security;

CREATE UNIQUE INDEX contract_abis_pkey ON public.contract_abis USING btree (contract_id, chain_id);

alter table "public"."contract_abis" add constraint "contract_abis_pkey" PRIMARY KEY using index "contract_abis_pkey";


