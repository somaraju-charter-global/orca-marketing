import { notFound } from "next/navigation";
import { getOnePagerBySlug } from "@/content/onepager-registry";
import { OnePagerDocument } from "@/components/onepager/OnePagerDocument";
import { auth } from "@/auth";

export default async function OnePagerPrintPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  if (!session) {
    return <div className="p-8 text-center">Unauthorized. Please sign in.</div>;
  }
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
