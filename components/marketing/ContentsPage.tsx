import React from "react";
import { ContentsPageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { Editable } from "@/components/content-editor/Editable";

type ContentsPageProps = ContentsPageContent & { pageIndex?: number };

export function ContentsPage({ pageIndex = 0, title = "Contents", items }: ContentsPageProps) {
  return (
    <PageShell variant="dark" showFooter={false}>
      <div className="h-full flex flex-col p-12">
        <h1 className="text-5xl font-bold mb-12">
          <Editable path={["pages", pageIndex, "title"]} value={title} />
        </h1>
        
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
                <div className="text-lg font-semibold mb-1">
                  <Editable
                    path={["pages", pageIndex, "items", index, "title"]}
                    value={item.title}
                  />
                </div>
                {item.description && (
                  <div className="text-white/60 text-sm leading-relaxed">
                    <Editable
                      path={["pages", pageIndex, "items", index, "description"]}
                      value={item.description}
                      multiline
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
