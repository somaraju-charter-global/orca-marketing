import type { MarketingGuide } from "@/content/types";

export function createEmptyGuide(slug: string): MarketingGuide {
  return {
    slug,
    title: "Untitled guide",
    description: "New guide description",
    accentTheme: "healthcareMist",
    pages: [
      {
        type: "cover",
        title: "Guide Title",
        subtitle: "Add your subtitle",
        kicker: "Orcaworks",
        logoVariant: "white",
        image: "/images/supply-chain-speed.jpg",
        imageTreatment: "fade",
      },
    ],
  };
}
