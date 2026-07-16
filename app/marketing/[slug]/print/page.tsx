import { notFound } from "next/navigation";
import { getGuideBySlug } from "@/content/registry";
import { MarketingDocument } from "@/components/marketing/MarketingDocument";

export const dynamicParams = true;

export default async function MarketingGuidePrintPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return <MarketingDocument guide={guide} />;
}

export async function generateStaticParams() {
  const { getAllGuides } = await import("@/content/registry");
  const guides = await getAllGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}
