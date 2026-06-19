import React from "react";
import { QuotePageContent } from "@/content/types";
import { PageShell } from "./PageShell";

type QuotePageProps = QuotePageContent;

export function QuotePage({
  eyebrow,
  quote,
  source,
  supportingText,
  pageNumber,
}: QuotePageProps) {
  return (
    <PageShell variant="orange" pageNumber={pageNumber} showFooter={false}>
      <div className="h-full flex">
        <div className="w-1/3 p-12 flex flex-col justify-center">
          {eyebrow && (
            <div className="text-white/80 text-xs font-semibold tracking-widest uppercase mb-4">
              {eyebrow}
            </div>
          )}
          {supportingText && (
            <p className="text-white/90 text-sm leading-relaxed">
              {supportingText}
            </p>
          )}
        </div>
        
        <div className="w-2/3 p-12 flex flex-col justify-center items-center text-center">
          <div className="text-8xl font-bold text-white/30 mb-8">&ldquo;</div>
          <p className="text-4xl font-bold text-white leading-tight mb-8 max-w-2xl">
            {quote}
          </p>
          {source && (
            <p className="text-white/80 text-lg">— {source}</p>
          )}
        </div>
      </div>
    </PageShell>
  );
}
