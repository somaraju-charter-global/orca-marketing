import { onePagers } from "@/content/onepager-registry";
import { guides } from "@/content/registry";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Orcaworks Marketing PDFs</h1>
        <p className="text-gray-600 mb-8">Select a document to view or generate a PDF</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Two-Pagers Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-orange-500">
              Two-Pagers
            </h2>
            <div className="space-y-3">
              {Object.values(onePagers).map((twoPager) => (
                <a
                  key={twoPager.slug}
                  href={`/two-pagers/${twoPager.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="font-semibold text-gray-900 mb-1">{twoPager.hero.headline}</div>
                  <div className="text-sm text-gray-600">{twoPager.vertical}</div>
                  <div className="text-xs text-gray-400 mt-1">{twoPager.audience}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Guides Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
              Marketing Guides
            </h2>
            <div className="space-y-3">
              {Object.values(guides).map((guide) => (
                <a
                  key={guide.slug}
                  href={`/marketing/${guide.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="font-semibold text-gray-900 mb-1">{guide.title}</div>
                  <div className="text-sm text-gray-600">{guide.description}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
