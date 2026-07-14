"use client";

import { useState } from "react";
import type { MarketingGuide } from "@/content/types";
import { MarketingDocument } from "@/components/marketing/MarketingDocument";
import { EditModeProvider, FieldPath } from "./EditModeContext";
import { EditControls } from "./EditControls";
import { setDeep } from "@/lib/content-editor/set-deep";

export function GuideEditorClient({
  guide: initialGuide,
  slug,
}: {
  guide: MarketingGuide;
  slug: string;
}) {
  const [guide, setGuide] = useState(initialGuide);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function updateField(path: FieldPath, value: string) {
    setGuide((prev) => setDeep(prev, path, value));
  }

  async function handleSave() {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const response = await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: "guide", slug, content: guide }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const detail = data?.knownSlugs
          ? ` Slugs found in content/guides: ${data.knownSlugs
              .map((entry: { file: string; slug: string | null }) => `${entry.file} → ${entry.slug ?? "(no slug found)"}`)
              .join("; ")}`
          : "";
        throw new Error((data?.error ?? "Failed to save.") + detail);
      }
      setStatusMessage(`Saved to ${data.filePath}`);
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to save."
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleExport() {
    const json = JSON.stringify(guide, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slug}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <EditControls
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing((prev) => !prev)}
        onSave={handleSave}
        onExport={handleExport}
        isSaving={isSaving}
        statusMessage={statusMessage}
      />
      <EditModeProvider value={{ isEditing, updateField }}>
        <MarketingDocument guide={guide} />
      </EditModeProvider>
    </>
  );
}
