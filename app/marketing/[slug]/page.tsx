import { notFound } from "next/navigation";
import { getGuideBySlug } from "@/content/registry";
import { GeneratePdfButton } from "@/components/GeneratePdfButton";
import { GuideEditorClient } from "@/components/content-editor/GuideEditorClient";
import Link from "next/link";

export const dynamicParams = true;

export default async function MarketingGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="no-print bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{guide.title}</h1>
            <p className="text-sm text-gray-600">{guide.description}</p>
          </div>
          <div className="flex gap-4">
            <Link
              href={`/marketing/${slug}/print`}
              target="_blank"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open Print View
            </Link>
            <GeneratePdfButton
              slug={slug}
              section="marketing"
              className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 no-print">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Marketing Preview Instructions
          </h2>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Review each page visually in the preview below</li>
            <li>• Click &ldquo;Open Print View&rdquo; to see the print-optimized version</li>
            <li>• Use the print view to generate PDFs via browser print or Playwright</li>
            <li>• Click Edit JSON to edit, import, export, or save the guide</li>
          </ul>
        </div>
      </div>

      <GuideEditorClient guide={guide} />
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllGuides } = await import("@/content/registry");
  const guides = await getAllGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}
