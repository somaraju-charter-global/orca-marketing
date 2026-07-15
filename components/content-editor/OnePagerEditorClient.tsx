"use client";

import { useState } from "react";
import type { OnePager } from "@/content/onepager-types";
import { OnePagerDocument } from "@/components/onepager/OnePagerDocument";
import { EditModeProvider, FieldPath } from "./EditModeContext";
import { EditControls } from "./EditControls";
import { setDeep } from "@/lib/content-editor/set-deep";

export function OnePagerEditorClient({
  onePager: initialOnePager,
  slug,
}: {
  onePager: OnePager;
  slug: string;
}) {
  const [onePager, setOnePager] = useState(initialOnePager);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function updateField(path: FieldPath, value: string) {
    setOnePager((prev) => setDeep(prev, path, value));
  }

  async function handleSave() {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const response = await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: "twoPager",
          slug,
          content: onePager,
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const detail = data?.knownSlugs
          ? ` Slugs found in content/two-pagers: ${data.knownSlugs
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
    const json = JSON.stringify(onePager, null, 2);
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
      <div className="onepager-document">
        <EditModeProvider value={{ isEditing, updateField }}>
          <OnePagerDocument onePager={onePager} />
        </EditModeProvider>
      </div>
    </>
  );
}
