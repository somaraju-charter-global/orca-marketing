export type TwoPageVerticalBrief = {
  layout: "two-page-vertical-brief";
  slug: string;

  vertical: string;
  audience: string;

  eyebrow: string;
  headline: string;
  subheadline: string;

  executivePov: string;
  positioningStatement: string;

  strategicPillars: {
    title: string;
    description: string;
  }[];

  useCases: {
    title: string;
    description: string;
  }[];

  bottomInsight: string;

  page2: {
    title: string;
    subtitle: string;
    executiveBlurb: string;

    valueMetrics: {
      label: string;
      change: string;
      impact: string;
    }[];

    pilotSteps: {
      number: string;
      title: string;
      description: string;
    }[];

    goodFirstPilots: string[];

    cta: {
      title: string;
      body: string;
      buttonLabel: string;
      url?: string;
    };
  };

  footer?: {
    website?: string;
    version?: string;
  };
};

export type OnePager = TwoPageVerticalBrief;
