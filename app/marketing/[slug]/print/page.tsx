import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGuideBySlug } from "@/content/registry";
import { MarketingDocument } from "@/components/marketing/MarketingDocument";
import { auth } from "@/auth";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user?.domain) return {};

  const guide = await getGuideBySlug(slug, session.user.domain);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
  };
}

export default async function MarketingGuidePrintPage({
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

  return <MarketingDocument guide={guide} />;
}

export async function generateStaticParams() {
  return [];
}
