import type {
  D1Database,
  PagesFunction,
  Response as CFResponse,
  FormData,
  Request,
  IncomingRequestCfProperties,
} from "@cloudflare/workers-types";

/**
 * Environment variables interface for Cloudflare Pages Function
 * @property DISCORD_WEBHOOK - URL for Discord webhook to send form notifications
 * @property TURNSTILE_SECRET_KEY - Secret key for validating Cloudflare Turnstile tokens
 */
export interface Env {
  DISCORD_WEBHOOK: string;
  TURNSTILE_SECRET_KEY: string;
  DB: D1Database;
}

/**
 * Main request handler for processing form submissions and sending them to Discord.
 * Validates Cloudflare Turnstile tokens and routes requests to specialized form handlers.
 * Records validation results in Discord messages for spam prevention monitoring.
 *
 * @param context - Pages Function context with request data and environment variables
 * @returns CFResponse:
 *          - context.next() for non-POST requests
 *          - Success (200) if form processed, even with invalid token
 *          - Error (400) if form name unknown
 *          - Error (500) if Discord webhook fails
 */
export const onRequest: PagesFunction<Env> = async (
  context,
): Promise<CFResponse> => {
  const discord_hook = context.env.DISCORD_WEBHOOK;
  const turnstile_secret = context.env.TURNSTILE_SECRET_KEY;

  const request = context.request;

  if (request.method !== "POST") {
    return context.next();
  }

  const connection = context.env.DB;

  const formData = await request.formData();

  const turnstileToken = formData.get("cf-turnstile-response");
  if (!turnstileToken) {
    await storeInvalidRequest(connection, "missing_token", request, formData);

    return new Response("ok", { status: 200 }) as unknown as CFResponse;
  }

  const isValid = await verifyTurnstileToken(
    turnstileToken.toString(),
    turnstile_secret,
  );

  if (!isValid) {
    await storeInvalidRequest(connection, "invalid_token", request, formData);

    return new Response("ok", { status: 200 }) as unknown as CFResponse;
  }

  const name = formData.get("form-name") as string;
  switch (name) {
    case "contact":
      return await contact(formData, discord_hook, connection, request);
    default:
      await storeInvalidRequest(
        connection,
        "incorrect_form_name",
        request,
        formData,
      );
      return new Response("Unknown form name", {
        status: 400,
      }) as unknown as CFResponse;
  }
};

/**
 * Records invalid form submissions in the database for security monitoring and analysis
 * Logs the reason for rejection, timestamp, request headers and submitted form data
 * @param connection D1 database instance for persistent storage
 * @param reason Classification of why request was rejected (missing/invalid token, bad form name)
 * @param request Original incoming HTTP request with headers and metadata
 * @param formData Form submission data from the rejected request
 * @returns Promise resolving after database record is created
 */
async function storeInvalidRequest(
  connection: D1Database,
  reason: String,
  request: Request<unknown, IncomingRequestCfProperties<unknown>>,
  formData: FormData,
) {
  return await connection
    .prepare(
      "INSERT INTO invalid_request (reason, headers, data) VALUES (?, ?, ?)",
    )
    .bind(
      reason,
      JSON.stringify(Array.from(request.headers.entries())),
      JSON.stringify(Array.from(formData.entries())),
    )
    .run();
}

/**
 * Processes a contact form submission and sends it as a Discord message
 *
 * @param formData - Form data containing contact details from submission
 * @param hook - Discord webhook URL to post notification to
 * @param connection - D1 database instance for storing invalid submissions
 * @param request - Original HTTP request for capturing details of invalid submissions
 * @returns Response with 200 status on success, 500 on webhook failure
 */
async function contact(
  formData: FormData,
  hook: string,
  connection: D1Database,
  request: Request<unknown, IncomingRequestCfProperties<unknown>>,
) {
  const [name, email, tel, message] = entriesToString(formData, [
    "name",
    "email",
    "tel",
    "message",
  ]);

  if (check_for_links([message, name, email, tel])) {
    await storeInvalidRequest(connection, "contains_link", request, formData);
    return new Response("ok", { status: 200 }) as unknown as CFResponse;
  }

  await connection
    .prepare("INSERT INTO valid_request (headers, data) VALUES (?, ?)")
    .bind(
      JSON.stringify(Array.from(request.headers.entries())),
      JSON.stringify(Array.from(formData.entries())),
    )
    .run();

  const body = JSON.stringify({
    content: `**${name}** ${display_email_tel(email, tel)} says: ${message}`,
    username: "Contact Request",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/1959/1959286.png",
  });

  return await send_webhook(body, hook);
}

/**
 * Extracts multiple form field values from FormData into an array of strings
 * @param formData - The FormData object containing form fields
 * @param names - Array of field names to extract values for
 * @returns Array of string values corresponding to the requested field names, empty strings for missing fields
 */
export function entriesToString(formData: FormData, names: string[]) {
  if (formData == null) return [];
  return names.map((v) => {
    const d = formData.get(v) || "";
    return d.toString().trim();
  });
}

/**
 * Sends a message to a Discord webhook
 * @param body - The JSON stringified message to send to Discord
 * @param hook - The Discord webhook URL
 * @returns A Response object with status 200 on success, or 500 on error
 */
async function send_webhook(body: string, hook: string) {
  try {
    await fetch(hook, {
      body,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return new Response("ok", { status: 200 }) as unknown as CFResponse;
  } catch (error) {
    return new Response("error", { status: 500 }) as unknown as CFResponse;
  }
}

/**
 * Formats email and telephone information into a parenthesized display string
 * @param email - The email address to display
 * @param tel - The telephone number to display
 * @returns A formatted string containing email and/or telephone in parentheses, or empty string if neither exists
 */
export function display_email_tel(email: string, tel: string): string {
  if (email.length > 0 && tel.length > 0) {
    return `(${email} | ${tel})`;
  } else if (email.length > 0) {
    return `(${email})`;
  } else if (tel.length > 0) {
    return `(${tel})`;
  }
  return "";
}

/**
 * Checks if any string in an array contains an HTTP or HTTPS link
 * @param texts - Array of strings to scan for URLs
 * @returns True if any string contains http:// or https://, false otherwise
 */
export function check_for_links(texts: string[]) {
  return texts
    .map((s) => s.includes("http://") || s.includes("https://"))
    .reduce((cur, next) => cur || next, false);
}

/**
 * Verifies a Cloudflare Turnstile token with the verification API
 * @param token - The Turnstile response token from the client
 * @param secretKey - The secret key for Turnstile verification
 * @returns A Promise that resolves to true if token is valid, false otherwise
 */
async function verifyTurnstileToken(
  token: string,
  secretKey: string,
): Promise<boolean> {
  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", token);

  const result = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      body: formData,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const outcome = await result.json();
  return outcome.success;
}
