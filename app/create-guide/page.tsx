import { randomUUID } from "node:crypto";
import Link from "next/link";
import { GuideEditorClient } from "@/components/content-editor/GuideEditorClient";
import { createEmptyGuide } from "@/lib/empty-guide";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function CreateGuidePage() {
  const session = await auth();
  if (!session) {
    return <div className="p-8 text-center">Unauthorized. Please sign in.</div>;
  }

  const guide = createEmptyGuide(`untitled-guide-${randomUUID().slice(0, 8)}`);

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
            Create guide
          </h1>
          <div className="text-sm text-gray-500">Slug: {guide.slug}</div>
        </div>

        <GuideEditorClient guide={guide} autoJsonMode />
      </div>
    </div>
  );
}
