import type { TwoPageVerticalBrief } from "../onepager-types";

export const facilityServicesManagementBrief = {
  layout: "two-page-vertical-brief",
  slug: "facility-services-management-governed-execution-brief",

  vertical: "Facility Services & Management",
  audience:
    "Operations, facilities, workplace, maintenance, and compliance leaders running multi-site facility-services operations",

  hero: {
    eyebrow: "Facility services execution",
    headline: "Run more sites without adding back-office headcount",
    subheadline:
      "Orcaworks helps facility-services teams cut manual follow-up, close requests and SLAs faster, and govern execution around CMMS, ERP, client portals, equipment dashboards, and email.",
  },

  page1: {
    businessCostProofPoint: {
      label: "The business cost",
      statement:
        "The U.S. employs roughly 2.4 million janitors and building cleaners, with about 351,300 openings every year — mostly to replace workers who leave. In a labor-heavy service model, every hour spent chasing requests, SLAs, evidence, and billing data is margin lost.",
      source: "U.S. Bureau of Labor Statistics — Occupational Outlook Handbook, 2024",
    },

    challenge: {
      title: "The challenge",
      body:
        "You already run the sites, people, vendors, and systems. What is missing is clean execution around them. Requests arrive from many channels, SLA risks surface late, equipment and vendor exceptions need follow-up, and proof of completion is often scattered.",
    },

    solutionVisual: {
      imagePath: "/images/orcaworks-stack.png?v=5",
    },

    orcaworksValue: {
      title: "How Orcaworks improves facility operations",
      items: [
        {
          title: "Fits around what you run",
          description:
            "Governs execution around CMMS, ERP, client portals, equipment systems, BI dashboards, and email — without replacing them.",
        },
        {
          title: "Turns alerts into owned work",
          description:
            "SLA risks, machine alerts, missing documents, and data gaps become routed actions with owner, due date, and outcome.",
        },
        {
          title: "Every site leaves proof",
          description:
            "Work orders, inspections, photos, sign-offs, exceptions, and service evidence are captured in one governed trail.",
        },
        {
          title: "Built for change",
          description:
            "As sites, scopes, vendors, crews, equipment, and client rules change, workflows stay configurable and controlled.",
        },
      ],
    },

    bottomCallout: {
      title: "The opportunity",
      statement:
        "Turn scattered coordination work into governed operating leverage: fewer handoffs, faster closure, cleaner proof of service, and more work completed by the teams already in place. This creates measurable capacity without adding headcount.",
    },
  },

  page2: {
    title: "Where Orcaworks creates value in facility services",
    subtitle:
      "Focus on the workflows where requests stall, SLAs slip, evidence goes missing, and teams chase the next owner, decision, or update.",

    strategicBusinessPriorities: [
      {
        title: "Service request and SLA closure",
        description:
          "Capture requests from email, phone, portals, and dashboards; route with urgency and close with documented proof.",
      },
      {
        title: "Equipment and vendor readiness",
        description:
          "Keep sites, operators, machines, subcontractors, certifications, and approvals ready before work begins.",
      },
      {
        title: "Client reporting and audit readiness",
        description:
          "Keep inspection records, SLA outcomes, certifications, and service evidence ready for QBRs, audits, and renewals.",
      },
    ],

    priorityWorkflows: [
      {
        title: "Service request intake and routing",
        description:
          "Classify requests, assign owner, urgency, and next action across channels.",
      },
      {
        title: "Equipment readiness and utilization",
        description:
          "Track mapping, training, availability, exceptions, and utilization.",
      },
      {
        title: "SLA and quality-inspection closure",
        description:
          "Connect request, work order, inspection photo, sign-off, client update, and completion evidence.",
      },
      {
        title: "Client QBR and audit packs",
        description:
          "Assemble SLA performance, certifications, COIs, inspection records, and proof of service.",
      },
    ],

    valueMetrics: [
      {
        metric: "Cycle time",
        baseline: "Current average per workflow",
        movement: "20–40% faster closure",
        impact: "Requests and SLAs close sooner",
      },
      {
        metric: "Manual follow-up",
        baseline: "Current touches per case",
        movement: "25–50% fewer touches",
        impact: "Less chasing across sites",
      },
      {
        metric: "Equipment utilization",
        baseline: "Current productive use vs planned",
        movement: "20–40% higher use",
        impact: "More value from assets",
      },
      {
        metric: "First-pass completeness",
        baseline: "Current complete-on-arrival rate",
        movement: "15–30 point improvement",
        impact: "Fewer missing fields and sign-offs",
      },
    ],

    cta: {
      statement:
        "Talk to us about an 8-week workflow sprint. Baseline today's handoffs, follow-up, and closure time — then see whether Orcaworks helps the same team close work faster.",
      url: "https://orcaworks.ai",
    },
  },

  footer: {
    website: "orcaworks.ai",
  },
} as const satisfies TwoPageVerticalBrief;
