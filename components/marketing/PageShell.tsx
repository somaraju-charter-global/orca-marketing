import React from "react";

type PageShellProps = {
  children: React.ReactNode;
  variant?: "light" | "dark" | "orange";
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
        <div className="absolute bottom-0 left-0 right-0 px-8 py-4 flex justify-between items-center border-t border-white/10">
          <div className="text-xs opacity-50">Orcaworks</div>
          <div className="flex items-center gap-4">
            {citation && (
              <a 
                href={citation.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs opacity-50 hover:opacity-80 underline"
              >
                {citation.text}
              </a>
            )}
            {pageNumber && (
              <div className="text-xs opacity-50">{pageNumber}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
