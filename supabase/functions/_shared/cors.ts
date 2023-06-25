import { PreflightHandler } from "./errors.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export function handlePreflight(request: Request) {
  if (request.method === "OPTIONS") {
    throw new PreflightHandler();
  }
}
