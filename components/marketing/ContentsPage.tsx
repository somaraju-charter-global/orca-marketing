import React from "react";
import { ContentsPageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { Editable } from "@/components/content-editor/Editable";

type ContentsPageProps = ContentsPageContent & { pageIndex?: number };

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[var(--orca-orange)] text-xs font-semibold tracking-[0.2em] uppercase">
        {children}
      </span>
      <span className="h-px flex-1 bg-[var(--page-line)]" />
    </div>
  );
}

export function ContentsPage({ pageIndex = 0, title = "Contents", eyebrow, items, surface }: ContentsPageProps) {
  // Grouped items: the largest group is the document's body (the ranked
  // use cases) and renders as the hero tile grid; the other groups stack
  // in a narrower rail. Ungrouped content falls back to a flat two-column
  // grid of rows.
  const grouped = items.some((item) => item.group !== undefined);

  const orderedGroups: { label: string; items: { item: (typeof items)[number]; index: number }[] }[] = [];
  items.forEach((item, index) => {
    const label = item.group ?? "";
    let group = orderedGroups.find((g) => g.label === label);
    if (!group) {
      group = { label, items: [] };
      orderedGroups.push(group);
    }
    group.items.push({ item, index });
  });
  const heroGroup = grouped
    ? orderedGroups.reduce((a, b) => (b.items.length > a.items.length ? b : a))
    : undefined;
  const railGroups = orderedGroups.filter((g) => g !== heroGroup);

  const half = Math.ceil(items.length / 2);
  const flatColumns = [items.slice(0, half), items.slice(half)];

  const tile = (item: (typeof items)[number], index: number) => (
    <a
      key={index}
      href={`#page-${item.page}`}
      className="border-l-2 border-[var(--orca-orange)] px-4 py-3 flex items-center justify-between gap-3 no-underline"
    >
      <div className="min-w-0">
        <div className="text-sm font-semibold leading-snug text-[var(--page-fg)]">
          <Editable path={["pages", pageIndex, "items", index, "title"]} value={item.title} />
        </div>
        {item.description && (
          <div className="text-xs text-[var(--page-muted)] leading-relaxed mt-1">
            <Editable
              path={["pages", pageIndex, "items", index, "description"]}
              value={item.description}
              multiline
            />
          </div>
        )}
      </div>
      <span className="text-[var(--orca-orange)] font-bold shrink-0">{item.page}</span>
    </a>
  );

  const railRow = (item: (typeof items)[number], index: number) => (
    <a key={index} href={`#page-${item.page}`} className="flex items-baseline gap-3 py-1.5 no-underline">
      <span className="text-sm font-bold text-[var(--orca-orange)] w-6 shrink-0">{item.page}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold leading-snug text-[var(--page-fg)]">
          <Editable path={["pages", pageIndex, "items", index, "title"]} value={item.title} />
        </div>
        {item.description && (
          <div className="text-xs text-[var(--page-muted)] leading-relaxed mt-0.5">
            <Editable
              path={["pages", pageIndex, "items", index, "description"]}
              value={item.description}
              multiline
            />
          </div>
        )}
      </div>
    </a>
  );

  return (
    <PageShell variant="light" surface={surface} pageIndex={pageIndex} showFooter={false}>
      <div
        className="h-full flex flex-col px-14 pt-12 pb-10"
        style={surface === "dark" ? ({ "--page-muted": "#ffffff" } as React.CSSProperties) : undefined}
      >
        {eyebrow && (
          <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <Editable path={["pages", pageIndex, "eyebrow"]} value={eyebrow} />
          </div>
        )}
        <h1 className="text-4xl font-bold text-[var(--page-fg)] mb-8">
          <Editable path={["pages", pageIndex, "title"]} value={title} />
        </h1>

        {heroGroup ? (
          <div className="flex-1 flex gap-14 min-h-0">
            <div className="flex-[2] flex flex-col gap-7">
              {railGroups.map((group) => (
                <div key={group.label}>
                  <GroupLabel>
                    <Editable path={["pages", pageIndex, "items", group.items[0].index, "group"]} value={group.label} />
                  </GroupLabel>
                  <div className="flex flex-col">
                    {group.items.map(({ item, index }) => railRow(item, index))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-[3]">
              <GroupLabel>
                <Editable path={["pages", pageIndex, "items", heroGroup.items[0].index, "group"]} value={heroGroup.label} />
              </GroupLabel>
              <div className="grid grid-cols-2 gap-3">
                {heroGroup.items.map(({ item, index }) => tile(item, index))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-2 gap-x-16 content-start">
            {flatColumns.map((columnItems, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-4">
                {columnItems.map((item, index) => railRow(item, columnIndex * half + index))}
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
