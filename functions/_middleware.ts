import {
  type D1Database,
  type PagesFunction,
  Response,
  FormData,
  type Request,
  type IncomingRequestCfProperties,
} from "@cloudflare/workers-types";

/**
 * Environment variables interface for Cloudflare Pages Function
 * @property DISCORD_WEBHOOK - URL for Discord webhook to send form notifications
 * @property TURNSTILE_SECRET_KEY - Secret key for validating Cloudflare Turnstile tokens
 */
export interface Env {
  DISCORD_WEBHOOK: string;
  TURNSTILE_SECRET_KEY: string;
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
): Promise<Response> => {
  const discord_hook = context.env.DISCORD_WEBHOOK;
  const turnstile_secret = context.env.TURNSTILE_SECRET_KEY;

  const request = context.request;

  if (request.method !== "POST") {
    return context.next();
  }

  const formData = await request.formData();

  const turnstileToken = formData.get("cf-turnstile-response");
  if (!turnstileToken) {
    console.error("Turnstile token missing");
    return response("ok", { status: 200 });
  }

  const isValid = await verifyTurnstileToken(
    turnstileToken.toString(),
    turnstile_secret,
  );

  if (!isValid) {
    console.error("Invalid Turnstile token");
    return response("ok", { status: 200 });
  }

  const name = formData.get("form-name") as string;
  switch (name) {
    case "contact":
      return await contact(formData as unknown as FormData, discord_hook);
    default:
      console.error(`*** Unknown form name: ${name}`);
      return response("Unknown form name", { status: 400 });
  }
};

/**
 * Processes a contact form submission and sends it to Discord
 * @param formData - The FormData object containing the contact details
 * @param hook - The Discord webhook URL to send the notification to
 * @returns A Response object indicating success or failure of the webhook send
 */
async function contact(formData: FormData, hook: string) {
  const [name, email, tel, message] = entriesToString(formData, [
    "name",
    "email",
    "tel",
    "message",
  ]);

  if (check_for_links([message, name, email, tel])) {
    return response("ok", { status: 200 });
  }

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
 * @returns A Response object with status 201 on success, or 500 on error
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
    return response("ok", { status: 200 });
  } catch (error) {
    return response("error", { status: 500 });
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
 * Creates a Cloudflare Response object with the given body and initialization options
 * @param body - The response body text
 * @param init - Response initialization options like status and headers
 * @returns A Cloudflare-compatible Response object
 */
function response(body: string, init: ResponseInit): Response {
  return new Response(body, init);
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
