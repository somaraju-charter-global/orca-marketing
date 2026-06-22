import { MarketingGuide } from "../types";

export const retailSupplyChainGuide: MarketingGuide = {
  slug: "retail-supply-chain-use-case-guide",
  title: "Retail Supply Chain Use-Case Guide",
  description:
    "A gated Orcaworks guide for retail supply-chain leaders on governing availability, lifecycle, supplier, inbound, and DC exception workflows.",
  pages: [
    {
      type: "cover",
      title: "Retail Supply Chain Use-Case Guide",
      subtitle: "Turn supply-chain exceptions into governed action",
      kicker: "Orcaworks",
      logoVariant: "white",
      image: "/images/supply-chain-speed.jpg",
      sections: [
        { page: "2", title: "The execution layer around supply-chain systems" },
        { page: "3", title: "Why core systems are not enough" },
        { page: "4", title: "Availability and demand readiness" },
        { page: "5", title: "How Orcaworks helps availability teams" },
        { page: "6", title: "Lifecycle, expiry, and waste control" },
        { page: "7", title: "How Orcaworks helps lifecycle teams" },
        { page: "8", title: "Supplier, inbound, and DC exception recovery" },
        { page: "9", title: "How Orcaworks helps recovery teams" },
        { page: "10", title: "Workflow transformation" },
        { page: "11", title: "Business impact to prove" },
        { page: "12", title: "Start with one workflow" },
      ],
    },
    {
      type: "darkEditorial",
      eyebrow: "Retail supply chain",
      headline: "The next bottleneck is not the system. It is the exception.",
      body:
        "Large retailers have already invested in ERP, replenishment, WMS, TMS, supplier portals, EDI, product data, and analytics. The daily delays often sit around those systems: finding evidence, checking completeness, routing decisions, handling exceptions, and making sure the system of record is updated. Orcaworks governs that execution layer so supply-chain teams can move recurring exceptions from scattered follow-up to traceable action.",
      image: "/images/supply-chain-speed.jpg",
      callout:
        "The opportunity is not to replace core systems. It is to govern the work that happens around them.",
      pageNumber: "2",
    },
    {
      type: "imageCallout",
      eyebrow: "Why core systems are not enough",
      headline: "Core systems show the signal. Teams still have to close the loop.",
      body:
        "A dashboard can show an out-of-stock item, a late inbound booking, a short-code product, or a rejected delivery. It rarely assembles the evidence packet, explains what is missing, routes the approval, captures the decision, prepares the supplier response, and records the update path. That is the execution gap Orcaworks is built to govern.",
      image: "/images/supply-chain-speed.jpg",
      callout:
        "A good first pilot turns one messy exception workflow into a repeatable decision path.",
      pageNumber: "3",
    },
    {
      type: "useCase",
      eyebrow: "Strategic pillar 01",
      number: "01",
      title: "Availability and demand readiness",
      problem:
        "Availability teams deal with recurring signals: missed supply, unexpected OOS, store-order shortfalls, MAPO decisions, future promo risk, and late promo changes. The hard part is not seeing the issue. It is deciding what action is justified before the window closes.",
      opportunity:
        "Orcaworks can create a governed path for availability exceptions: collect the evidence, identify likely cause, route decisions, assign owners, and keep a traceable record of what was done and why.",
      bullets: [
        "Daily availability exception triage",
        "Store-order vs supply reconciliation",
        "Unexpected or long-term OOS recovery",
        "MAPO recommendation and approval",
        "Promo risk scan and late-change feasibility",
      ],
      quote:
        "Coles reported $44.4bn group sales revenue and 23.3% eCommerce sales growth in FY25.",
      source: "Coles FY25 reporting; used as scale and availability context",
      pageNumber: "4",
    },
    {
      type: "useCaseDetail",
      eyebrow: "How Orcaworks helps",
      title: "Availability exception and promo readiness packets",
      sections: [
        {
          heading: "Example workflow",
          description:
            "Daily availability exception triage for one high-velocity category, with an optional late promo change workflow once the baseline is working.",
        },
        {
          heading: "Inputs",
          description:
            "DIFOT, store orders, supplied quantity, SOH, forecast, inbound status, supplier notes, promo calendar, affected stores, and time-to-intervene.",
        },
        {
          heading: "Governed execution",
          description:
            "Assemble the evidence packet, classify likely cause, identify missing data, prepare action options, route MAPO or promo decisions, and assign the owner.",
        },
        {
          heading: "Outputs and traceability",
          description:
            "Prioritised action list, approve/modify/reject decision, supplier or planner follow-up, system-ready notes, and a record of why the decision was made.",
        },
      ],
      detailText: "Pilot: one category, one state or DC, 60–90 days",
      detailColor: "orange",
      pageNumber: "5",
    },
    {
      type: "useCase",
      eyebrow: "Strategic pillar 02",
      number: "02",
      title: "Lifecycle, expiry, and waste control",
      problem:
        "Short-life stock, deleted lines, replacement products, MLOR exceptions, new-line launches, and packaging changes create decisions across supply chain, commercial, suppliers, DCs, and stores. Delay can leave stock locked, marked down too late, wasted, or unavailable.",
      opportunity:
        "Orcaworks can turn product lifecycle exceptions into governed decision workflows: identify exposed stock, collect the evidence, route the right approval, capture rationale, and prepare the downstream action path.",
      bullets: [
        "Short-code decision workflow",
        "Deleted-line rundown control",
        "Minimum life on receipt exception review",
        "New-line launch readiness",
        "Range or packaging transition control",
      ],
      quote:
        "Australia wastes around 7.6 million tonnes of food each year, costing more than $36.6bn annually.",
      source: "Australian Government food waste evidence; used as waste-pressure context",
      pageNumber: "6",
    },
    {
      type: "useCaseDetail",
      eyebrow: "How Orcaworks helps",
      title: "Short-code and deleted-line decision control",
      sections: [
        {
          heading: "Example workflow",
          description:
            "Short-code and deleted-line decision workflow for one fresh or chilled category where stock needs a fast, governed action path.",
        },
        {
          heading: "Inputs",
          description:
            "Product life, DC stock, store sell-through, forecast, code-life rules, current allocation, deleted-line date, supplier request, and replacement timing.",
        },
        {
          heading: "Governed execution",
          description:
            "Group exceptions by action path, apply playbook thresholds, assemble evidence, route commercial or quality approval, and capture the decision.",
        },
        {
          heading: "Outputs and traceability",
          description:
            "Push, hold, unlock, markdown, allocate, substitute, reject, or write-off instructions with owner, approval, rationale, and follow-up status.",
        },
      ],
      detailText: "Value: faster decisions before freshness windows close",
      detailColor: "orange",
      pageNumber: "7",
    },
    {
      type: "useCase",
      eyebrow: "Strategic pillar 03",
      number: "03",
      title: "Supplier, inbound, and DC exception recovery",
      problem:
        "Late appointments, rejected deliveries, supplier forecast queries, B2B mismatches, missing documents, and compliance evidence issues often arrive with partial information. Teams then chase suppliers, DCs, transport, planning, and commercial teams to decide the recovery path.",
      opportunity:
        "Orcaworks can structure supplier and inbound recovery: capture intake, assemble evidence, identify missing information, route decisions, prepare supplier responses, and maintain a traceable record across handoffs.",
      bullets: [
        "Late inbound appointment recovery",
        "Rejected delivery triage",
        "Supplier forecast or order query response",
        "B2B / EDI trading document mismatch",
        "Supplier evidence and compliance renewal",
      ],
      quote:
        "Coles’ Kemps Creek automated distribution centre is designed to process more than four million cartons per week at full capacity.",
      source: "Coles ADC release; used as DC scale and inbound discipline context",
      pageNumber: "8",
    },
    {
      type: "useCaseDetail",
      eyebrow: "How Orcaworks helps",
      title: "Rejected delivery and late appointment recovery",
      sections: [
        {
          heading: "Example workflow",
          description:
            "Rejected delivery and late appointment recovery for one DC and a selected supplier group over a 60–90 day pilot.",
        },
        {
          heading: "Inputs",
          description:
            "Booking data, PO, ASN, delivery record, rejection reason, photos or DC notes, supplier explanation, affected SKUs, stock cover, and available slots.",
        },
        {
          heading: "Governed execution",
          description:
            "Assemble the recovery packet, classify cause, request missing evidence, estimate service impact, suggest recovery options, and route supplier/DC/commercial approval.",
        },
        {
          heading: "Outputs and traceability",
          description:
            "Rebook, return, accept, escalate, or reject decision with supplier communication, owner assignment, action checklist, and final outcome record.",
        },
      ],
      detailText: "Value: fewer unresolved exceptions and clearer supplier accountability",
      detailColor: "orange",
      pageNumber: "9",
    },
    {
      type: "beforeAfter",
      title: "Workflow transformation",
      beforeTitle: "Before",
      afterTitle: "After",
      beforeItems: [
        "Exception signals spread across dashboards, email, portals, and spreadsheets",
        "Teams chase suppliers, DCs, planners, and commercial owners manually",
        "Evidence is incomplete or rebuilt for each decision",
        "Approvals happen in email with unclear ownership",
        "System updates lag behind operational decisions",
        "Audit trail is reconstructed after the fact",
      ],
      afterItems: [
        "Repeatable intake for the selected exception workflow",
        "Evidence packet assembled from available systems and documents",
        "Missing information and policy exceptions surfaced early",
        "Approvals routed to the right owner with rationale captured",
        "System-ready update notes prepared after decision",
        "Decision history retained for review, supplier follow-up, and audit",
      ],
      pageNumber: "10",
    },
    {
      type: "roi",
      title: "Business impact to prove",
      intro:
        "The first pilot should prove measurable movement in one recurring workflow before scaling. The targets below are placeholders until the retailer's baseline is measured.",
      metrics: [
        {
          label: "Exception cycle time",
          baseline: "Current baseline",
          target: "Placeholder: 30–50% faster",
          impact: "Shorter time from signal to action",
        },
        {
          label: "Manual follow-up",
          baseline: "Current touches/case",
          target: "Placeholder: 40–60% fewer",
          impact: "Less chasing across teams",
        },
        {
          label: "First-pass evidence completeness",
          baseline: "Current complete cases",
          target: "Placeholder: +20–30 pts",
          impact: "Fewer stalled decisions",
        },
        {
          label: "Approval delay",
          baseline: "Current approval time",
          target: "Placeholder: 30–50% faster",
          impact: "Clearer routing and escalation",
        },
        {
          label: "Aged unresolved exceptions",
          baseline: "Current aged queue",
          target: "Placeholder: 25–40% fewer",
          impact: "Better operational control",
        },
      ],
      pageNumber: "11",
    },
    {
      type: "closingCta",
      headline: "Start with one recurring exception workflow",
      body:
        "Pick a workflow where delays, missing evidence, approval chasing, and system updates are visible today. Orcaworks can run a focused workflow scan, define the baseline, and design a narrow pilot around one category, one DC, one state, or one supplier group.",
      cta: "Plan a workflow scan",
      website: "www.orcaworks.com",
      variant: "dark",
      pageNumber: "12",
    },
  ],
};
