"use client";

import type { ManageBlobItem } from "./ManageClient";

interface BlobTableProps {
  title: string;
  items: ManageBlobItem[];
  kind: "json" | "pdf";
  zipping: "json" | "pdf" | null;
  onDelete: (item: ManageBlobItem) => void;
  onDownloadAll: (kind: "json" | "pdf") => void;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
}

export function BlobTable({
  title,
  items,
  kind,
  zipping,
  onDelete,
  onDownloadAll,
}: BlobTableProps) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onDownloadAll(kind)}
            disabled={zipping === kind || items.length === 0}
            className="rounded-lg bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {zipping === kind ? "Zipping…" : "Download all"}
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">No {kind} files in Blob yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Slug</th>
                <th className="px-4 py-2 text-left font-medium">Size</th>
                <th className="px-4 py-2 text-left font-medium">Uploaded</th>
                <th className="px-4 py-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.slug} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {item.slug}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {formatBytes(item.size)}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {new Date(item.uploadedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <a
                      href={item.url}
                      download
                      className="mr-3 text-blue-600 hover:underline"
                    >
                      Download
                    </a>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
