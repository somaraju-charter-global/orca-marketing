import { notFound } from "next/navigation";
import { getGuideBySlug } from "@/content/registry";
import { GeneratePdfButton } from "@/components/GeneratePdfButton";
import { DeleteDocumentButton } from "@/components/DeleteDocumentButton";
import { GuideEditorClient } from "@/components/content-editor/GuideEditorClient";
import Link from "next/link";
import { auth } from "@/auth";

export const dynamicParams = true;

export default async function MarketingGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user?.email || !session?.user?.domain) {
    return <div className="p-8 text-center">Unauthorized. Please sign in.</div>;
  }
  const guide = await getGuideBySlug(slug, session.user.domain);

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="no-print bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900">{guide.title}</h1>
            <p className="text-sm text-gray-600">{guide.description}</p>
          </div>
          <div className="flex flex-shrink-0 gap-3">
            <Link
              href={`/marketing/${slug}/print`}
              target="_blank"
              className="whitespace-nowrap px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open Print View
            </Link>
            <GeneratePdfButton
              slug={slug}
              section="marketing"
              className="whitespace-nowrap px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <DeleteDocumentButton
              slug={slug}
              kind="guide"
              redirectTo="/manage"
              className="whitespace-nowrap px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
  return [];
}
