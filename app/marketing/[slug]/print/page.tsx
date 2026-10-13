import { notFound } from "next/navigation";
import { getGuideBySlug } from "@/content/registry";
import { MarketingDocument } from "@/components/marketing/MarketingDocument";
import { auth } from "@/auth";

export const dynamicParams = true;

export default async function MarketingGuidePrintPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  if (!session) {
    return <div className="p-8 text-center">Unauthorized. Please sign in.</div>;
  }
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return <MarketingDocument guide={guide} />;
}

export async function generateStaticParams() {
  return [];
}
