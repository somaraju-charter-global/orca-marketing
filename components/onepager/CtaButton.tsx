"use client";

import { Editable } from "@/components/content-editor/Editable";
import { useEditMode, FieldPath } from "@/components/content-editor/EditModeContext";

interface CtaButtonProps {
  path: FieldPath;
  url: string;
  label: string;
  className?: string;
}

/**
 * The page-2 CTA button. Pulled out into its own client component because
 * it needs useEditMode() (to stop clicking into the label from navigating
 * away) — and TwoPageVerticalBrief itself is a Server Component, rendered
 * directly (no client boundary) on the /print route used for PDF
 * generation. A Server Component can render a Client Component like this
 * one as a child, but it can't call a client hook itself.
 */
export function CtaButton({ path, url, label, className }: CtaButtonProps) {
  const { isEditing } = useEditMode();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        if (isEditing) event.preventDefault();
      }}
      className={className}
    >
      <Editable path={path} value={label} />
    </a>
  );
}
