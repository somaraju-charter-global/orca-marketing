"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Orcaworks Marketing
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          Sign in with Auth0 to manage two-pagers.
        </p>
        <button
          type="button"
          onClick={() => signIn("auth0", { redirectTo: "/" })}
          className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
        >
          Sign in with Auth0
        </button>
      </div>
    </main>
  );
}
