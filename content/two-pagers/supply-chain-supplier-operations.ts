import type { TwoPageVerticalBrief } from "../onepager-types";

export const supplyChainSupplierOperationsBrief = {
  layout: "two-page-vertical-brief",
  slug: "supply-chain-operations",

  vertical: "Supply Chain Operations",
  audience: "Supply chain and operations leaders",

  eyebrow: "Supply chain operations",
  headline: "Close the Work Around Supply Chain Systems",
  subheadline:
    "Turn supplier, service, delivery, compliance, and invoice exceptions into governed workflows.",

  executivePov:
    "Most teams can see the exception before they can close it. The delay sits in missing evidence, unclear ownership, supplier follow-up, approvals, and manual updates across ERP, WMS, TMS, procurement, AP, email, and spreadsheets.",

  positioningStatement:
    "Orcaworks builds workflow context, governs agent actions, and brings next steps to users where they already work.",

  strategicPillars: [
    {
      title: "Supplier readiness",
      description:
        "Move suppliers from selected to ready-to-transact faster.",
    },
    {
      title: "Service recovery",
      description:
        "Turn stockout, delivery, and OTIF alerts into owner-assigned actions.",
    },
    {
      title: "Evidence closure",
      description:
        "Resolve invoice, receipt, compliance, and audit exceptions with traceable records.",
    },
  ],

  useCases: [
    {
      title: "Supplier onboarding",
      description:
        "Coordinate documents, approvals, checks, and vendor-master updates.",
    },
    {
      title: "Service triage",
      description:
        "Move from alert to root cause, owner, and action.",
    },
    {
      title: "Rejected deliveries",
      description:
        "Assemble evidence, route decisions, and close recovery cases.",
    },
    {
      title: "Invoice exceptions",
      description:
        "Gather PO, receipt, supplier, and approval evidence.",
    },
  ],

  bottomInsight:
    "Core systems record the process. Orcaworks helps complete the work around it.",

  page2: {
    title: "Prove Value in One Workflow",
    subtitle:
      "Start narrow, measure the baseline, and scale only after the workflow improves.",

    executiveBlurb:
      "Pick a recurring exception where work spans documents, approvals, follow-up, and system updates. Orcaworks helps run the workflow, measure improvement, and keep a record.",

    valueMetrics: [
      {
        label: "Cycle time",
        change: "20–40% faster",
        impact: "Defined workflow"
      },
      {
        label: "Follow-up",
        change: "20–40% fewer",
        impact: "Avoidable chasers"
      },
      {
        label: "Completeness",
        change: "+10–25 pts",
        impact: "First-pass evidence"
      },
      {
        label: "Audit prep",
        change: "25–50% less",
        impact: "Evidence-pack effort"
      }
    ],

    pilotSteps: [
      {
        number: "01",
        title: "Pick the workflow",
        description: "Choose one repeatable exception with visible ageing."
      },
      {
        number: "02",
        title: "Measure the baseline",
        description: "Track cycle time, touches, completeness, and approvals."
      },
      {
        number: "03",
        title: "Run a narrow pilot",
        description: "Limit scope to one team, queue, or cohort."
      }
    ],

    goodFirstPilots: [
      "Supplier readiness",
      "Service triage",
      "Rejected deliveries",
      "Invoice exceptions"
    ],

    cta: {
      title: "Find your highest-chase workflow",
      body:
        "Start with one supplier, delivery, service, or invoice exception and prove governed execution before scaling.",
      buttonLabel: "Plan a 90-day pilot",
      url: "https://orcaworks.com"
    }
  },

  footer: {
    website: "orcaworks.com",
  },
} as const satisfies TwoPageVerticalBrief;
