import { notFound } from "next/navigation";
import { getOnePagerBySlug } from "@/content/onepager-registry";
import { OnePagerDocument } from "@/components/onepager/OnePagerDocument";

export default async function OnePagerPrintPage({
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
    <div className="onepager-document">
      <OnePagerDocument onePager={onePager} />
    </div>
  );
}
