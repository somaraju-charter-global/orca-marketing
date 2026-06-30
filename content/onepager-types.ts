export type TwoPageVerticalBrief = {
  layout: "two-page-vertical-brief";
  slug: string;

  vertical: string;
  audience: string;

  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
  };

  page1: {
    businessCostProofPoint: {
      label: string;
      metric?: string;
      statement: string;
      source?: string;
    };

    challenge: {
      title: string;
      body: string;
    };

    solutionVisual: {
      imagePath?: string;
    };

    orcaworksValue: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };

    bottomCallout: {
      title: string;
      statement: string;
    };
  };

  page2: {
    title: string;
    subtitle: string;

    strategicBusinessPriorities: {
      title: string;
      description: string;
    }[];

    priorityWorkflows: {
      title: string;
      description: string;
    }[];

    valueMetrics: {
      metric: string;
      baseline: string;
      movement: string;
      impact: string;
    }[];

    cta: {
      statement: string;
      url?: string;
    };
  };

  footer: {
    website: string;
  };
};

export type OnePager = TwoPageVerticalBrief;
