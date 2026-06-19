import React from "react";
import { ContentsPageContent } from "@/content/types";
import { PageShell } from "./PageShell";

type ContentsPageProps = ContentsPageContent;

export function ContentsPage({ title = "Contents", items }: ContentsPageProps) {
  return (
    <PageShell variant="dark" showFooter={false}>
      <div className="h-full flex flex-col p-12">
        <h1 className="text-5xl font-bold mb-12">{title}</h1>
        
        <div className="flex-1 space-y-0">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-8 py-6 border-b border-white/10 last:border-0"
            >
              <div className="text-[var(--orca-orange)] text-2xl font-bold w-12 flex-shrink-0">
                {item.page}
              </div>
              <div className="flex-1">
                <div className="text-xl font-semibold mb-2">{item.title}</div>
                {item.description && (
                  <div className="text-white/60 text-sm">{item.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
