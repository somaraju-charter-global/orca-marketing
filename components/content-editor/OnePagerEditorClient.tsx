"use client";

import { useRef, useState } from "react";
import type { OnePager } from "@/content/onepager-types";
import { OnePagerDocument } from "@/components/onepager/OnePagerDocument";
import { EditModeProvider, FieldPath } from "./EditModeContext";
import { EditControls } from "./EditControls";
import { setDeep } from "@/lib/content-editor/set-deep";
import { validateTwoPageVerticalBrief } from "@/lib/validation";

export function OnePagerEditorClient({
  onePager: initialOnePager,
  autoEdit = false,
}: {
  onePager: OnePager;
  autoEdit?: boolean;
}) {
  const [onePager, setOnePager] = useState(initialOnePager);
  const [isEditing, setIsEditing] = useState(autoEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState(() =>
    JSON.stringify(initialOnePager, null, 2)
  );
  const [jsonError, setJsonError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function updateField(path: FieldPath, value: string) {
    setOnePager((prev) => setDeep(prev, path, value));
  }

  function applyJsonText(text: string) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : "Invalid JSON");
      return;
    }

    const validation = validateTwoPageVerticalBrief(parsed);
    if (!validation.success) {
      setJsonError(validation.error);
      return;
    }

    setOnePager(validation.data);
    setJsonError(null);
  }

  function handleJsonChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = event.target.value;
    setJsonText(text);
    applyJsonText(text);
  }

  function handleToggleJson() {
    const next = !isJsonMode;
    setIsJsonMode(next);
    if (next) {
      setIsEditing(false);
      setJsonText(JSON.stringify(onePager, null, 2));
      setJsonError(null);
    }
  }

  function handleToggleEdit() {
    const next = !isEditing;
    setIsEditing(next);
    if (next) {
      setIsJsonMode(false);
    }
  }

  async function handleSave() {
    if (isJsonMode && jsonError) {
      setStatusMessage(`Cannot save: ${jsonError}`);
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);
    try {
      const response = await fetch("/api/upload/json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(onePager),
      });
      if (response.redirected) {
        throw new Error("You must be signed in to save.");
      }
      const contentType = response.headers.get("content-type") ?? "";
      const data = contentType.includes("application/json")
        ? await response.json().catch(() => null)
        : null;
      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to save.");
      }
      setStatusMessage(`Saved: ${data.url}`);
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Failed to save."
      );
    } finally {
      setIsSaving(false);
    }
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const validation = validateTwoPageVerticalBrief(parsed);
        if (!validation.success) {
          setStatusMessage(`Invalid JSON: ${validation.error}`);
          return;
        }
        setOnePager(validation.data);
        setIsEditing(true);
        setIsJsonMode(false);
        setJsonText(JSON.stringify(validation.data, null, 2));
        setJsonError(null);
        setStatusMessage(`Imported ${validation.data.slug}. Click Save to upload.`);
      } catch (error) {
        setStatusMessage(
          error instanceof Error ? error.message : "Failed to parse JSON."
        );
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  function handleExport() {
    if (isJsonMode && jsonError) {
      setStatusMessage(`Cannot export: ${jsonError}`);
      return;
    }
    const json = JSON.stringify(onePager, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${onePager.slug}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        className="hidden"
      />
      <EditControls
        isEditing={isEditing}
        isJsonMode={isJsonMode}
        onToggleEdit={handleToggleEdit}
        onToggleJson={handleToggleJson}
        onSave={handleSave}
        onImport={handleImportClick}
        onExport={handleExport}
        isSaving={isSaving}
        statusMessage={statusMessage}
      />
      <div className="onepager-document">
        {isJsonMode ? (
          <div className="h-full w-full p-8 bg-white">
            <textarea
              value={jsonText}
              onChange={handleJsonChange}
              spellCheck={false}
              className={`w-full h-[80vh] font-mono text-xs p-4 border-2 rounded-lg resize-none focus:outline-none ${
                jsonError
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {jsonError && (
              <p className="text-red-600 text-sm mt-2">{jsonError}</p>
            )}
          </div>
        ) : (
          <EditModeProvider value={{ isEditing, updateField }}>
            <OnePagerDocument onePager={onePager} />
          </EditModeProvider>
        )}
      </div>
    </>
  );
}
