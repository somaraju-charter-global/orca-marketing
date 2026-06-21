import { MarketingGuide } from "../types";

export const retailSupplyChainGuide: MarketingGuide = {
  slug: "retail-supply-chain-guide",
  title: "Top 5 Digital Co-Worker Use Cases for Retail Supply Chain Teams",
  description: "How to automate repeated planner workflows without replacing supply-chain experts",
  pages: [
    {
      type: "cover",
      title: "Top 5 Digital Co-Worker Use Cases for Retail Supply Chain Teams",
      subtitle: "How to automate repeated planner workflows without replacing supply-chain experts",
      kicker: "Orcaworks",
      logoVariant: "white",
      image: "/images/supply-chain-speed.jpg",
      sections: [
        { page: "2", title: "Introduction" },
        { page: "3", title: "Contents" },
        { page: "4", title: "Daily Availability and Replenishment Review" },
        { page: "5", title: "Short-Life Stock and Clearance Control" },
        { page: "6", title: "Promotion and Event Readiness" },
        { page: "7", title: "New Product and Range-Change Readiness" },
        { page: "8", title: "Planner Inbox and Query Triage" },
        { page: "9", title: "Before / After" },
        { page: "10", title: "Business Impact" },
        { page: "11", title: "Find One Repeated Workflow Worth Automating" },
      ],
    },
    {
      type: "darkEditorial",
      eyebrow: "Introduction",
      headline: "Retail supply-chain teams are not short of systems. They are short of time.",
      body: "Many daily workflows still depend on planners gathering data, running checks, chasing inputs, preparing summaries, and routing decisions. Core principle: Digital co-workers should automate preparation, not judgement.",
      image: "/images/supply-chain-speed.jpg",
      callout: "47% of organisations report arduous manual tasks as a barrier to planning agility.",
      pageNumber: "2",
    },
    {
      type: "contents",
      title: "Contents",
      items: [
        { page: "4", title: "Daily availability and replenishment review", description: "Automate daily service risk and shortfall analysis" },
        { page: "5", title: "Short-life stock and clearance control", description: "Reduce waste through earlier stock movement" },
        { page: "6", title: "Promotion and event readiness", description: "Prevent late surprises with readiness checklists" },
        { page: "7", title: "New product and range-change readiness", description: "Fewer launch delays and setup misses" },
        { page: "8", title: "Planner inbox and query triage", description: "Faster supplier responses and better focus" },
        { page: "9", title: "Before / After", description: "Workflow transformation comparison" },
        { page: "10", title: "Business Impact", description: "ROI and value metrics" },
        { page: "11", title: "Find One Repeated Workflow", description: "How to get started" },
      ],
    },
    {
      type: "useCaseDetail",
      eyebrow: "Use Case 01",
      title: "Daily Availability and Replenishment Review",
      sections: [
        {
          heading: "Why it matters",
          description: "Daily service risk and shortfall reviews are repeated, data-heavy work where the final decision still belongs to the planner.",
        },
        {
          heading: "Digital co-worker: Daily availability review assistant",
          description: "Pulls daily reports, flags items needing attention, explains why, prepares recovery context, drafts follow-ups, and records actions.",
        },
        {
          heading: "Human still owns",
          description: "Recovery decision. Supplier escalation. Allocation or override. Commercial judgement.",
        },
        {
          heading: "Business impact",
          description: "Planner capacity released. Faster action lists. Fewer missed service risks. Better daily rhythm.",
        },
      ],
      detailText: "94% average service level with major retailers",
      detailColor: "orange",
      pageNumber: "4",
    },
    {
      type: "useCaseDetail",
      eyebrow: "Use Case 02",
      title: "Short-Life Stock and Clearance Control",
      sections: [
        {
          heading: "Why it matters",
          description: "Short-life stock requires repeated daily decisions across scattered data sources: stock reports, expiry rules, DC status, and commercial decisions.",
        },
        {
          heading: "Digital co-worker: Short-life stock action assistant",
          description: "Finds products approaching thresholds, pulls stock data, prepares action options, routes to owners, drafts follow-ups, and logs outcomes.",
        },
        {
          heading: "Human still owns",
          description: "Food safety / quality decision. Markdown or commercial action. Clearance strategy. Supplier claim or escalation.",
        },
        {
          heading: "Business impact",
          description: "Reduced waste exposure. Earlier stock movement. Less locked stock. Cleaner clearance execution.",
        },
      ],
      detailText: "527 kilotonnes of retail food waste annually",
      detailColor: "orange",
      pageNumber: "5",
    },
    {
      type: "useCaseDetail",
      eyebrow: "Use Case 03",
      title: "Promotion and Event Readiness",
      sections: [
        {
          heading: "Why it matters",
          description: "Promotions fail when routine readiness checks are missed: forecast, supplier confirmation, inbound coverage, constraints, and cut-off windows.",
        },
        {
          heading: "Digital co-worker: Promotion readiness checklist assistant",
          description: "Reads calendar and checklist, checks all readiness items, flags gaps, produces RAG view, chases owners, and traces decisions.",
        },
        {
          heading: "Human still owns",
          description: "Promo approval. Forecast changes. Supplier negotiation. Substitution or allocation decisions.",
        },
        {
          heading: "Business impact",
          description: "Fewer late surprises. Better campaign readiness. Better availability during high-demand periods. More traceable decisions.",
        },
      ],
      detailText: "Promotional planning is a top initiative with major retailers",
      detailColor: "orange",
      pageNumber: "6",
    },
    {
      type: "useCaseDetail",
      eyebrow: "Use Case 04",
      title: "New Product and Range-Change Readiness",
      sections: [
        {
          heading: "Why it matters",
          description: "Launches and range changes involve repeated dependency checks: setup, supplier readiness, DC readiness, first orders, and transition timing.",
        },
        {
          heading: "Digital co-worker: Launch readiness assistant",
          description: "Runs launch checklist, checks setup and readiness, tracks transitions, flags blocked steps, produces go/no-go summary, and records decisions.",
        },
        {
          heading: "Human still owns",
          description: "Launch approval. Commercial decisions. Range timing. Exceptions and overrides.",
        },
        {
          heading: "Business impact",
          description: "Fewer launch delays. Fewer setup misses. Less stock exit pressure. Better first-week availability.",
        },
      ],
      detailText: "Supply-chain transformation starts by shifting away from Excel",
      detailColor: "orange",
      pageNumber: "7",
    },
    {
      type: "useCaseDetail",
      eyebrow: "Use Case 05",
      title: "Planner Inbox and Query Triage",
      sections: [
        {
          heading: "Why it matters",
          description: "Planners receive repeated supplier and internal queries that require gathering context and drafting responses rather than complex decisions.",
        },
        {
          heading: "Digital co-worker: Planner query triage assistant",
          description: "Reads queries, identifies relevant data, pulls supporting information, classifies materiality, drafts responses, and routes uncertain cases.",
        },
        {
          heading: "Human still owns",
          description: "Final response. Escalation. Supplier negotiation. Any forecast/order change.",
        },
        {
          heading: "Business impact",
          description: "Reduced inbox load. Faster supplier responses. Fewer low-value escalations. Better planner focus.",
        },
      ],
      detailText: "Only 17% of supply chains can respond to disruptions within 24 hours",
      detailColor: "orange",
      pageNumber: "8",
    },
    {
      type: "beforeAfter",
      title: "Workflow Transformation",
      beforeTitle: "Before",
      afterTitle: "After",
      beforeItems: [
        "Planner downloads reports",
        "Runs Excel or macro",
        "Checks failed rows",
        "Opens BI / ERP / planning tool",
        "Copies outputs",
        "Emails action list",
        "Repeats tomorrow",
      ],
      afterItems: [
        "Orcaworks collects inputs",
        "Runs checklist",
        "Validates data",
        "Prepares action list",
        "Drafts follow-up",
        "Routes human review",
        "Logs outcome",
      ],
      pageNumber: "9",
    },
    {
      type: "roi",
      title: "Business Impact",
      intro: "Use a practical baseline, not inflated case-study claims. Measure what matters for your specific workflow.",
      metrics: [
        { label: "Runs per year", baseline: "250", target: "250", impact: "Same workflow" },
        { label: "Time per run", baseline: "2 hours", target: "30 minutes", impact: "75% reduction" },
        { label: "People involved", baseline: "3", target: "3", impact: "Same team" },
        { label: "Manual emails", baseline: "15 per run", target: "2 per run", impact: "87% reduction" },
        { label: "Time to action list", baseline: "4 hours", target: "1 hour", impact: "75% faster" },
        { label: "Missed checks", baseline: "3 per week", target: "0 per week", impact: "100% caught" },
      ],
      pageNumber: "10",
    },
    {
      type: "closingCta",
      headline: "Find one repeated workflow worth automating",
      body: "Bring us one workflow your planners run every day or every week. We will map the inputs, checks, handoffs, human decisions, and value baseline for a 90-day digital co-worker pilot.",
      cta: "Plan a Workflow Scan",
      website: "www.orcaworks.com",
      variant: "dark",
      pageNumber: "11",
    },
  ],
};
