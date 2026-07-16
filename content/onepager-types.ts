// Colors usable as a two-pager theme. Most of these are used directly as
// the foreground accent (border stripes, numbers, links, table highlight).
// "healthcareMist" is the exception: the pale mist color (#edf8f9) is only
// used as a callout *background* here — its foreground role is played by
// a paired darker teal (--orca-healthcare-mist-ink) so text/borders stay
// readable. See TwoPageVerticalBrief.tsx for how the two are split.
export type TwoPagerAccentTheme = "orange" | "blue" | "black" | "green" | "healthcareMist";

export type TwoPageVerticalBrief = {
  layout: "two-page-vertical-brief";
  slug: string;

  // Set once to recolor every accent stripe, number, link, and table
  // highlight in this brief. Defaults to "healthcareMist" (the Orcaworks look).
  accentTheme?: TwoPagerAccentTheme;

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
