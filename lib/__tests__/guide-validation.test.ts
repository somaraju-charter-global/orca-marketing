import { describe, it, expect } from "vitest";
import { validateMarketingGuide } from "../guide-validation";

const basePage = {
  type: "useCase",
  title: "Shipment Exception Resolution",
  problem: "A missed pickup lands on a coordinator.",
  opportunity: "The case closes without the check calls.",
};

const guide = (pages: unknown[]) => ({
  slug: "test-guide",
  title: "Test Guide",
  description: "Test",
  pages,
});

describe("validateMarketingGuide — useCase rightContent", () => {
  it("accepts the three supported treatments: quote, stat and image", () => {
    for (const rightContent of [
      { type: "quote", quote: "We lose control of the documents.", source: "Coordinator" },
      { type: "stat", value: "90%", label: "Straight-through invoices", source: "Canon USA" },
      { type: "image", src: "/images/guides/logistics-port-truck.jpg", alt: "Port" },
    ]) {
      const result = validateMarketingGuide(guide([{ ...basePage, rightContent }]));
      expect(result.success, JSON.stringify(rightContent)).toBe(true);
    }
  });

  it("rejects workflow, highlightText and detailedText on useCase pages", () => {
    for (const rightContent of [
      { type: "workflow", steps: [{ number: "1", title: "Step" }] },
      { type: "highlightText", text: "A statement" },
      { type: "detailedText", text: "Detail" },
    ]) {
      const result = validateMarketingGuide(guide([{ ...basePage, rightContent }]));
      expect(result.success, JSON.stringify(rightContent)).toBe(false);
    }
  });

  it("still allows workflow on useCaseDetail pages", () => {
    const result = validateMarketingGuide(
      guide([
        {
          type: "useCaseDetail",
          title: "In detail",
          sections: [{ heading: "H", description: "D" }],
          rightContent: { type: "workflow", steps: [{ number: "1", title: "Step" }] },
        },
      ])
    );
    expect(result.success).toBe(true);
  });
});
