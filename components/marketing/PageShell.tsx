import React from "react";
import { Footer } from "./Footer";

type PageShellProps = {
  children: React.ReactNode;
  variant?: "light" | "dark" | "orange" | "blue" | "black" | "green" | "healthcareMist";
  /** Content-level light/dark surface from the guide JSON. When set it
      wins over `variant` — components pass their type's default as
      `variant` and let `surface` override it. */
  surface?: "light" | "dark";
  /** Position in the pages array. Sets id="page-N" on the page element so
      contents links (#page-N) work in the browser and exported PDF. */
  pageIndex?: number;
  pageNumber?: string | number;
  sectionLabel?: string;
  showFooter?: boolean;
  citation?: { text: string; url: string };
};

const LIGHT_SURFACES = new Set(["light", "healthcareMist"]);

export function PageShell({
  children,
  variant = "light",
  surface,
  pageIndex,
  pageNumber,
  sectionLabel,
  showFooter = true,
  citation,
}: PageShellProps) {
  const effectiveVariant = surface ?? variant;

  const variantStyles = {
    light: "bg-[#f9feff] text-[var(--orca-ink)]",
    dark: "bg-[var(--orca-dark)] text-white",
    orange: "bg-[var(--orca-orange)] text-white",
    blue: "bg-[var(--orca-blue)] text-white",
    black: "bg-[var(--orca-black)] text-white",
    green: "bg-[var(--orca-green)] text-white",
    healthcareMist: "bg-[var(--orca-healthcare-mist)] text-[var(--orca-ink)]",
  };

  // Page-level foreground tokens. Components use these for text that sits
  // directly on the page surface so a `surface` flip stays legible without
  // every page re-specifying colours. Panels/cards that keep their own
  // background (stat cards, ROI table, detailedText) keep --orca-ink.
  const surfaceVars = (
    LIGHT_SURFACES.has(effectiveVariant)
      ? {
          "--page-fg": "var(--orca-ink)",
          "--page-muted": "var(--orca-muted)",
          "--page-accent": "var(--orca-teal-dark)",
          "--page-line": "var(--orca-line)",
          // Panels that need a visible light card on a light page get a
          // deeper tint; on dark surfaces the pale panel is already the
          // contrast element.
          "--page-panel": "var(--orca-frost)",
          "--page-panel-fg": "var(--orca-panel-light-ink)",
        }
      : {
          "--page-fg": "#ffffff",
          "--page-muted": "rgba(226, 232, 240, 0.72)",
          "--page-accent": "var(--orca-frost)",
          "--page-line": "rgba(255, 255, 255, 0.16)",
          "--page-panel": "var(--orca-panel-light)",
          "--page-panel-fg": "var(--orca-panel-light-ink)",
        }
  ) as React.CSSProperties;

  return (
    <div
      id={pageIndex !== undefined ? `page-${pageIndex + 1}` : undefined}
      className={`pdf-page ${variantStyles[effectiveVariant]}`}
      style={surfaceVars}
    >
      {sectionLabel && (
        <div className="absolute top-8 left-8 text-xs font-semibold tracking-widest uppercase opacity-60">
          {sectionLabel}
        </div>
      )}
      {children}
     {showFooter && (
        <Footer pageNumber={pageNumber} citation={citation} showContact={false} />
      )}
    </div>
  );
}
