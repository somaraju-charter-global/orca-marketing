import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOnePagerBySlug } from "@/content/onepager-registry";
import { OnePagerDocument } from "@/components/onepager/OnePagerDocument";
import { auth } from "@/auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user?.domain) return {};

  const twoPager = await getOnePagerBySlug(slug, session.user.domain);
  if (!twoPager) return {};

  return {
    title: twoPager.title,
    description: twoPager.description,
  };
}

export default async function TwoPagerPrintPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user?.email || !session?.user?.domain) {
    return <div className="p-8 text-center">Unauthorized. Please sign in.</div>;
  }
  const twoPager = await getOnePagerBySlug(slug, session.user.domain);

  if (!twoPager) {
    notFound();
  }

  return (
    <div className="onepager-document">
      <OnePagerDocument onePager={twoPager} />
    </div>
  );
}
