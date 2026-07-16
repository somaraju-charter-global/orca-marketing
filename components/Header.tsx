"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-900">
          Orcaworks Marketing
        </Link>

        <nav className="flex items-center gap-4">
          {status === "authenticated" && session?.user ? (
            <>
              <span className="text-sm text-gray-600">
                {session.user.name ?? session.user.email ?? "User"}
              </span>
              <button
                type="button"
                onClick={() => signOut({ redirectTo: "/login" })}
                className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => signIn("github", { redirectTo: "/" })}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
