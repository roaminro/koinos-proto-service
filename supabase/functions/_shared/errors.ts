import { json } from "sift";
import { corsHeaders } from "./cors.ts";

export class ApplicationError extends Error {
  status: number;

  constructor(message: string, status: number = 400) {
    super(message);

    this.name = Error.name;
    this.status = status;
    Error.captureStackTrace(this);
  }
}

export class PreflightHandler extends Error {
  constructor() {
    super("");
    this.name = Error.name;
    Error.captureStackTrace(this);
  }
}

export function formatError(error: Error | ApplicationError) {
  if (error instanceof PreflightHandler) {
    return new Response(null, {
      headers: {
        ...corsHeaders,
      },
    });
  }

  console.log(error);

  if (error instanceof ApplicationError) {
    return json(
      {
        status: "error",
        data: {
          message: error.message,
        },
      },
      {
        status: error.status,
        headers: {
          ...corsHeaders,
        },
      }
    );
  }

  return json(
    {
      status: "error",
      data: {
        message: "An unexpected error occured.",
      },
    },
    {
      status: 400,
      headers: {
        ...corsHeaders,
      },
    }
  );
}
