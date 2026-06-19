import React from "react";

type OnePagerShellProps = {
  children: React.ReactNode;
  variant?: "light" | "dark";
  eyebrow?: string;
  pageNumber?: string;
  footer?: {
    website?: string;
    version?: string;
  };
};

export function OnePagerShell({
  children,
  variant = "light",
  eyebrow,
  pageNumber,
  footer,
}: OnePagerShellProps) {
  return (
    <div className="onepager-page" style={{ page: "onepager" }}>
      {eyebrow && (
        <div className="absolute top-0 left-0 right-0 px-14 py-3 flex justify-between items-center border-b border-gray-200">
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            {eyebrow}
          </span>
          {pageNumber && (
            <span className="text-xs font-semibold tracking-wider text-gray-500">
              {pageNumber}
            </span>
          )}
        </div>
      )}
      <div className={`h-full ${eyebrow ? "pt-12" : ""} ${variant === "dark" ? "bg-[--orca-dark]" : "bg-white"}`}>
        {children}
      </div>
      {footer && (
        <div className="absolute bottom-0 left-0 right-0 px-14 py-3 border-t border-gray-200 flex justify-between items-center">
          <span className="text-xs text-gray-500">© {new Date().getFullYear()} Orcaworks</span>
          <div className="flex gap-4 text-xs text-gray-500">
            {footer.website && <span>{footer.website}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
