"use client";

import React, { createContext, useContext } from "react";

// The set of "theme" accents a whole guide can be built around.
// Add new verticals here as you add new brand colors in globals.css.
export type AccentTheme = "orange" | "blue" | "healthcareMist" | "black" | "green";

// No default value here on purpose — `undefined` means "no guide-level
// theme was set", so individual blocks fall back to their original
// hardcoded default (ink / dark panel), exactly like before this existed.
const GuideThemeContext = createContext<AccentTheme | undefined>(undefined);

export function GuideThemeProvider({
  theme,
  children,
}: {
  theme?: AccentTheme;
  children: React.ReactNode;
}) {
  // Every dark surface in the guide (CoverPage, TitlePage, PageShell's
  // "dark" variant, RoiPage's table header) already reads var(--orca-dark)
  // rather than a literal hex. So for healthcareMist we don't need to touch
  // each component individually — we just override what --orca-dark
  // resolves to, scoped to this guide, and every one of those surfaces
  // picks up the same teal used for the two-pager's banner automatically.
  const darkSurfaceOverride: React.CSSProperties =
    theme === "healthcareMist"
      ? ({ "--orca-dark": "var(--orca-healthcare-mist-dark)" } as React.CSSProperties)
      : {};

  return (
    <GuideThemeContext.Provider value={theme}>
      {/* `contents` keeps this out of the layout/print flow while still
          letting the CSS variable override cascade to every page. */}
      <div className="contents" style={darkSurfaceOverride}>
        {children}
      </div>
    </GuideThemeContext.Provider>
  );
}

export function useGuideTheme(): AccentTheme | undefined {
  return useContext(GuideThemeContext);
}
