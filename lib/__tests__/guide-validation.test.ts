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

});

describe("validateMarketingGuide — useCase solution pages", () => {
  const caseInAction = {
    type: "caseInAction",
    headline: "Know what's happening. Decide what happens next.",
    explanation: "Orcaworks brings the shipment evidence together.",
    valuePoints: [
      { title: "Clearer insight", description: "Everything in one place." },
      { title: "Planner in control", description: "Approves the next action." },
    ],
    visual: {
      signals: [
        { name: "TMS", detail: "ETA 18:00" },
        { name: "Carrier", detail: "Delayed 2h" },
      ],
      steps: [
        { label: "Evidence reconciled" },
        { label: "Delivery commitment at risk", alert: true },
        { label: "Recovery prepared" },
      ],
      action: {
        title: "Recovery options",
        items: [{ label: "Expedite" }, { label: "Reschedule" }, { label: "Hold" }],
      },
    },
  };

  it("accepts a well-formed caseInAction page", () => {
    expect(validateMarketingGuide(guide([caseInAction])).success).toBe(true);
  });

  it("rejects caseInAction over its layout limits", () => {
    const tooManySignals = {
      ...caseInAction,
      visual: {
        ...caseInAction.visual,
        signals: Array.from({ length: 5 }, (_, i) => ({ name: `S${i}`, detail: "x" })),
      },
    };
    expect(validateMarketingGuide(guide([tooManySignals])).success).toBe(false);
  });

  it("accepts a well-formed operationalTransformation page", () => {
    const page = {
      type: "operationalTransformation",
      headline: "From chasing updates to trusted commitments.",
      currentProcess: { steps: [{ label: "a" }, { label: "b" }, { label: "c" }] },
      futureProcess: { steps: [{ label: "a" }, { label: "b" }, { label: "c" }] },
      shift: { statement: "The buyer approves prepared changes." },
      value: { outcomes: ["Current promise dates"] },
    };
    expect(validateMarketingGuide(guide([page])).success).toBe(true);
  });

  it("rejects operationalTransformation with fewer than three steps", () => {
    const page = {
      type: "operationalTransformation",
      headline: "x",
      currentProcess: { steps: [{ label: "a" }] },
      futureProcess: { steps: [{ label: "a" }] },
      shift: { statement: "s" },
      value: { outcomes: ["o"] },
    };
    expect(validateMarketingGuide(guide([page])).success).toBe(false);
  });
});
