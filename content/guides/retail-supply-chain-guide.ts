import { MarketingGuide } from "../types";

export const retailSupplyChainGuide: MarketingGuide = {
  slug: "supply-chain-operations-guide",
  title: "Close the Work Around the System",
  description:
    "A practical guide to governed execution for supplier, service, delivery, compliance, and invoice exceptions.",
  pages: [
    {
      type: "cover",
      title: "Close the Work Around the System",
      subtitle: "A practical guide to governed execution for supplier, service, delivery, compliance, and invoice exceptions.",
      kicker: "Supply chain operations",
      logoVariant: "white",
      image: "/images/supply-chain-speed.jpg",
      sections: [
        { page: "1", title: "Close the execution gap" },
        { page: "2", title: "Core systems are not enough" },
        { page: "3", title: "Make suppliers ready faster" },
        { page: "4", title: "How Orcaworks helps supplier readiness" },
        { page: "5", title: "Keep supplier evidence audit-ready" },
        { page: "6", title: "How Orcaworks helps supplier evidence" },
        { page: "7", title: "Recover service exceptions sooner" },
        { page: "8", title: "How Orcaworks helps service recovery" },
        { page: "9", title: "Close inbound delivery exceptions" },
        { page: "10", title: "How Orcaworks helps inbound recovery" },
        { page: "11", title: "Resolve invoice exceptions faster" },
        { page: "12", title: "How Orcaworks helps invoice exceptions" },
        { page: "13", title: "What to measure first" },
        { page: "14", title: "Start with one workflow" },
      ],
    },
    {
      type: "darkEditorial",
      eyebrow: "Supply Chain Operations",
      headline: "Close the Execution Gap",
      body:
        "Supply-chain teams do not need another dashboard that only shows what is wrong. They need a governed way to collect the evidence, chase the missing pieces, route the decision, update the record, and prove what happened. Orcaworks helps teams start with one recurring workflow and improve how work gets closed around existing systems.",
      image: "/images/supply-chain-speed.jpg",
      callout:
        "The issue is rarely visibility alone. The real delay is turning the alert into owned, evidenced, approved, and recorded action.",
      pageNumber: "1",
    },
    {
      type: "imageCallout",
      eyebrow: "The gap",
      headline: "Core Systems Are Not Enough",
      body:
        "ERP, planning, procurement, WMS, TMS, AP, BI, and supplier portals hold important records. They are not designed to own every cross-functional exception from start to finish. The gap appears when work depends on missing documents, supplier responses, human approvals, judgement, and updates across several systems. That is where cycle time, rework, and audit risk accumulate.",
      image: "/images/supply-chain-speed.jpg",
      callout:
        "Core system alert → Evidence gathered → Owner prompted → Decision recorded → System updated",
      pageNumber: "2",
    },
    {
      type: "useCase",
      eyebrow: "Strategic pillar 01",
      number: "01",
      title: "Make suppliers ready faster",
      problem:
        "A supplier may be selected, contracted, or approved but still not ready to transact. Readiness depends on tax forms, bank details, certificates, contracts, risk checks, EDI setup, item data, approvals, and vendor-master updates that often sit across teams and systems.",
      opportunity:
        "Turn onboarding into a governed readiness workflow: one case per supplier, clear evidence requirements, owner-routed approvals, visible blockers, and a traceable record from request to activation.",
      bullets: [
        "New supplier onboarding",
        "Activation blockers",
        "Certificate renewal",
        "Supplier master changes",
      ],
      rightContent: {
        type: "quote",
        quote: "The supplier may be selected quickly, but the business cannot transact until evidence, approvals, and records are complete.",
        source: "Caption",
      },
      pageNumber: "3",
    },
    {
      type: "useCaseDetail",
      eyebrow: "How Orcaworks helps",
      title: "How Orcaworks helps supplier readiness",
      sections: [
        {
          heading: "Supplier onboarding",
          description:
            "Orcaworks connects supplier records, required documents, approval rules, and readiness status so procurement, finance, compliance, and master data can close missing steps faster.",
        },
        {
          heading: "Evidence renewal",
          description:
            "Orcaworks tracks expiring documents, prompts suppliers or internal owners, checks completeness, and keeps the renewal record ready for review.",
        },
        {
          heading: "Master-data changes",
          description:
            "Orcaworks governs supplier change requests, routes evidence to the right approver, and prepares the update pack for the system of record.",
        },
      ],
      sectionColor: "orange",
      rightContent: {
        type: "detailedText",
        text: "Start with one supplier cohort, one checklist, and one approval path. Orcaworks creates a readiness case for each supplier, connects the required evidence, tracks missing items, routes owner decisions, and prompts users where they already work. The pilot proves whether supplier readiness can move faster with less chasing before expanding across categories or regions.",
        color: "orange",
      },
      pageNumber: "4",
    },
    {
      type: "useCase",
      eyebrow: "Strategic pillar 02",
      number: "02",
      title: "Keep supplier evidence audit-ready",
      problem:
        "Supplier compliance is no longer a once-a-year document exercise. Teams must collect, refresh, review, and prove evidence across supplier cohorts, risk tiers, categories, geographies, customer requirements, and regulatory obligations.",
      opportunity:
        "Run supplier evidence as a governed workflow: prioritise by risk, request the right documents, check completeness, escalate exceptions, and keep the review trail ready.",
      bullets: [
        "Due-diligence refresh",
        "Modern slavery evidence",
        "Corrective action closure",
        "Audit evidence packs",
      ],
      rightContent: {
        type: "workflow",
        steps: [
          { number: "1", title: "Identify supplier cohort", description: "Risk-based prioritization" },
          { number: "2", title: "Request evidence", description: "Automated document requests" },
          { number: "3", title: "Track responses", description: "Monitor completeness" },
          { number: "4", title: "Route exceptions", description: "Escalate to right owner" },
          { number: "5", title: "Audit pack ready", description: "Traceable evidence trail" },
        ],
      },
      pageNumber: "5",
    },
    {
      type: "useCaseDetail",
      eyebrow: "How Orcaworks helps",
      title: "How Orcaworks helps supplier evidence",
      sections: [
        {
          heading: "Due-diligence refresh",
          description:
            "Orcaworks creates risk-based evidence cases, requests the right documents, tracks responses, and routes exceptions to compliance, legal, quality, or procurement.",
        },
        {
          heading: "Certificate renewal",
          description:
            "Orcaworks monitors expiry, prompts suppliers before evidence becomes overdue, checks returned files, and updates the supplier evidence record.",
        },
        {
          heading: "Corrective actions",
          description:
            "Orcaworks tracks owner, due date, requested evidence, review status, approval, and closure for supplier audit or quality actions.",
        },
      ],
      sectionColor: "orange",
      rightContent: {
        type: "image",
        src: "/images/supply-chain-speed.jpg",
        alt: "Supply chain operations",
        objectFit: "cover",
      },
      pageNumber: "6",
    },
    {
      type: "useCase",
      eyebrow: "Strategic pillar 03",
      number: "03",
      title: "Recover service exceptions sooner",
      problem:
        "Supply-chain dashboards may show stockouts, OTIF failures, and service risks, but recovery still depends on people gathering context from inventory, orders, forecasts, suppliers, transport, DC receipts, and commercial priorities.",
      opportunity:
        "Convert repeated service exceptions into governed recovery cases with root-cause context, owner assignment, decision routing, action tracking, and recorded closure.",
      bullets: [
        "Stockout triage",
        "OTIF exceptions",
        "Allocation approvals",
        "Service-risk packs",
      ],
      rightContent: {
        type: "quote",
        quote: "McKinsey reported average disruption response still took around two weeks.",
        source: "McKinsey",
      },
      pageNumber: "7",
    },
    {
      type: "useCaseDetail",
      eyebrow: "How Orcaworks helps",
      title: "How Orcaworks helps service recovery",
      sections: [
        {
          heading: "Stockout triage",
          description:
            "Orcaworks connects inventory, forecast, PO, ASN, supplier, transport, and receipt context so planners can move from alert to assigned recovery action.",
        },
        {
          heading: "OTIF exceptions",
          description:
            "Orcaworks creates an exception case, gathers delivery evidence, routes cause attribution, and prompts the right owner to close corrective action.",
        },
        {
          heading: "Allocation decisions",
          description:
            "Orcaworks prepares decision context, routes approval to the right user, captures the decision, and keeps the customer-impact trail visible.",
        },
      ],
      sectionColor: "blue",
      rightContent: {
        type: "workflow",
        steps: [
          { number: "1", title: "Alert triggered" },
          { number: "2", title: "Context gathered" },
          { number: "3", title: "Owner assigned" },
          { number: "4", title: "Decision routed" },
          { number: "5", title: "Recovery tracked" },
        ],
      },
      pageNumber: "8",
    },
    {
      type: "useCase",
      eyebrow: "Strategic pillar 04",
      number: "04",
      title: "Close inbound delivery exceptions",
      problem:
        "A late booking, rejected load, ASN mismatch, damaged delivery, or appointment change can involve suppliers, carriers, DC teams, quality, procurement, AP, and finance. The system may record the event, but not the recovery workflow.",
      opportunity:
        "Turn inbound exceptions into controlled recovery cases that gather evidence, clarify ownership, route decisions, prepare claims or reschedules, and update the right records.",
      bullets: [
        "Late booking exceptions",
        "Rejected delivery recovery",
        "ASN mismatch review",
        "Claim evidence packs",
      ],
      rightContent: {
        type: "image",
        src: "/images/supply-chain-speed.jpg",
        alt: "Inbound delivery operations",
        objectFit: "cover",
      },
      pageNumber: "9",
    },
    {
      type: "useCaseDetail",
      eyebrow: "How Orcaworks helps",
      title: "How Orcaworks helps inbound recovery",
      sections: [
        {
          heading: "Rejected deliveries",
          description:
            "Orcaworks assembles PO, ASN, receipt, rejection reason, photos, and quality evidence, then routes accept, reject, claim, quarantine, or redelivery decisions.",
        },
        {
          heading: "Late bookings",
          description:
            "Orcaworks checks PO priority, DC capacity, service impact, stock risk, and rules before routing accept, reject, reschedule, or escalate decisions.",
        },
        {
          heading: "ASN mismatches",
          description:
            "Orcaworks compares PO, ASN, receipt, and supplier shipment evidence, then routes the correction, dispute, claim, or inventory update.",
        },
      ],
      sectionColor: "orange",
      rightContent: {
        type: "detailedText",
        text: "Start with one DC and one recurring exception reason. Orcaworks creates a case when the delivery issue appears, gathers the PO, ASN, receipt note, photos, and supplier or carrier response, then routes the decision to the right owner. The pilot measures time to next action, evidence completeness, manual touches, and closure ageing.",
        color: "orange",
      },
      pageNumber: "10",
    },
    {
      type: "useCase",
      eyebrow: "Strategic pillar 05",
      number: "05",
      title: "Resolve invoice exceptions faster",
      problem:
        "Invoice exceptions are rarely just an invoice problem. Resolution often requires PO, receipt, delivery proof, contract price, supplier confirmation, buyer approval, warehouse input, and ERP or AP updates.",
      opportunity:
        "Turn invoice and receipt exceptions into governed evidence cases so AP, procurement, receiving, finance, and suppliers can reach a decision faster.",
      bullets: [
        "Invoice match exceptions",
        "Missing receipt follow-up",
        "GR/IR reconciliation",
        "Supplier disputes",
      ],
      rightContent: {
        type: "quote",
        quote: "Invoice capture is not enough when the exception still depends on receipt evidence, buyer input, supplier response, or approval.",
        source: "Caption",
      },
      pageNumber: "11",
    },
    {
      type: "useCaseDetail",
      eyebrow: "How Orcaworks helps",
      title: "How Orcaworks helps invoice exceptions",
      sections: [
        {
          heading: "Invoice match",
          description:
            "Orcaworks connects invoice, PO, receipt, contract, supplier, and delivery evidence so AP can decide whether to pay, hold, dispute, or correct.",
        },
        {
          heading: "Missing receipts",
          description:
            "Orcaworks identifies the right receiver or requester, prompts for confirmation, tracks reminders, and updates the AP exception record.",
        },
        {
          heading: "Supplier disputes",
          description:
            "Orcaworks assembles the dispute context, captures supplier responses, routes approvals, and keeps the decision trail audit-ready.",
        },
      ],
      sectionColor: "ink",
      rightContent: {
        type: "detailedText",
        text: "Pilot target: 30–60% faster resolution for defined invoice exception types where evidence requirements are standardised.",
        color: "ink",
      },
      pageNumber: "12",
    },
    {
      type: "roi",
      title: "What to measure first",
      intro:
        "Governed execution should be measured at the workflow level. Before scaling, baseline one recurring exception and compare how long it takes, how many touches it requires, how complete the evidence is, and how cleanly the outcome is recorded.",
      metrics: [
        {
          label: "Supplier readiness",
          baseline: "Activation cycle time",
          target: "20–40% faster",
          impact: "Defined workflow only",
        },
        {
          label: "Evidence renewal",
          baseline: "Overdue evidence rate",
          target: "15–35% fewer",
          impact: "Defined cohort",
        },
        {
          label: "Service triage",
          baseline: "Alert-to-next-action time",
          target: "20–40% faster",
          impact: "Defined exception class",
        },
        {
          label: "Inbound recovery",
          baseline: "Exception ageing",
          target: "20–40% lower",
          impact: "Defined DC and reason",
        },
        {
          label: "Invoice exceptions",
          baseline: "Resolution cycle time",
          target: "30–60% faster",
          impact: "Standardised evidence",
        },
      ],
      pageNumber: "13",
    },
    {
      type: "closingCta",
      headline: "Start with one workflow",
      body:
        "Choose one recurring exception where work crosses documents, approvals, follow-up, and system updates. Run a narrow governed-execution pilot, measure the baseline, and decide whether to expand based on evidence. Pick one exception → Map evidence and owners → Run governed workflow → Measure before/after → Scale what works. Find the workflow where your team is doing the most chasing.",
      cta: "Plan a 90-day pilot",
      website: "www.orcaworks.com",
      variant: "dark",
      pageNumber: "14",
    },
  ],
};
