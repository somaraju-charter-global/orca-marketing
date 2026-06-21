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

    selectionCriteria: {
      title: string;
      description: string;
    }[];

    valueMeasures: {
      title: string;
      description: string;
    }[];

    exampleStartingPoints: {
      title: string;
      scope: string;
    }[];

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
