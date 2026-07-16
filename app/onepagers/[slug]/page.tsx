import { notFound } from "next/navigation";
import { getOnePagerBySlug } from "@/content/onepager-registry";
import { OnePagerEditorClient } from "@/components/content-editor/OnePagerEditorClient";
import { GeneratePdfButton } from "@/components/GeneratePdfButton";
import Link from "next/link";

export default async function OnePagerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const onePager = await getOnePagerBySlug(slug);

  if (!onePager) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 no-print">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {onePager.vertical}
          </h1>
          <p className="text-gray-600 mb-4">
            Layout: Two-Page Executive Brief
          </p>
          <Link
            href={`/onepagers/${slug}/print`}
            target="_blank"
            className="inline-block bg-orange-500 text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors"
          >
            Open Print View
          </Link>
          <GeneratePdfButton
            slug={slug}
            section="onepagers"
            className="inline-block ml-3 bg-white border-2 border-orange-500 text-orange-600 px-4 py-2 rounded font-semibold hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 no-print">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-orange-900 mb-2">
              Two-Pager Preview Instructions
            </h2>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Review each page visually in the preview below</li>
              <li>• Click &ldquo;Open Print View&rdquo; to see the print-optimized version</li>
              <li>• Use the print view to generate PDFs via browser print or Playwright</li>
              <li>• Edit content by uploading JSON or using the editor controls</li>
            </ul>
          </div>
        </div>

        <OnePagerEditorClient onePager={onePager} />
      </div>
    </div>
  );
}
