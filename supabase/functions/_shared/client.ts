import { createClient } from "supabase-js";
import { Database } from "../../types/database.types.ts";

export const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);