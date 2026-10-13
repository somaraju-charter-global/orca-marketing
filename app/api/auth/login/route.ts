import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionValue,
  isSitePasswordConfigured,
  verifyPassword,
} from "@/lib/session";

export const runtime = "nodejs";

function safeRedirectPath(value: unknown): string {
  return typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//")
    ? value
    : "/";
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const formData = await request.formData().catch(() => null);
  const password = formData?.get("password");
  const redirectTo = safeRedirectPath(formData?.get("from"));

  if (!isSitePasswordConfigured()) {
    console.error("POST /api/auth/login: SITE_PASSWORD is not configured");
    const loginUrl = new URL("/login", url.origin);
    loginUrl.searchParams.set("error", "config");
    return NextResponse.redirect(loginUrl, 303);
  }

  if (typeof password !== "string" || !verifyPassword(password)) {
    const loginUrl = new URL("/login", url.origin);
    loginUrl.searchParams.set("error", "1");
    if (redirectTo !== "/") {
      loginUrl.searchParams.set("from", redirectTo);
    }
    return NextResponse.redirect(loginUrl, 303);
  }

  const response = NextResponse.redirect(new URL(redirectTo, url.origin), 303);
  response.cookies.set(SESSION_COOKIE, createSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: url.protocol === "https:",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
