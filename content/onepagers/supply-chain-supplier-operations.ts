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

  capabilities: [
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

    selectionCriteria: [
      {
        title: "Visible friction",
        description:
          "Teams are chasing documents, approvals, or missing information."
      },
      {
        title: "Repeatable work",
        description:
          "The same document sets, decisions, or approval paths appear often enough to standardize."
      },
      {
        title: "Human judgment points",
        description:
          "Exceptions need review, escalation, approval, or override."
      },
      {
        title: "Measurable baseline",
        description:
          "Cycle time, missing documents, approval delay, or rework can be measured before and after."
      }
    ],

    valueMeasures: [
      {
        title: "Cycle time",
        description: "Request to completed workflow."
      },
      {
        title: "Manual follow-up",
        description: "How much chasing is required."
      },
      {
        title: "Missing evidence",
        description: "How often packets are incomplete."
      }
    ],

    exampleStartingPoints: [
      {
        title: "Supplier onboarding and compliance document orchestration",
        scope: "One category · one region · one approval path · one document set"
      },
      {
        title: "Supplier compliance renewal",
        scope: "One supplier type · one certificate set · one renewal cycle"
      }
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
