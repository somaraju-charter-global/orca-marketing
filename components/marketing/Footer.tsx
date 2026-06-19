import React from "react";

type FooterProps = {
  pageNumber?: string | number;
  totalPages?: number;
  showLogo?: boolean;
};

export function Footer({ pageNumber, totalPages, showLogo = true }: FooterProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-8 py-4 flex justify-between items-center border-t border-white/10">
      {showLogo && (
        <div className="text-xs font-medium opacity-50">Orcaworks</div>
      )}
      <div className="flex-1" />
      {pageNumber && (
        <div className="text-xs opacity-50">
          {totalPages ? `${pageNumber} / ${totalPages}` : pageNumber}
        </div>
      )}
    </div>
  );
}
