import React from "react";
import { Footer } from "./Footer";

type PageShellProps = {
  children: React.ReactNode;
  variant?: "light" | "dark" | "orange" | "blue" | "black" | "green" | "healthcareMist";
  pageNumber?: string | number;
  sectionLabel?: string;
  showFooter?: boolean;
  citation?: { text: string; url: string };
};

export function PageShell({
  children,
  variant = "light",
  pageNumber,
  sectionLabel,
  showFooter = true,
  citation,
}: PageShellProps) {
  const variantStyles = {
    light: "bg-white text-[var(--orca-ink)]",
    dark: "bg-[var(--orca-dark)] text-white",
    orange: "bg-[var(--orca-orange)] text-white",
    blue: "bg-[var(--orca-blue)] text-white",
    black: "bg-[var(--orca-black)] text-white",
    green: "bg-[var(--orca-green)] text-white",
    healthcareMist: "bg-[var(--orca-healthcare-mist)] text-[var(--orca-ink)]",
  };

  return (
    <div className={`pdf-page ${variantStyles[variant]}`}>
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
