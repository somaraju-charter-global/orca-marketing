"use client";

import { createContext, useContext } from "react";

export type FieldPath = (string | number)[];

interface EditModeContextValue {
  isEditing: boolean;
  updateField: (path: FieldPath, value: string) => void;
}

const EditModeContext = createContext<EditModeContextValue>({
  isEditing: false,
  updateField: () => {},
});

export const EditModeProvider = EditModeContext.Provider;

export function useEditMode(): EditModeContextValue {
  return useContext(EditModeContext);
}
