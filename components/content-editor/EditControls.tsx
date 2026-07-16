"use client";

import React from "react";

interface EditControlsProps {
  isEditing: boolean;
  isJsonMode?: boolean;
  onToggleEdit?: () => void;
  onToggleJson?: () => void;
  onSave: () => void;
  onImport?: () => void;
  onExport: () => void;
  isSaving: boolean;
  statusMessage: string | null;
}

export function EditControls({
  isEditing,
  isJsonMode = false,
  onToggleEdit,
  onToggleJson,
  onSave,
  onImport,
  onExport,
  isSaving,
  statusMessage,
}: EditControlsProps) {
  return (
    <div className="no-print fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {statusMessage && (
        <div className="bg-white border border-gray-200 shadow-md rounded-lg px-4 py-2 text-sm text-gray-700 max-w-xs">
          {statusMessage}
        </div>
      )}
      <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-full px-2 py-2">
        {onToggleEdit && (
          <button
            type="button"
            onClick={onToggleEdit}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              isEditing
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isEditing ? "Done Editing" : "Edit Content"}
          </button>
        )}
        {onToggleJson && (
          <button
            type="button"
            onClick={onToggleJson}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              isJsonMode
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isJsonMode ? "Done JSON" : "Edit JSON"}
          </button>
        )}
        {(isEditing || isJsonMode) && (
          <>
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving…" : "Save"}
            </button>
            {onImport && (
              <button
                type="button"
                onClick={onImport}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Import .json
              </button>
            )}
            <button
              type="button"
              onClick={onExport}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Export .json
            </button>
          </>
        )}
      </div>
    </div>
  );
}
