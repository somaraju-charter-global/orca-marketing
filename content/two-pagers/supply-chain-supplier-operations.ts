import type { TwoPageVerticalBrief } from "../onepager-types";

export const supplyChainSupplierOperationsBrief = {
  layout: "two-page-vertical-brief",
  slug: "supply-chain-in-retail-governed-execution-brief",

  vertical: "Supply Chain in Retail",
  audience: "Upper mid-market and smaller enterprise retail leaders with complex supplier, inventory, store, DC, and returns operations",

  eyebrow: "Retail supply-chain execution",
  headline: "Govern the supply-chain work your systems do not move",
  subheadline:
    "Retail teams lose time when documents, approvals, exceptions, evidence, and system updates sit across email, portals, spreadsheets, and operational tools.",

  executivePov:
    "The issue is not usually the ERP, WMS, planning, supplier, or returns system. The drag sits around the record: missing evidence, unclear ownership, manual follow-up, approvals, and exception closure.",

  positioningStatement:
    "Orcaworks governs the execution layer around existing retail systems by connecting context, routing decisions, recording actions, and bringing work to users.",

  strategicPillars: [
    {
      title: "Supplier readiness",
      description:
        "Govern supplier documents, evidence, approvals, readiness tasks, and vendor-master updates before trading is blocked.",
    },
    {
      title: "Inbound exception closure",
      description:
        "Connect POs, ASNs, receipts, invoices, photos, claims, and approvals so exceptions close cleanly.",
    },
    {
      title: "Inventory exception resolution",
      description:
        "Turn planning and stock signals into owner-assigned workflows with clear decisions and recorded outcomes.",
    },
    {
      title: "Traceability readiness",
      description:
        "Keep supplier, product, certificate, batch, incident, and recall evidence ready before pressure hits.",
    },
    {
      title: "Returns governance",
      description:
        "Govern return evidence, disposition decisions, vendor-credit packs, fraud escalations, and finance closure.",
    },
  ],

  useCases: [
    {
      title: "Supplier onboarding",
      description:
        "Check required documents, request missing evidence, route approvals, and record supplier-ready status.",
    },
    {
      title: "Receiving discrepancies",
      description:
        "Match PO, ASN, receipt, invoice, damage evidence, supplier terms, and closure decision.",
    },
    {
      title: "Replenishment exceptions",
      description:
        "Route store counts, DC checks, supplier updates, allocation decisions, and system updates.",
    },
    {
      title: "Recall evidence packs",
      description:
        "Assemble product, supplier, batch, certificate, incident, and communication evidence for timed dry-runs.",
    },
  ],

  bottomInsight:
    "Do not replace core systems. Govern the execution layer around them.",

  page2: {
    title: "Start where execution drag is visible",
    subtitle:
      "Pick one workflow with measurable delay, missing evidence, manual follow-up, and unclear ownership.",

    executiveBlurb:
      "A strong first pilot should baseline the current workflow, govern the next action, and prove whether work closes faster and cleaner.",

    valueMetrics: [
      {
        label: "Cycle time",
        change: "20–40% reduction target",
        impact: "Faster operational closure"
      },
      {
        label: "Manual follow-up",
        change: "25–50% reduction target",
        impact: "Less chasing across teams"
      },
      {
        label: "First-pass completeness",
        change: "15–30 point improvement target",
        impact: "Fewer missing documents"
      },
      {
        label: "Aged exceptions",
        change: "20–40% reduction target",
        impact: "Fewer stalled decisions"
      }
    ],

    pilotSteps: [
      {
        number: "01",
        title: "Baseline the workflow",
        description: "Measure cycle time, touches, gaps, and ageing."
      },
      {
        number: "02",
        title: "Govern the actions",
        description: "Define checks, routing, escalation, approvals, and records."
      },
      {
        number: "03",
        title: "Prove the lift",
        description: "Compare closure speed, completeness, and follow-up."
      }
    ],

    goodFirstPilots: [
      "Supplier readiness workflow",
      "PO, ASN, and receiving exception workflow",
      "Inventory and replenishment exception workflow",
      "Traceability or recall evidence-pack workflow"
    ],

    cta: {
      title: "Plan a workflow pilot",
      body:
        "Choose one supplier, inbound, inventory, traceability, or returns workflow where delay and evidence gaps are already measurable.",
      buttonLabel: "Start with one workflow",
      url: "https://orcaworks.ai"
    }
  },

  footer: {
    website: "orcaworks.ai",
  },
} as const satisfies TwoPageVerticalBrief;
