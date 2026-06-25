# Update the Orcaworks two-pager template

## Goal

Update the existing two-page vertical brief template from a “problem + pilot kickoff” structure into an executive conversation-starter structure.

The new 2-pager must explain:

1. why the vertical-specific execution problem matters,
2. what Orcaworks is,
3. why Orcaworks is a good fit,
4. where value shows up,
5. what metrics executives can use to assess uplift.

Do not make the document feel like a pilot proposal. It should create interest and make the buyer want a conversation.

---

## 1. Update the data model

Replace the old content structure based on:

* `strategicPillars`
* `useCases`
* `bottomInsight`
* `page2.executiveBlurb`
* `page2.pilotSteps`
* `page2.goodFirstPilots`

with a clearer executive-brief structure.

Use this new conceptual schema:

```ts
type TwoPageVerticalBrief = {
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
      title: string;
      leftLabel: string;
      leftItems: string[];
      middleLabel: string;
      middleItems: string[];
      rightLabel: string;
      rightItems: string[];
    };

    whyOrcaworksIsDifferent: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };

    customerValue: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
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
```

Keep backward compatibility only if needed temporarily, but the new template renderer should use the new structure.

---

## 2. Page 1 layout

Page 1 should answer: “Why does this matter, and what is Orcaworks?”

Use this layout:

### Top hero section

Full-width dark hero area.

Include:

* eyebrow
* headline
* subheadline

The hero should feel like the current top section, but it should not consume too much of the page. Keep enough room below for the two-column content.

### Below hero: two-column layout

Use a left/right grid.

#### Left column: customer problem

Include two stacked sections:

1. **Business cost / opportunity callout**
   * Use a visually distinct box.
   * Support either a big number/stat or a short quote.
   * Include source text if provided.
   * This should be the executive proof point.
2. **The challenge**
   * Use the customer problem statement.
   * This should explain that the issue is not usually the core system; the drag sits around evidence, ownership, follow-up, approvals, exception closure, and system updates.
   * Keep it concise.

#### Right column: Orcaworks answer

Include three stacked sections:

1. **Solution visual**
   * This is not a technical architecture diagram.
   * It should be a simple executive visual:
     * existing systems / documents / messages / portals
     * Orcaworks governed execution layer
     * faster closure / fewer manual touches / cleaner evidence / better control
   * The middle Orcaworks box should show what Orcaworks does:
     * connects context
     * routes work
     * governs decisions
     * records evidence
     * brings actions to users where they already work
2. **Why Orcaworks is different**
   * 2–3 compact points.
   * Emphasise that Orcaworks works around existing systems and creates governed execution, not loose automation.
3. **Value to customers**
   * 3–5 compact value points.
   * Include:
     * capacity / headcount leverage
     * lower change-management burden
     * governed execution and audit trail
     * cyber/control confidence
     * future-proofing as systems, workflows, teams, and AI models change

If the right column becomes crowded, combine “Why Orcaworks is different” and “Value to customers” into one compact card group.

---

## 3. Page 2 layout

Page 2 should answer: “Where does Orcaworks create measurable value?”

Do not use a pilot-kickoff structure.

Remove:

* “strong first pilot”
* “baseline the workflow / govern the actions / prove the lift”
* “good first pilots”
* “plan a workflow pilot”

Use this structure instead:

### Page 2 header

Include:

* page title
* short subtitle

The title should be about value showing up in real workflows, not about starting a pilot.

### Main upper section: two-column layout

#### Left column: Strategic business priorities

Rename the old “Strategic pillars” section to:

**Strategic business priorities**

Show 4–5 items.

Each item should be:

* outcome-led
* executive-friendly
* vertical-specific
* not feature-led

#### Right column: Priority workflows to target

Show 4–5 concrete workflows.

Each workflow should be recognisable to the buyer and should map naturally to one of the strategic business priorities.

Use numbered rows or compact workflow cards.

---

## 4. Page 2 lower section: value metrics table

Replace the old metric cards and pilot steps with a full-width table.

Use the structure:

| Metric | Baseline | Movement | Executive impact |

The table should show what an executive can measure, not hard promises.

Example metric types:

* cycle time
* manual touches / coordination load
* first-pass completeness
* aged exceptions
* evidence readiness
* work closed per FTE
* approval delay
* exception throughput

The `movement` field can contain either:

* an example target range,
* a directional improvement,
* or “customer baseline → improved target” if real data is available.

Do not make unsupported claims. If no external evidence or customer baseline exists, frame the metric as “what to baseline and improve.”

---

## 5. Bottom CTA / timeline strip

Use one subtle bottom statement.

Do not use a large pilot CTA.

Suggested pattern:

“Start around existing systems with one visible execution workflow and show measurable movement in weeks, not transformation cycles.”

The CTA should feel like a next conversation, not a sales push.

---

## 6. Visual design requirements

Use the existing visual language:

* dark hero sections
* orange accent
* clean white content cards
* strong spacing
* executive-readable typography

Avoid dense text.

Do not let Page 1 become a text wall.

Suggested content limits:

* hero headline: 6–12 words
* hero subheadline: 18–32 words
* challenge body: 45–75 words
* business cost callout: 1 number/quote + 20–35 words
* solution visual: max 5 left items, 5 middle items, 4 right items
* why different: 2–3 items
* customer value: 3–5 items
* strategic business priorities: 4–5 items
* priority workflows: 4–5 items
* value metrics: 4–6 rows

---

## 7. Update the generic template content

Update the generic `twoPagerTemplate` example so it demonstrates the new structure.

The example should be vertical-neutral.

It should not mention supply chain specifically.

It should show placeholders that make the intended content clear, for example:

* “Core systems are not usually the issue. Execution work around them is where delay, risk, and manual effort build up.”
* “Existing systems / documents / messages / portals”
* “Orcaworks governed execution layer”
* “Faster closure / fewer manual touches / cleaner evidence / better control”

---

## 8. Update the supply-chain example output

Update the supply-chain brief data file to use the new schema.

For the supply-chain example:

* Move the existing problem statement into `page1.challenge.body`.
* Rename strategic pillars to `page2.strategicBusinessPriorities`.
* Move supplier onboarding, receiving discrepancies, replenishment exceptions, and recall evidence packs into `page2.priorityWorkflows`.
* Remove pilot steps entirely.
* Replace metric cards with a value metrics table.
* Replace the bottom pilot CTA with a subtle timeline/next-step statement.

---

## 9. Acceptance criteria

The updated rendered 2-pager should pass these checks:

* Page 1 introduces Orcaworks clearly.
* Page 1 includes a solution visual.
* Page 1 includes a business cost / opportunity callout.
* Page 1 separates the customer challenge from the Orcaworks answer.
* Page 2 includes strategic business priorities.
* Page 2 includes priority workflows to target.
* Page 2 includes a metrics table.
* There is no pilot-kickoff framing.
* There are no “good first pilots” or “baseline / govern / prove” steps.
* The final CTA is subtle and timeline-oriented.
* The document still feels like a conversation starter, not a proposal.
