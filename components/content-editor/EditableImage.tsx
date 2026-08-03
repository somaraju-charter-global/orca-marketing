"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useEditMode, FieldPath } from "./EditModeContext";

interface EditableImageProps {
  /** Field path to update in the document once a new image is uploaded, e.g. ["page1", "solutionVisual", "imagePath"]. */
  path: FieldPath;
  src?: string;
  alt: string;
  className?: string;
  /** Use next/image's `fill` mode (parent must be `position: relative` with a set size) or fixed width/height. */
  fill?: boolean;
  width?: number;
  height?: number;
  /**
   * Whether this field is allowed to be empty (matches the content schema —
   * e.g. cover.image and solutionVisual.imagePath are optional; darkEditorial
   * and imageCallout images are required). Only optional fields get a Delete
   * button and an "add image" placeholder when empty; a required field would
   * just fail validation on save if cleared, so we don't offer that footgun.
   */
  optional?: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

async function deleteUploadedImage(url: string) {
  try {
    await fetch("/api/upload/image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
  } catch {
    // Best-effort cleanup only. The server itself also no-ops for URLs
    // that aren't one of our uploads (e.g. a bundled /images asset), so
    // this is safe to call unconditionally with whatever the previous
    // src was — nothing shared ever gets deleted by mistake.
  }
}

/**
 * Renders a plain next/image when not in edit mode — identical to what it
 * replaces, so normal rendering and the print/PDF path are unaffected.
 *
 * In edit mode, overlays a hover affordance that opens a file picker,
 * uploads the chosen file through the validated /api/upload/image
 * endpoint (JPG/PNG only, size + dimension checked server-side), and on
 * success reports the returned URL back up via `updateField` — the same
 * mechanism text fields use. Optional fields also get a small Delete
 * button that clears the field (setting it to undefined, so it's simply
 * absent from the saved JSON rather than an empty/invalid string).
 */
export function EditableImage({
  path,
  src,
  alt,
  className,
  fill,
  width,
  height,
  optional = false,
}: EditableImageProps) {
  const { isEditing, updateField } = useEditMode();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (!isEditing) {
    if (!src) return null;
    return fill ? (
      <Image src={src} alt={alt} fill className={className} />
    ) : (
      <Image src={src} alt={alt} width={width} height={height} className={className} />
    );
  }

  // In edit mode with no image set yet, only optional fields get a
  // click-to-add placeholder — a required field shouldn't be empty here.
  if (!src && !optional) {
    return null;
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Only JPG and PNG images are allowed.");
      return;
    }

    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Upload failed.");
      }
      const previousSrc = src;
      updateField(path, data.url as string);
      if (previousSrc) {
        void deleteUploadedImage(previousSrc);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleDelete(event: React.MouseEvent) {
    event.stopPropagation();
    updateField(path, undefined);
    setError(null);
    if (src) {
      void deleteUploadedImage(src);
    }
  }

  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept="image/jpeg,image/png"
      className="hidden"
      onChange={handleFileChange}
    />
  );

  if (!src) {
    // optional && no image yet: click-to-add placeholder.
    return (
      <div className={`relative ${fill ? "h-full w-full" : ""}`}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex h-full w-full cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 text-sm font-medium text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-100 disabled:cursor-wait"
          style={!fill ? { width, height } : undefined}
        >
          {isUploading ? "Uploading…" : "Click to add image"}
        </button>
        {fileInput}
        {error && (
          <p className="absolute left-0 right-0 top-full z-10 mt-1 rounded bg-white px-2 py-1 text-xs text-red-600 shadow">
            {error}
          </p>
        )}
      </div>
    );
  }

  const image = fill ? (
    <Image src={src} alt={alt} fill className={className} />
  ) : (
    <Image src={src} alt={alt} width={width} height={height} className={className} />
  );

  return (
    <div className={`group relative ${fill ? "h-full w-full" : ""}`}>
      {image}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 text-sm font-medium text-white opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100 disabled:cursor-wait"
      >
        {isUploading ? "Uploading…" : "Click to replace image"}
      </button>
      {optional && (
        <button
          type="button"
          onClick={handleDelete}
          title="Remove image"
          className="absolute right-2 top-2 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white opacity-0 shadow transition-opacity group-hover:opacity-100 hover:bg-red-700"
        >
          ✕
        </button>
      )}
      {fileInput}
      {error && (
        <p className="absolute left-0 right-0 top-full z-10 mt-1 rounded bg-white px-2 py-1 text-xs text-red-600 shadow">
          {error}
        </p>
      )}
    </div>
  );
}
