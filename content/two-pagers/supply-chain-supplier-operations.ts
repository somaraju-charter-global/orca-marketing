import type { TwoPageVerticalBrief } from "../onepager-types";

export const supplyChainSupplierOperationsBrief = {
  layout: "two-page-vertical-brief",
  slug: "supply-chain-in-retail-governed-execution-brief",

  vertical: "Supply Chain in Retail",
  audience: "Upper mid-market and smaller enterprise retail leaders with complex supplier, inventory, store, DC, and returns operations",

  hero: {
    eyebrow: "Retail supply-chain execution",
    headline: "Your systems hold the records. The work still stalls around them.",
    subheadline:
      "When supplier documents, receiving exceptions, and inventory decisions scatter across email, portals, and spreadsheets, your teams spend more time chasing context than closing work.",
  },

  page1: {
    businessCostProofPoint: {
      label: "The business cost",
      statement:
        "95% of retail executives expect global trade policies to push costs higher, while 71% report that financial discipline and stronger cost control now define competitive advantage.",
      source: "Deloitte — 2026 Global Retail Industry Outlook",
    },

    challenge: {
      title: "The challenge",
      body:
        "You already have the systems. What you don't have is clean execution around them. Supplier documents arrive incomplete. Receiving discrepancies sit unresolved. Inventory exceptions age out. The work doesn't fail because the ERP is broken — it stalls because nobody knows who owns the next action.",
    },

    solutionVisual: {
      title: "How Orcaworks governs the retail execution layer",
      imagePath: "/images/orcaworks-stack.png?v=5",
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
        "Builds workflow context",
        "Routes to the right owner",
        "Checks evidence completeness",
        "Records every decision",
        "Surfaces next actions",
      ],
      rightLabel: "Outcomes",
      rightItems: [
        "Suppliers ready to trade faster",
        "Exceptions close, not age",
        "Decisions happen with full context",
        "Evidence ready when you need it",
      ],
    },

    orcaworksValue: {
      title: "Orcaworks value to retail operations",
      items: [
        {
          title: "Fits around what you already run",
          description:
            "Don't replace your ERP, WMS, or planning tools. Orcaworks governs the execution work that happens between them.",
        },
        {
          title: "Every decision leaves a trail",
          description:
            "Supplier approvals, exception closures, and disposition calls are recorded with full context — not buried in email threads.",
        },
        {
          title: "Do more with the team you have",
          description:
            "Handle supplier onboarding, receiving exceptions, and inventory decisions without adding headcount or losing control.",
        },
        {
          title: "Built for change, not just today's setup",
          description:
            "Your supplier base will shift. Your DC footprint will expand. Your systems will change. Your execution layer shouldn't break when they do.",
        },
      ],
    },

    bottomCallout: {
      title: "The opportunity",
      statement:
        "Pick one workflow where delay, missing evidence, and unclear ownership are already visible. Baseline it. Govern it. Prove whether work closes faster.",
    },
  },

  page2: {
    title: "Where Orcaworks creates value in retail supply chain",
    subtitle:
      "Start with the workflows where your teams already feel the drag. The ones where exceptions age, evidence goes missing, and nobody's sure who should act next.",

    strategicBusinessPriorities: [
      {
        title: "Supplier readiness and inbound exception closure",
        description:
          "Get suppliers ready to trade before the first blocked order. Close receiving discrepancies with complete evidence, not email archaeology.",
      },
      {
        title: "Inventory exception resolution and replenishment control",
        description:
          "When the system says you have stock but the shelf is empty, someone needs to own the answer. Route the exception to the right person with the context they need.",
      },
      {
        title: "Traceability readiness and evidence control",
        description:
          "Don't wait for a recall to find out your evidence is scattered. Keep supplier certificates, batch records, and product documentation ready before you need them.",
      },
    ],

    priorityWorkflows: [
      {
        title: "Supplier onboarding",
        description:
          "Bank details, insurance, certificates, EDI setup — get everything checked and approved.",
      },
      {
        title: "Receiving discrepancies",
        description:
          "Pull together the PO, photos, invoice, and supplier response to close it cleanly.",
      },
      {
        title: "Replenishment exceptions",
        description:
          "Route stockouts and inventory mismatches to whoever can fix them with full context.",
      },
      {
        title: "Recall evidence packs",
        description:
          "Assemble supplier documents, batch records, and certificates when you need them.",
      },
    ],

    valueMetrics: [
      {
        metric: "Cycle time",
        baseline: "Current average per workflow",
        movement: "20–40% faster",
        impact: "Work closes, doesn't sit",
      },
      {
        metric: "Manual follow-up",
        baseline: "Current touches per case",
        movement: "25–50% fewer",
        impact: "Less time chasing people",
      },
      {
        metric: "First-pass completeness",
        baseline: "Current complete-on-arrival rate",
        movement: "15–30 points better",
        impact: "Evidence shows up right the first time",
      },
      {
        metric: "Aged exceptions",
        baseline: "Current backlog beyond SLA",
        movement: "20–40% reduction",
        impact: "Fewer cases stuck in limbo",
      },
    ],

    cta: {
      statement:
        "Start with one workflow. Baseline how long it takes today. Then prove whether governed execution makes it faster.",
      url: "https://orcaworks.ai",
    },
  },

  footer: {
    website: "orcaworks.ai",
  },
} as const satisfies TwoPageVerticalBrief;
