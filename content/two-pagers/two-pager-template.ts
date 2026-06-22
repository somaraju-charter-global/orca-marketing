import type { TwoPageVerticalBrief } from "../onepager-types";

export const twoPagerTemplate = {
  layout: "two-page-vertical-brief",
  slug: "two-pager-template",

  vertical: "Your Vertical",
  audience: "Your target audience description here",

  eyebrow: "ORCAWORKS FOR YOUR TEAM",
  headline: "Build value in your operations with governed execution",
  subheadline:
    "Operations slow when documents, approvals, compliance checks, and system updates sit outside the core system leading to delay and risk.",
  executivePov:
    "Core systems are rarely the whole problem. The delays often sit around them: collecting evidence, checking completeness, routing approvals, resolving exceptions, and keeping records audit-ready.",

  positioningStatement:
    "Orcaworks helps teams govern that execution layer without replacing the core systems <give a list of example systems already in place>.",

  strategicPillars: [
    {
      title: "Visibility into operational readiness",
      description:
        "See which records are complete, blocked, missing evidence, or waiting on approval.",
    },
    {
      title: "Control over approvals and exceptions",
      description:
        "Move routine packets forward while routing incomplete, high-risk, or policy-exception cases to the right owner.",
    },
    {
      title: "Traceability across documents and decisions",
      description:
        "Keep a record of what was collected, checked, approved, rejected, overridden, or sent for follow-up.",
    },
  ],

  useCases: [
    {
      title: "Primary workflow one",
      description:
        "Collect documents, check completeness, route approvals, and prepare system-ready records.",
    },
    {
      title: "Primary workflow two",
      description:
        "Track expiring items, request updated evidence, escalate exceptions, and maintain audit-ready records.",
    },
    {
      title: "Exception handling workflow",
      description:
        "Compare documents, flag mismatches, route exceptions, and capture approval decisions.",
    },
    {
      title: "Response support workflow",
      description:
        "Collect evidence, coordinate contributors, track approvals, and prepare complete response packs.",
    },
  ],

  bottomInsight:
    "The opportunity is not to replace core systems. It is to govern the execution layer around them.",

  page2: {
    title: "How to start with governed execution",
    subtitle:
      "Begin with one workflow where documents, approvals, exceptions, and system updates are already creating visible delays.",

    executiveBlurb:
      "The first pilot should prove that one messy workflow can move faster, with fewer missing documents, clearer ownership, and a measurable audit trail.",

    valueMetrics: [
      {
        label: "Cycle time",
        change: "14 → 5 days",
        impact: "Faster operational readiness"
      },
      {
        label: "Manual follow-up",
        change: "12 → 4 touches",
        impact: "Less chasing across teams"
      },
      {
        label: "First-pass completeness",
        change: "62% → 90%",
        impact: "Fewer missing documents"
      },
      {
        label: "Approval delay",
        change: "6 → 2 days",
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
        description: "One process type, one region, one approval path."
      }
    ],

    goodFirstPilots: [
      "Workflow one",
      "Workflow two",
      "Exception handling",
      "Response support"
    ],

    cta: {
      title: "Find the workflow worth testing first",
      body:
        "Pick one operational workflow where delays, missing documents, approval chasing, and audit risk are visible today.",
      buttonLabel: "Plan a workflow scan",
      url: "https://orcaworks.com"
    }
  },

  footer: {
    website: "orcaworks.com",
  },
} as const satisfies TwoPageVerticalBrief;
