import type { Response as CFResponse } from "@cloudflare/workers-types";

type ResponseLike = Response | CFResponse;

const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy-Report-Only": [
    "default-src 'self'",
    "script-src 'self' https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "connect-src 'self'",
    "font-src 'self' data:",
    "frame-src 'self' https://challenges.cloudflare.com",
    "object-src 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
    "report-uri /__csp-report",
  ].join("; "),
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": [
    "accelerometer=()",
    "camera=()",
    "geolocation=()",
    "gyroscope=()",
    "magnetometer=()",
    "microphone=()",
    "payment=()",
    "usb=()",
  ].join(", "),
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "credentialless",
  "X-Content-Type-Options": "nosniff",
};

export function applySecurityHeaders(response?: ResponseLike): CFResponse {
  const finalResponse =
    response ?? (new Response(null, { status: 204 }) as ResponseLike);

  const headers = (finalResponse as Response).headers;

  Object.entries(SECURITY_HEADERS).forEach(([header, value]) => {
    headers.set(header, value);
  });

  return finalResponse as CFResponse;
}

export { SECURITY_HEADERS };
