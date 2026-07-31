"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteDocumentButtonProps {
  slug: string;
  /** Which storage path this document lives in — defaults to the two-pager path. */
  kind?: "onepager" | "guide";
  /** Where to send the user after a successful delete, since this page no longer exists. */
  redirectTo?: string;
  className?: string;
  label?: string;
}

/**
 * Deletes a document's saved JSON (and best-effort, any generated PDF)
 * through the existing /api/manage/delete endpoint — the same one the
 * /manage page uses. Confirms first since this can't be undone.
 */
export function DeleteDocumentButton({
  slug,
  kind = "onepager",
  redirectTo = "/manage",
  className,
  label = "Delete",
}: DeleteDocumentButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${slug}"? This removes its saved content (and any generated PDF) and cannot be undone.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const response = await fetch("/api/manage/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, type: "json", kind }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to delete.");
      }

      // Best-effort: also clean up any previously generated PDF for this
      // slug. It may not exist — that's fine, the document is already gone
      // either way, so we don't surface this as an error to the user.
      await fetch("/api/manage/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, type: "pdf", kind }),
      }).catch(() => {});

      router.push(redirectTo);
    } catch (error) {
      setIsDeleting(false);
      window.alert(error instanceof Error ? error.message : "Failed to delete.");
      return;
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className={className}
    >
      {isDeleting ? "Deleting…" : label}
    </button>
  );
}
