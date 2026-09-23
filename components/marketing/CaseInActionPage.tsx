"use client";

import React from "react";
import {
  BadgeCheck,
  Banknote,
  BellRing,
  Boxes,
  CalendarClock,
  ArrowDown,
  CheckCheck,
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
  ClipboardList,
  Container,
  Database,
  Eye,
  FileCheck,
  FileSpreadsheet,
  FileText,
  FolderSearch,
  Inbox,
  Landmark,
  type LucideIcon,
  Mail,
  MessagesSquare,
  Package,
  Pause,
  Plane,
  ReceiptText,
  RefreshCw,
  Scale,
  SearchCheck,
  Send,
  ShieldCheck,
  Ship,
  Sparkles,
  Split,
  Truck,
  UserCheck,
  Warehouse,
  Workflow,
  Zap,
} from "lucide-react";
import { CaseInActionPageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { Editable } from "@/components/content-editor/Editable";

// Allowlist of lucide icons usable from JSON icon fields.
const ICONS: Record<string, LucideIcon> = {
  truck: Truck,
  ship: Ship,
  container: Container,
  warehouse: Warehouse,
  package: Package,
  boxes: Boxes,
  database: Database,
  file: FileText,
  spreadsheet: FileSpreadsheet,
  inbox: Inbox,
  mail: Mail,
  receipt: ReceiptText,
  clipboard: ClipboardList,
  calendar: CalendarClock,
  bell: BellRing,
  dollar: CircleDollarSign,
  bank: Landmark,
  banknote: Banknote,
  search: SearchCheck,
  shield: ShieldCheck,
  user: UserCheck,
  zap: Zap,
  plane: Plane,
  pause: Pause,
  split: Split,
  refresh: RefreshCw,
  scale: Scale,
  send: Send,
  check: CircleCheck,
  checks: CheckCheck,
  filecheck: FileCheck,
  badge: BadgeCheck,
  eye: Eye,
  messages: MessagesSquare,
  folder: FolderSearch,
};

const pick = (name: string | undefined, fallback: LucideIcon) =>
  (name && ICONS[name]) || fallback;

type CaseInActionPageProps = CaseInActionPageContent & { pageIndex?: number };

export function CaseInActionPage({
  pageIndex = 0,
  eyebrow,
  headline,
  explanation,
  valuePoints,
  visual,
  citation,
  surface,
  pageNumber,
}: CaseInActionPageProps) {
  const basePath = ["pages", pageIndex] as (string | number)[];
  const edit = (path: (string | number)[], value: string, multiline = false) =>
    pageIndex !== undefined ? (
      <Editable path={[...basePath, ...path]} value={value} multiline={multiline} />
    ) : (
      value
    );

  const n = visual.signals.length;

  return (
    <PageShell variant="light" surface={surface} pageIndex={pageIndex} pageNumber={pageNumber} citation={citation}>
      <div className="h-full flex flex-col">
        {/* Page header — the use-case name lives in the eyebrow */}
        <div className="px-12 pt-9">
          {eyebrow && (
            <div className="text-[var(--orca-orange)] text-xs font-semibold tracking-widest uppercase">
              {edit(["eyebrow"], eyebrow)}
            </div>
          )}
        </div>

        <div className="flex-1 flex min-h-0">
        {/* Left — the visual (55%) */}
        <div className="w-[55%] flex items-center justify-center pb-10">
            <div className="relative w-[440px] rounded-2xl ring-1 ring-[var(--page-line)] px-5 pb-5 pt-7">
              {/* Label pill straddling the top border */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--page-bg)] px-3">
                <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--page-muted)]">
                  Application blueprint
                </span>
              </div>
              {/* Signal cards in a row */}
              <div className="flex gap-2.5">
                {visual.signals.map((signal, index) => {
                  const Icon = pick(signal.icon, FileText);
                  return (
                    <div
                      key={index}
                      className="flex-1 bg-[var(--page-panel)] text-[var(--page-panel-fg)] rounded-xl px-3 py-3 text-center"
                    >
                      <Icon size={22} className="mx-auto mb-2 text-[var(--page-fg)]" strokeWidth={1.8} />
                      <p className="text-xs font-bold leading-tight">
                        {edit(["visual", "signals", index, "name"], signal.name)}
                      </p>
                      <p className="text-[11px] opacity-60 leading-snug mt-0.5">
                        {edit(["visual", "signals", index, "detail"], signal.detail, true)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Rounded elbow connectors converging to centre */}
              <svg
                className="w-full h-10 block"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                fill="none"
              >
                {visual.signals.map((_, index) => {
                  const cx = ((2 * index + 1) * 100) / (2 * n);
                  if (Math.abs(cx - 50) < 1) {
                    return (
                      <path
                        key={index}
                        d="M 50 0 V 22"
                        stroke="var(--page-line)"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    );
                  }
                  const dir = cx < 50 ? 1 : -1;
                  return (
                    <path
                      key={index}
                      d={`M ${cx} 0 V 14 Q ${cx} 22 ${cx + dir * 7} 22 H 50`}
                      stroke="var(--page-line)"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
                <path
                  d="M 50 22 V 40"
                  stroke="var(--page-line)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Mini workflow: the steps the signals resolve into */}
              <div className="w-[80%] mx-auto">
                <div className="space-y-1">
                  {visual.steps.map((step, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <div className="flex justify-center">
                          <ArrowDown size={14} className="text-[var(--page-line)]" />
                        </div>
                      )}
                      <div
                        className={
                          step.alert
                            ? "relative ring-1 ring-red-300 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5"
                            : "relative ring-1 ring-[var(--page-line)] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5"
                        }
                      >
                        <span
                          className={
                            step.alert
                              ? "absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--page-bg)] ring-1 ring-red-300 flex items-center justify-center"
                              : "absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--page-bg)] ring-1 ring-[var(--page-line)] flex items-center justify-center"
                          }
                        >
                          <Workflow
                            size={10}
                            className={step.alert ? "text-red-600" : "text-[var(--orca-orange)]"}
                            strokeWidth={2}
                          />
                        </span>
                        <span
                          className={
                            step.alert
                              ? "flex-shrink-0 w-[18px] h-[18px] rounded-full bg-red-600 text-white flex items-center justify-center text-[9px] font-bold"
                              : "flex-shrink-0 w-[18px] h-[18px] rounded-full bg-[var(--orca-orange)] text-white flex items-center justify-center text-[9px] font-bold"
                          }
                        >
                          {index + 1}
                        </span>
                        <p
                          className={
                            step.alert
                              ? "text-xs font-bold text-red-700 leading-snug"
                              : "text-xs font-semibold text-[var(--page-fg)] leading-snug"
                          }
                        >
                          {edit(["visual", "steps", index, "label"], step.label)}
                        </p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <svg className="w-full h-5 block" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
                <path
                  d="M 50 0 V 20"
                  stroke="var(--page-line)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* The action/decision panel */}
              <div className="rounded-xl ring-1 ring-[var(--page-line)] bg-[var(--page-bg)] p-3.5">
                <div className="flex items-center gap-2 mb-2.5 px-1">
                  <Sparkles size={15} className="text-[var(--orca-orange)]" strokeWidth={2} />
                  <span className="text-sm font-bold text-[var(--page-fg)]">
                    {edit(["visual", "action", "title"], visual.action.title)}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {visual.action.items.map((item, index) => {
                    const ItemIcon = pick(item.icon, ChevronRight);
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-[var(--page-panel)] text-[var(--page-panel-fg)] rounded-lg px-3 py-2.5"
                      >
                        <ItemIcon size={15} className="flex-shrink-0" strokeWidth={2} />
                        <span className="text-sm font-semibold leading-snug">
                          {edit(["visual", "action", "items", index, "label"], item.label)}
                        </span>
                        <ChevronRight size={14} className="ml-auto opacity-40" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        {/* Right — headline, explanation + value points (45%) */}
        <div className="w-[45%] flex flex-col justify-center pr-12 pb-10">
          <h3 className="text-4xl font-bold text-[var(--page-fg)] leading-tight mb-4">
            {edit(["headline"], headline)}
          </h3>
          <p className="text-sm text-[var(--page-muted)] leading-relaxed max-w-sm">
            {edit(["explanation"], explanation, true)}
          </p>
          <div className="mt-7 space-y-4">
            {valuePoints.map((point, index) => {
              const Icon = pick(point.icon, CircleCheck);
              return (
                <div key={index} className="flex items-start gap-3">
                  <Icon size={16} className="flex-shrink-0 mt-0.5 text-[var(--orca-orange)]" strokeWidth={2} />
                  <div>
                    <p className="text-sm font-bold text-[var(--page-fg)] leading-snug">
                      {edit(["valuePoints", index, "title"], point.title)}
                    </p>
                    <p className="text-xs text-[var(--page-muted)] leading-snug mt-0.5">
                      {edit(["valuePoints", index, "description"], point.description, true)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </PageShell>
  );
}
