import { notFound } from "next/navigation";
import { getOnePagerBySlug } from "@/content/onepager-registry";
import { OnePagerDocument } from "@/components/onepager/OnePagerDocument";

export default async function TwoPagerPrintPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const twoPager = getOnePagerBySlug(slug);

  if (!twoPager) {
    notFound();
  }

  return (
    <div className="onepager-document">
      <OnePagerDocument onePager={twoPager} />
    </div>
  );
}
