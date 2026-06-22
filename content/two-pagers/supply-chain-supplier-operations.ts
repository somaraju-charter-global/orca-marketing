import type { TwoPageVerticalBrief } from "../onepager-types";

export const supplyChainSupplierOperationsBrief = {
  layout: "two-page-vertical-brief",
  slug: "supply-chain-supplier-operations",

  vertical: "Supply Chain",
  audience: "Procurement and supplier operations teams",

  eyebrow: "ORCAWORKS FOR SUPPLY CHAIN TEAMS",
  headline: "Build resilience in supplier operations with governed execution",
  subheadline:
    "Supplier readiness slows when documents, approvals, compliance checks, and ERP updates sit outside the core system leading to delay and compliance risk.",
  executivePov:
    "Core systems are rarely the whole problem. The delays often sit around them: collecting supplier evidence, checking completeness, routing approvals, resolving exceptions, and keeping records audit-ready.",

  positioningStatement:
    "Orcaworks helps teams govern that execution layer without replacing the ERP, procurement platform, or document systems already in place.",

  strategicPillars: [
    {
      title: "Visibility into supplier readiness",
      description:
        "See which supplier records are complete, blocked, missing evidence, or waiting on approval.",
    },
    {
      title: "Control over approvals and exceptions",
      description:
        "Move routine supplier packets forward while routing incomplete, high-risk, or policy-exception cases to the right owner.",
    },
    {
      title: "Traceability across documents and decisions",
      description:
        "Keep a record of what was collected, checked, approved, rejected, overridden, or sent for follow-up.",
    },
  ],

  useCases: [
    {
      title: "Supplier onboarding",
      description:
        "Collect documents, check completeness, route approvals, and prepare ERP-ready supplier records.",
    },
    {
      title: "Supplier compliance renewal",
      description:
        "Track expiring certificates, request updated evidence, escalate exceptions, and maintain audit-ready records.",
    },
    {
      title: "PO / invoice exception handling",
      description:
        "Compare documents, flag mismatches, route exceptions, and capture approval decisions.",
    },
    {
      title: "Tender / procurement response support",
      description:
        "Collect evidence, coordinate contributors, track approvals, and prepare complete response packs.",
    },
  ],

  bottomInsight:
    "The opportunity is not to replace ERP or procurement systems. It is to govern the execution layer around them.",

  page2: {
    title: "How to start with governed execution",
    subtitle:
      "Begin with one workflow where documents, approvals, exceptions, and system updates are already creating visible delays.",

    executiveBlurb:
      "The first pilot should prove that one messy workflow can move faster, with fewer missing documents, clearer ownership, and a measurable audit trail.",

    valueMetrics: [
      {
        label: "Cycle time",
        before: "14",
        after: "5 days",
        impact: "Faster supplier readiness"
      },
      {
        label: "Manual follow-up",
        before: "12",
        after: "4 touches",
        impact: "Less chasing across teams"
      },
      {
        label: "First-pass completeness",
        before: "62%",
        after: "90%",
        impact: "Fewer missing documents"
      },
      {
        label: "Approval delay",
        before: "6",
        after: "2 days",
        impact: "Clearer routing and escalation"
      }
    ],

    pilotSteps: [
      {
        number: "01",
        title: "Pick the workflow",
        description: "Visible friction, repeatable work, clear owners."
      },
      {
        number: "02",
        title: "Measure the baseline",
        description: "Cycle time, missing evidence, rework, approval delay."
      },
      {
        number: "03",
        title: "Run a narrow pilot",
        description: "One supplier type, one region, one approval path."
      }
    ],

    goodFirstPilots: [
      "Supplier onboarding",
      "Compliance renewal",
      "PO/invoice exceptions",
      "Procurement response support"
    ],

    cta: {
      title: "Find the workflow worth testing first",
      body:
        "Pick one supplier operations workflow where delays, missing documents, approval chasing, and audit risk are visible today.",
      buttonLabel: "Plan a workflow scan",
      url: "https://orcaworks.com"
    }
  },

  footer: {
    website: "orcaworks.com",
  },
} as const satisfies TwoPageVerticalBrief;
