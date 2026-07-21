import type { OnePager } from "@/content/onepager-types";

export function createEmptyTwoPager(slug: string): OnePager {
  return {
    layout: "two-page-vertical-brief",
    slug,
    accentTheme: "healthcareMist",
    vertical: "Your vertical",
    audience: "Your target audience",
    hero: {
      eyebrow: "ORCAWORKS FOR YOUR TEAM",
      headline: "Your headline",
      subheadline: "Your subheadline",
    },
    page1: {
      businessCostProofPoint: {
        label: "The business cost",
        metric: "",
        statement: "Add your business cost proof point.",
        source: "",
      },
      challenge: {
        title: "The challenge",
        body: "Add your challenge description.",
      },
      solutionVisual: {
        imagePath: "/images/orcaworks-stack-v3.jpg",
      },
      orcaworksValue: {
        title: "Orcaworks value",
        items: [
          {
            title: "Benefit",
            description: "Add a description of the value.",
          },
        ],
      },
      bottomCallout: {
        title: "The opportunity",
        statement: "Add your opportunity statement.",
      },
    },
    page2: {
      title: "Where Orcaworks creates value",
      subtitle: "Add your subtitle.",
      strategicBusinessPriorities: [
        {
          title: "Priority",
          description: "Add a strategic priority.",
        },
      ],
      priorityWorkflows: [
        {
          title: "Workflow",
          description: "Add a priority workflow.",
        },
      ],
      valueMetrics: [
        {
          metric: "Metric",
          baseline: "Current baseline",
          movement: "Target movement",
          impact: "Executive impact",
        },
      ],
      cta: {
        statement: "Add your call to action.",
        url: "https://orcaworks.ai",
      },
    },
    footer: {
      website: "orcaworks.ai",
    },
  };
}
