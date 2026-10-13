import { randomUUID } from "node:crypto";
import Link from "next/link";
import { OnePagerEditorClient } from "@/components/content-editor/OnePagerEditorClient";
import { createEmptyTwoPager } from "@/lib/empty-two-pager";
import { auth } from "@/auth";

function serializePageData(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const dynamic = "force-dynamic";

export default async function CreatePage() {
  const session = await auth();
  if (!session) {
    return <div className="p-8 text-center">Unauthorized. Please sign in.</div>;
  }

  const onePager = createEmptyTwoPager(`untitled-${randomUUID().slice(0, 8)}`);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 no-print flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Home
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            Create two-pager
          </h1>
          <div className="text-sm text-gray-500">Slug: {onePager.slug}</div>
        </div>

        <div
          id="__ORCA_PAGE_DATA__"
          data-orca-json={serializePageData(onePager)}
          className="hidden"
        />
        <OnePagerEditorClient onePager={onePager} autoEdit />
      </div>
    </div>
  );
}
