import type { TwoPageVerticalBrief } from "../onepager-types";

export const supplyChainSupplierOperationsBrief = {
  layout: "two-page-vertical-brief",
  slug: "supply-chain-in-retail-governed-execution-brief",

  vertical: "Supply Chain in Retail",
  audience: "Upper mid-market and smaller enterprise retail leaders with complex supplier, inventory, store, DC, and returns operations",

  hero: {
    eyebrow: "Retail supply-chain execution",
    headline: "Run leaner operations without replacing the systems you trust",
    subheadline:
      "Orcaworks helps retail supply-chain teams reduce manual chasing, close exceptions faster, and create a governed execution layer around ERP, WMS, planning tools, portals, and email.",
  },

  page1: {
    businessCostProofPoint: {
      label: "The business cost",
      statement:
        "95% of retail executives expect global trade policies to push costs higher, while 71% report that financial discipline and stronger cost control now define competitive advantage. When cost control matters, execution work hidden between systems becomes a direct productivity lever.",
      source: "Deloitte — 2026 Global Retail Industry Outlook",
    },

    challenge: {
      title: "The challenge",
      body:
        "You already have the systems. What you do not have is clean execution around them. Supplier documents arrive incomplete. Receiving discrepancies sit unresolved. Inventory exceptions age out. Work stalls because the next action, owner, evidence, or decision is unclear.",
    },

    solutionVisual: {
      imagePath: "/images/orcaworks-stack.png?v=5",
    },

    orcaworksValue: {
      title: "Orcaworks value to retail operations",
      items: [
        {
          title: "Fits around what you already run",
          description:
            "Orcaworks governs execution around your ERP, WMS, planning tools, portals, and email — without replacing them.",
        },
        {
          title: "Every decision leaves a trail",
          description:
            "Approvals, exception closures, and operational decisions are captured with context, evidence, owner, and outcome.",
        },
        {
          title: "Do more with the team you have",
          description:
            "Reduce manual chasing, checking, handoffs, and rework across supplier, inventory, receiving, and evidence workflows.",
        },
        {
          title: "Built for change",
          description:
            "As suppliers, systems, rules, and teams change, Orcaworks keeps execution logic configurable and controlled.",
        },
      ],
    },

    bottomCallout: {
      title: "The opportunity",
      statement:
        "The opportunity is to turn scattered execution work into governed operating leverage: fewer handoffs, clearer ownership, cleaner evidence, faster exception closure, and more work completed by the teams already in place.",
    },
  },

  page2: {
    title: "Where Orcaworks creates value in retail supply chain",
    subtitle:
      "Focus on the workflows where exceptions age, evidence goes missing, and teams lose time chasing the next owner, decision, or update.",

    strategicBusinessPriorities: [
      {
        title: "Supplier readiness and inbound exception closure",
        description:
          "Get suppliers ready to trade and close receiving issues with complete evidence, clear ownership, and recorded decisions.",
      },
      {
        title: "Inventory exception resolution and replenishment control",
        description:
          "Route stock, replenishment, and availability exceptions to the right owner with the context needed to act.",
      },
      {
        title: "Traceability readiness and evidence control",
        description:
          "Keep certificates, batch records, product documentation, and supplier evidence ready before audits, incidents, or recalls.",
      },
    ],

    priorityWorkflows: [
      {
        title: "Supplier onboarding",
        description:
          "Check banking, insurance, certificates, EDI readiness, approvals, and supplier-ready status.",
      },
      {
        title: "Receiving discrepancies",
        description:
          "Connect PO, receipt, photos, invoice, supplier response, decision, and closure evidence.",
      },
      {
        title: "Replenishment exceptions",
        description:
          "Route stockouts, mismatches, DC checks, supplier updates, and allocation decisions.",
      },
      {
        title: "Recall evidence packs",
        description:
          "Assemble supplier documents, batch records, certificates, communications, and readiness evidence.",
      },
    ],

    valueMetrics: [
      {
        metric: "Cycle time",
        baseline: "Current average per workflow",
        movement: "20–40% faster closure",
        impact: "Work closes sooner",
      },
      {
        metric: "Manual follow-up",
        baseline: "Current touches per case",
        movement: "25–50% fewer touches",
        impact: "Less chasing across teams",
      },
      {
        metric: "First-pass completeness",
        baseline: "Current complete-on-arrival rate",
        movement: "15–30 point improvement",
        impact: "Fewer missing documents",
      },
      {
        metric: "Aged exceptions",
        baseline: "Current backlog beyond SLA",
        movement: "20–40% fewer aged exceptions",
        impact: "Fewer stalled decisions",
      },
    ],

    cta: {
      statement:
        "Run one workflow over 8 weeks. Baseline execution drag around existing systems and measure whether governed execution closes work faster.",
      url: "https://orcaworks.ai",
    },
  },

  footer: {
    website: "orcaworks.ai",
  },
} as const satisfies TwoPageVerticalBrief;
