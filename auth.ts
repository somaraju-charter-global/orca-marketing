import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionValue } from "@/lib/session";

export interface Session {
  user: { name: string };
}

/**
 * Returns the current session for a request, or null when the visitor is
 * not authenticated. Authentication is a single shared password
 * (SITE_PASSWORD) stored as an HMAC-signed cookie — see lib/session.ts.
 */
export async function auth(): Promise<Session | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionValue(value)) return null;
  return { user: { name: "Admin" } };
}
