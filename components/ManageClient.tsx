"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import JSZip from "jszip";
import { validateTwoPageVerticalBrief } from "@/lib/validation";
import { BlobTable } from "./BlobTable";

export type ManageBlobItem = {
  url: string;
  pathname: string;
  slug: string;
  size: number;
  uploadedAt: string;
  kind: "json" | "pdf";
};

interface ManageClientProps {
  initialJsons: ManageBlobItem[];
  initialPdfs: ManageBlobItem[];
}

function slugFromFileName(fileName: string): string {
  return fileName.replace(/\.(json|pdf)$/i, "").replace(/\s+/g, "-");
}

export function ManageClient({ initialJsons, initialPdfs }: ManageClientProps) {
  const [jsons, setJsons] = useState(initialJsons);
  const [pdfs, setPdfs] = useState(initialPdfs);
  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [zipping, setZipping] = useState<"json" | "pdf" | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleDelete(item: ManageBlobItem) {
    setStatus(`Deleting ${item.pathname}…`);
    try {
      const response = await fetch("/api/manage/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: item.kind, slug: item.slug }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Delete failed.");
      }
      if (item.kind === "json") {
        setJsons((prev) => prev.filter((i) => i.slug !== item.slug));
      } else {
        setPdfs((prev) => prev.filter((i) => i.slug !== item.slug));
      }
      setStatus(`Deleted ${item.pathname}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Delete failed.");
    }
  }

  async function downloadAll(kind: "json" | "pdf") {
    const items = kind === "json" ? jsons : pdfs;
    if (items.length === 0) {
      setStatus(`No ${kind} files to download.`);
      return;
    }

    setZipping(kind);
    setStatus(`Zipping ${kind} files…`);
    const zip = new JSZip();

    try {
      for (const item of items) {
        const response = await fetch(item.url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${item.pathname}`);
        }
        const body =
          kind === "json" ? await response.text() : await response.arrayBuffer();
        zip.file(item.pathname, body);
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `orcaworks-${kind}s.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setStatus(`Downloaded ${kind} archive.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Download failed.");
    } finally {
      setZipping(null);
    }
  }

  async function uploadJsonFile(file: File): Promise<ManageBlobItem | null> {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const validation = validateTwoPageVerticalBrief(parsed);
    if (!validation.success) {
      throw new Error(`Invalid JSON (${file.name}): ${validation.error}`);
    }

    const response = await fetch("/api/upload/json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(data?.error ?? `Upload failed for ${file.name}.`);
    }

    const slug = validation.data.slug;
    return {
      url: data.url as string,
      pathname: `jsons/${slug}.json`,
      slug,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      kind: "json",
    };
  }

  async function uploadPdfFile(file: File): Promise<ManageBlobItem | null> {
    const slug = slugFromFileName(file.name);
    const form = new FormData();
    form.append("slug", slug);
    form.append("file", file);

    const response = await fetch("/api/upload/pdf", {
      method: "POST",
      body: form,
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(data?.error ?? `Upload failed for ${file.name}.`);
    }

    return {
      url: data.url as string,
      pathname: `pdfs/${slug}.pdf`,
      slug,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      kind: "pdf",
    };
  }

  async function handleBulkUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    setStatus(`Uploading ${files.length} file(s)…`);
    const newJsons: ManageBlobItem[] = [];
    const newPdfs: ManageBlobItem[] = [];
    const errors: string[] = [];

    for (const file of files) {
      try {
        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
          const item = await uploadPdfFile(file);
          if (item) newPdfs.push(item);
        } else if (
          file.type === "application/json" ||
          file.name.endsWith(".json")
        ) {
          const item = await uploadJsonFile(file);
          if (item) newJsons.push(item);
        } else {
          errors.push(`${file.name} is not a .json or .pdf file.`);
        }
      } catch (error) {
        errors.push(
          error instanceof Error ? error.message : `Failed ${file.name}`
        );
      }
    }

    setJsons((prev) => [...prev, ...newJsons]);
    setPdfs((prev) => [...prev, ...newPdfs]);
    setUploading(false);
    setStatus(
      [
        `Uploaded ${newJsons.length} JSON(s) and ${newPdfs.length} PDF(s).`,
        errors.length > 0 ? `Errors: ${errors.join("; ")}` : null,
      ]
        .filter(Boolean)
        .join(" ")
    );
    event.target.value = "";
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Back to all documents
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Manage Uploads
          </h1>
          <p className="mt-2 text-gray-600">
            View, download, and delete uploaded JSONs and PDFs, or bulk upload
            more files.
          </p>
        </div>

        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Bulk upload
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Select one or more .json two-pager files and/or exported .pdf
            files.
          </p>
          <label className="inline-flex cursor-pointer items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            {uploading ? "Uploading…" : "Choose files"}
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.pdf"
              multiple
              onChange={handleBulkUpload}
              disabled={uploading}
              className="sr-only"
            />
          </label>
          {status && (
            <p className="mt-4 text-sm text-gray-700">{status}</p>
          )}
        </div>

        <BlobTable
          title="Uploaded JSONs"
          items={jsons}
          kind="json"
          zipping={zipping}
          onDelete={handleDelete}
          onDownloadAll={downloadAll}
        />
        <BlobTable
          title="Uploaded PDFs"
          items={pdfs}
          kind="pdf"
          zipping={zipping}
          onDelete={handleDelete}
          onDownloadAll={downloadAll}
        />
      </div>
    </main>
  );
}
