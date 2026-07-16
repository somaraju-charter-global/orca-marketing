import { listJsons, listPdfs } from "@/lib/storage";
import { ManageClient, type ManageBlobItem } from "@/components/ManageClient";
import type { ListBlobResultBlob } from "@vercel/blob";

export const dynamic = "force-dynamic";

function blobToManageItem(blob: ListBlobResultBlob, kind: "json" | "pdf"): ManageBlobItem {
  const slug = blob.pathname
    .replace(kind === "json" ? /^jsons\// : /^pdfs\//, "")
    .replace(/\.\w+$/, "");
  return {
    url: blob.url,
    pathname: blob.pathname,
    slug,
    size: blob.size,
    uploadedAt:
      blob.uploadedAt instanceof Date
        ? blob.uploadedAt.toISOString()
        : String(blob.uploadedAt),
    kind,
  };
}

export default async function ManagePage() {
  const [jsonBlobs, pdfBlobs] = await Promise.all([listJsons(), listPdfs()]);

  const initialJsons = jsonBlobs.map((blob) => blobToManageItem(blob, "json"));
  const initialPdfs = pdfBlobs.map((blob) => blobToManageItem(blob, "pdf"));

  return <ManageClient initialJsons={initialJsons} initialPdfs={initialPdfs} />;
}
