import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "orca_site_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function sitePassword(): string | undefined {
  const password = process.env.SITE_PASSWORD;
  return password && password.length > 0 ? password : undefined;
}

export function isSitePasswordConfigured(): boolean {
  return sitePassword() !== undefined;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/**
 * Session cookie value: `<expiryMs>.<hmac>`, where the HMAC is keyed on
 * SITE_PASSWORD. Rotating the password invalidates all existing sessions.
 */
export function createSessionValue(now = Date.now()): string {
  const secret = sitePassword();
  if (!secret) {
    throw new Error("SITE_PASSWORD is not configured");
  }
  const expires = String(now + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expires}.${sign(expires, secret)}`;
}

export function verifySessionValue(
  value: string | undefined,
  now = Date.now()
): boolean {
  const secret = sitePassword();
  if (!secret || !value) return false;

  const dot = value.indexOf(".");
  if (dot === -1) return false;

  const expires = value.slice(0, dot);
  const signature = value.slice(dot + 1);
  if (!/^\d+$/.test(expires) || Number(expires) <= now) return false;

  return safeEqual(signature, sign(expires, secret));
}

export function verifyPassword(candidate: string): boolean {
  const secret = sitePassword();
  if (!secret) return false;
  return safeEqual(candidate, secret);
}
