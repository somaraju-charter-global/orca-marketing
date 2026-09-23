import React from "react";
import { QuotePageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { Editable } from "@/components/content-editor/Editable";

type QuotePageProps = QuotePageContent & { pageIndex?: number };

export function QuotePage({
  pageIndex = 0,
  eyebrow,
  quote,
  source,
  supportingText,
  citation,
  variant = "dark",
  surface,
  pageNumber,
}: QuotePageProps) {
  return (
    <PageShell variant={variant} surface={surface} pageIndex={pageIndex} pageNumber={pageNumber} showFooter={true} citation={citation}>
      <div className="h-full flex">
        <div className="w-1/3 p-12 flex flex-col justify-center">
          {eyebrow && (
            <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase mb-4">
              <Editable path={["pages", pageIndex, "eyebrow"]} value={eyebrow} />
            </div>
          )}
          {supportingText && (
            <p className="text-[var(--page-fg)] text-sm leading-relaxed">
              <Editable path={["pages", pageIndex, "supportingText"]} value={supportingText} multiline />
            </p>
          )}
        </div>
        
        <div className="w-2/3 p-12 flex flex-col justify-center items-center text-center">
          <div className="text-8xl font-bold text-white mb-8">&ldquo;</div>
          <p
            className={
              variant === "orange" && surface !== "light"
                ? "text-4xl font-bold text-white leading-tight mb-8 max-w-2xl"
                : "text-4xl font-bold text-[var(--page-fg)] leading-tight mb-8 max-w-2xl"
            }
          >
            <Editable path={["pages", pageIndex, "quote"]} value={quote} multiline />
          </p>
          {source && (
            <p className="text-[var(--page-fg)] text-lg font-medium">
              — <Editable path={["pages", pageIndex, "source"]} value={source} />
            </p>
          )}
        </div>
      </div>
    </PageShell>
  );
}
