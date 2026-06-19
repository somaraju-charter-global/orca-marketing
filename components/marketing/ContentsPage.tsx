import React from "react";
import { ContentsPageContent } from "@/content/types";
import { PageShell } from "./PageShell";

type ContentsPageProps = ContentsPageContent;

export function ContentsPage({ title = "Contents", items }: ContentsPageProps) {
  return (
    <PageShell variant="dark" showFooter={false}>
      <div className="h-full flex flex-col p-12">
        <h1 className="text-5xl font-bold mb-12">{title}</h1>
        
        <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-6"
            >
              <div className="text-[var(--orca-orange)] text-2xl font-bold w-12 flex-shrink-0">
                {item.page}
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold mb-1">{item.title}</div>
                {item.description && (
                  <div className="text-white/60 text-sm leading-relaxed">{item.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
