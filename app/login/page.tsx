import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  const { error, from } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Orcaworks Marketing
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          Enter the site password to continue.
        </p>
        <form method="post" action="/api/auth/login">
          {from ? <input type="hidden" name="from" value={from} /> : null}
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
          {error === "1" && (
            <p className="mb-4 text-sm text-red-600">Incorrect password.</p>
          )}
          {error === "config" && (
            <p className="mb-4 text-sm text-red-600">
              Login is not configured — SITE_PASSWORD is missing.
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
