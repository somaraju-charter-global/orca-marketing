"use client";

import { useState } from "react";
import Link from "next/link";
import { GuideEditorClient } from "@/components/content-editor/GuideEditorClient";
import type { MarketingGuide } from "@/content/types";
import { validateMarketingGuide } from "@/lib/guide-validation";

export default function UploadGuidePage() {
  const [guide, setGuide] = useState<MarketingGuide | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const validation = validateMarketingGuide(parsed);
        if (!validation.success) {
          setError(`Invalid guide JSON: ${validation.error}`);
          setGuide(null);
          return;
        }
        setError(null);
        setGuide(validation.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to parse JSON file."
        );
        setGuide(null);
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  if (!guide) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Back to all documents
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Upload Guide JSON
          </h1>
          <p className="mt-2 text-gray-600">
            Select a JSON file that matches the marketing guide schema to preview
            and save it.
          </p>

          <label className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 hover:border-blue-500 hover:bg-blue-50">
            <span className="text-sm font-medium text-gray-700">
              Click to choose a JSON file
            </span>
            <input
              type="file"
              accept="application/json"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 no-print flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Home
          </Link>
          <button
            type="button"
            onClick={() => setGuide(null)}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Upload another file
          </button>
        </div>

        <GuideEditorClient guide={guide} />
      </div>
    </div>
  );
}
