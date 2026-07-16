import { randomUUID } from "node:crypto";
import Link from "next/link";
import { OnePagerEditorClient } from "@/components/content-editor/OnePagerEditorClient";
import { createEmptyTwoPager } from "@/lib/empty-two-pager";

export const dynamic = "force-dynamic";

export default function CreatePage() {
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

        <OnePagerEditorClient onePager={onePager} autoEdit />
      </div>
    </div>
  );
}
