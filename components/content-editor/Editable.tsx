"use client";

import React from "react";
import { useEditMode, FieldPath } from "./EditModeContext";

interface EditableProps {
  path: FieldPath;
  value: string;
  className?: string;
  /** Allow line breaks (body copy) vs. committing on Enter (titles, labels). */
  multiline?: boolean;
}

/**
 * Renders `value` as plain text when not in edit mode — identical to the
 * original `{value}` interpolation it replaces, so normal rendering (and
 * the print/PDF path, which never enters edit mode) is unaffected.
 *
 * In edit mode, renders an inline contentEditable span so the person can
 * click directly into the rendered guide/brief and type, and reports the
 * change back up via `updateField` on blur.
 */
export function Editable({ path, value, className, multiline = false }: EditableProps) {
  const { isEditing, updateField } = useEditMode();

  if (!isEditing) {
    return <>{value}</>;
  }

  function handleBlur(event: React.FocusEvent<HTMLSpanElement>) {
    const text = event.currentTarget.innerText;
    if (text !== value) {
      updateField(path, text);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    if (!multiline && event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
    }
  }

  return (
    <span
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`outline-none rounded-sm ring-1 ring-transparent hover:ring-blue-400/70 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500/10 transition-shadow ${className ?? ""}`}
    >
      {value}
    </span>
  );
}
