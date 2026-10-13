import Link from "next/link";
import { auth } from "@/auth";

export async function Header() {
  const session = await auth();

  return (
    <header className="no-print w-full border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-900">
          Orcaworks Marketing
        </Link>

        <nav className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm text-gray-600">
                {session.user.name}
              </span>
              <form method="post" action="/api/auth/logout">
                <button
                  type="submit"
                  className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
