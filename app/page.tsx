import Link from "next/link";
import { getAllOnePagers } from "@/content/onepager-registry";
import { getAllGuides } from "@/content/registry";

export const dynamic = "force-dynamic";

export default async function Home() {
  const onePagers = await getAllOnePagers();
  const guides = await getAllGuides();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Orcaworks Marketing PDFs</h1>
        <p className="text-gray-600 mb-6">Select a document to view or generate a PDF</p>

        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/create"
            className="inline-flex items-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
          >
            Create two-pager
          </Link>
          <Link
            href="/upload"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Upload two-pager
          </Link>
          <Link
            href="/create-guide"
            className="inline-flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            Create guide
          </Link>
          <Link
            href="/upload-guide"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Upload guide
          </Link>
          <Link
            href="/manage"
            className="inline-flex items-center rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Manage uploads
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Two-Pagers Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500">
              Two-Pagers
            </h2>
            <div className="space-y-3">
              {onePagers.map((twoPager) => (
                <Link
                  key={twoPager.slug}
                  href={`/two-pagers/${twoPager.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="font-semibold text-gray-900 mb-1">{twoPager.hero.headline}</div>
                  <div className="text-sm text-gray-600">{twoPager.vertical}</div>
                  <div className="text-xs text-gray-400 mt-1">{twoPager.audience}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Guides Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
              Marketing Guides
            </h2>
            <div className="space-y-3">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/marketing/${guide.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="font-semibold text-gray-900 mb-1">{guide.title}</div>
                  <div className="text-sm text-gray-600">{guide.description}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
