import { notFound } from "next/navigation";
import { getOnePagerBySlug } from "@/content/onepager-registry";
import { OnePagerDocument } from "@/components/onepager/OnePagerDocument";
import Link from "next/link";

export default async function OnePagerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const onePager = getOnePagerBySlug(slug);

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
            className="inline-block bg-[--orca-orange] text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors"
          >
            Open Print View
          </Link>
        </div>

        <div className="onepager-document">
          <OnePagerDocument onePager={onePager} />
        </div>
      </div>
    </div>
  );
}
