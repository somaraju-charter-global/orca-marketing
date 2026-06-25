import type { TwoPageVerticalBrief } from "../onepager-types";

export const supplyChainSupplierOperationsBrief = {
  layout: "two-page-vertical-brief",
  slug: "supply-chain-in-retail-governed-execution-brief",

  vertical: "Supply Chain in Retail",
  audience: "Upper mid-market and smaller enterprise retail leaders with complex supplier, inventory, store, DC, and returns operations",

  hero: {
    eyebrow: "Retail supply-chain execution",
    headline: "Govern the supply-chain work your systems do not move",
    subheadline:
      "Retail teams lose time when documents, approvals, exceptions, evidence, and system updates sit across email, portals, spreadsheets, and operational tools.",
  },

  page1: {
    businessCostProofPoint: {
      label: "The business cost",
      statement:
        "Supply chain execution drag — missing supplier evidence, manual exception chasing, approval delays, and unresolved discrepancies — creates measurable cost, inventory exposure, and audit risk across retail operations.",
      source: "Industry research",
    },

    challenge: {
      title: "The challenge",
      body:
        "The issue is not usually the ERP, WMS, planning, supplier, or returns system. The drag sits around the record: missing evidence, unclear ownership, manual follow-up, approvals, and exception closure. These gaps accumulate into supplier delays, receiving backlogs, inventory exposure, and audit risk.",
    },

    solutionVisual: {
      title: "How Orcaworks governs the retail execution layer",
      imagePath: "/images/orcaworks-stack.png?v=3",
      leftLabel: "Existing retail systems",
      leftItems: [
        "ERP and order management",
        "WMS and receiving",
        "Supplier portals",
        "Planning systems",
        "Returns platforms",
      ],
      middleLabel: "Orcaworks governed execution layer",
      middleItems: [
        "Connects context",
        "Routes work",
        "Governs decisions",
        "Records evidence",
        "Brings actions to users",
      ],
      rightLabel: "Outcomes",
      rightItems: [
        "Faster supplier readiness",
        "Fewer receiving exceptions",
        "Cleaner inventory decisions",
        "Audit-ready evidence",
      ],
    },

    orcaworksValue: {
      title: "Orcaworks value to retail operations",
      items: [
        {
          title: "Works around your retail stack — no system replacement",
          description:
            "Orcaworks governs the execution layer that sits around existing ERP, WMS, planning, and supplier systems.",
        },
        {
          title: "Governed execution with full audit trail",
          description:
            "Every supplier document, exception, approval, and disposition decision is checked, routed, recorded, and retrievable.",
        },
        {
          title: "Supplier and DC capacity leverage without headcount",
          description:
            "Reduce manual coordination across supplier onboarding, receiving, and exception closure while maintaining control.",
        },
        {
          title: "Control as suppliers, systems, and teams change",
          description:
            "Maintain consistent execution standards as supplier bases, DC footprints, planning systems, and teams evolve.",
        },
      ],
    },

    bottomCallout: {
      title: "The opportunity",
      statement:
        "Govern the execution layer around existing retail systems and show measurable movement in supplier readiness, exception closure, and evidence control — without replacing core platforms.",
    },
  },

  page2: {
    title: "Where Orcaworks creates value in retail supply chain",
    subtitle:
      "Governed execution shows up in the workflows where supplier delays, receiving exceptions, inventory gaps, and evidence risk are already visible.",

    strategicBusinessPriorities: [
      {
        title: "Supplier readiness and inbound exception closure",
        description:
          "Govern supplier documents, evidence, and approvals before trading is blocked. Connect POs, receipts, invoices, and claims so exceptions close cleanly.",
      },
      {
        title: "Inventory exception resolution and replenishment control",
        description:
          "Turn planning and stock signals into owner-assigned workflows with clear decisions. Route counts, checks, and allocation decisions through governed paths.",
      },
      {
        title: "Traceability readiness and evidence control",
        description:
          "Keep supplier, product, certificate, and batch evidence ready before regulatory pressure hits. Assemble complete packs in hours with every document retrievable.",
      },
    ],

    priorityWorkflows: [
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

    valueMetrics: [
      {
        metric: "Cycle time",
        baseline: "Current average per record",
        movement: "20–40% reduction target",
        impact: "Faster supplier and operational closure",
      },
      {
        metric: "Manual follow-up touches",
        baseline: "Current coordination load per case",
        movement: "25–50% reduction target",
        impact: "Less chasing across supplier and DC teams",
      },
      {
        metric: "First-pass completeness",
        baseline: "Current complete-on-arrival rate",
        movement: "15–30 point improvement target",
        impact: "Fewer missing documents on arrival",
      },
      {
        metric: "Aged exceptions",
        baseline: "Current unresolved backlog",
        movement: "20–40% reduction target",
        impact: "Fewer stalled decisions in the DC",
      },
    ],

    cta: {
      statement:
        "Automate your first workflow in 8 weeks — start with supplier onboarding, receiving exceptions, or inventory resolution.",
      url: "https://orcaworks.ai",
    },
  },

  footer: {
    website: "orcaworks.ai",
  },
} as const satisfies TwoPageVerticalBrief;
