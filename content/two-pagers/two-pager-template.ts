import type { TwoPageVerticalBrief } from "../onepager-types";

export const twoPagerTemplate = {
  layout: "two-page-vertical-brief",
  slug: "two-pager-template",
  accentTheme: "healthcareMist",

  vertical: "Your Vertical",
  audience: "Your target audience description here",

  hero: {
    eyebrow: "ORCAWORKS FOR YOUR TEAM",
    headline: "Build value in your operations with governed execution",
    subheadline:
      "Operations slow when documents, approvals, compliance checks, and system updates sit outside the core system — leading to delay, risk, and manual effort.",
  },

  page1: {
    businessCostProofPoint: {
      label: "The business cost",
      metric: "$X per year",
      statement:
        "Execution work around core systems — missing evidence, unclear ownership, manual follow-up, and unclosed exceptions — drives measurable cost and risk in [vertical] operations.",
      source: "Industry research / internal baseline",
    },

    challenge: {
      title: "The challenge",
      body:
        "Core systems are rarely the whole problem. The drag sits around the record: missing evidence, unclear ownership, manual follow-up, approval delays, exception closure, and system updates. These gaps accumulate into visible delays, audit exposure, and avoidable rework.",
    },

    solutionVisual: {
      imagePath: "/images/supply-chain-speed.jpg",
    },

    orcaworksValue: {
      title: "Orcaworks value to your organisation",
      items: [
        {
          title: "Works around existing systems — no replacement required",
          description:
            "Orcaworks governs the execution layer that sits around your ERP, WMS, CRM, or operational platforms.",
        },
        {
          title: "Governed execution with full audit trail",
          description:
            "Every action is checked, routed, decided, recorded, and retrievable. Not loose automation — governed execution.",
        },
        {
          title: "Capacity and headcount leverage",
          description:
            "Reduce manual coordination and exception chasing without adding headcount or growing the coordination layer.",
        },
        {
          title: "Future-proof as systems, workflows, and teams change",
          description:
            "The execution layer adapts as core systems, workflows, teams, and AI models evolve.",
        },
      ],
    },

    bottomCallout: {
      title: "The opportunity",
      statement:
        "Govern the execution layer around existing systems and show measurable movement in operational readiness, exception closure, and evidence control — without replacing core platforms.",
    },
  },

  page2: {
    title: "Where Orcaworks creates measurable value",
    subtitle:
      "Governed execution shows up in the workflows where delay, missing evidence, manual follow-up, and exception backlog are already visible.",

    strategicBusinessPriorities: [
      {
        title: "Operational readiness",
        description:
          "Ensure records are complete, evidence is current, and approvals are in place before execution is blocked.",
      },
      {
        title: "Exception throughput",
        description:
          "Move exceptions through the right decision path — checked, routed, decided, and closed — without manual chasing.",
      },
      {
        title: "Audit and compliance confidence",
        description:
          "Keep a retrievable record of every check, decision, approval, and exception outcome across every workflow.",
      },
      {
        title: "Capacity without headcount",
        description:
          "Handle more volume through governed execution without growing the coordination layer.",
      },
      {
        title: "Control as systems and teams change",
        description:
          "Maintain consistent execution standards as systems, suppliers, workflows, and teams evolve.",
      },
    ],

    priorityWorkflows: [
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

    valueMetrics: [
      {
        metric: "Cycle time",
        baseline: "Current average per record or exception",
        movement: "20–40% reduction target",
        impact: "Faster operational closure",
      },
      {
        metric: "Manual touches per case",
        baseline: "Current coordination load",
        movement: "25–50% reduction target",
        impact: "Less chasing across teams",
      },
      {
        metric: "First-pass completeness",
        baseline: "Current rate of complete records on first submission",
        movement: "15–30 point improvement target",
        impact: "Fewer missing documents on arrival",
      },
      {
        metric: "Aged exceptions",
        baseline: "Current backlog of unresolved exceptions",
        movement: "20–40% reduction target",
        impact: "Fewer stalled decisions",
      },
      {
        metric: "Approval delay",
        baseline: "Current average time from submission to approval decision",
        movement: "Directional improvement within first workflow",
        impact: "Clearer routing and escalation",
      },
    ],

    cta: {
      statement:
        "Start around existing systems with one visible execution workflow and show measurable movement in weeks, not transformation cycles.",
      url: "https://orcaworks.com",
    },
  },

  footer: {
    website: "orcaworks.com",
  },
} as const satisfies TwoPageVerticalBrief;
