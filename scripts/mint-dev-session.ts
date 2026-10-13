/**
 * Mints a session cookie for local PDF export, so the print pages
 * (which require a signed-in visitor) can be rendered headlessly.
 * Dev only — reads SITE_PASSWORD from the local env.
 *
 *   npx tsx scripts/mint-dev-session.ts
 *
 * Prints a `name=value` Cookie header value; pass it to generate-pdf.ts via
 * --cookie.
 */
import { createSessionValue, SESSION_COOKIE } from "../lib/session";

try {
  process.loadEnvFile(".env.local");
} catch {
  // fall back to ambient env vars
}
if (!process.env.SITE_PASSWORD) {
  try {
    process.loadEnvFile(".env");
  } catch {
    // fall back to ambient env vars
  }
}

if (!process.env.SITE_PASSWORD) {
  throw new Error("SITE_PASSWORD is required");
}

console.log(`${SESSION_COOKIE}=${createSessionValue()}`);
