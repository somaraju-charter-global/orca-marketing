import React from "react";
import type { OnePager } from "@/content/onepager-types";
import { TwoPageVerticalBrief } from "./TwoPageVerticalBrief";

export function OnePagerDocument({ onePager }: { onePager: OnePager }) {
  switch (onePager.layout) {
    case "two-page-vertical-brief":
      return <TwoPageVerticalBrief {...onePager} />;
    default:
      return null;
  }
}
