import React from "react";
import { MarketingGuide } from "@/content/types";
import { CoverPage } from "./CoverPage";
import { ContentsPage } from "./ContentsPage";
import { DarkEditorialPage } from "./DarkEditorialPage";
import { ImageCalloutPage } from "./ImageCalloutPage";
import { UseCasePage } from "./UseCasePage";
import { QuotePage } from "./QuotePage";
import { StatPage } from "./StatPage";
import { BeforeAfterPage } from "./BeforeAfterPage";
import { RoiPage } from "./RoiPage";
import { ClosingCtaPage } from "./ClosingCtaPage";

export function MarketingDocument({ guide }: { guide: MarketingGuide }) {
  return (
    <main className="pdf-document">
      {guide.pages.map((page, index) => {
        switch (page.type) {
          case "cover":
            return <CoverPage key={index} {...page} />;
          case "contents":
            return <ContentsPage key={index} {...page} />;
          case "darkEditorial":
            return <DarkEditorialPage key={index} {...page} />;
          case "imageCallout":
            return <ImageCalloutPage key={index} {...page} />;
          case "useCase":
            return <UseCasePage key={index} {...page} />;
          case "quote":
            return <QuotePage key={index} {...page} />;
          case "stat":
            return <StatPage key={index} {...page} />;
          case "beforeAfter":
            return <BeforeAfterPage key={index} {...page} />;
          case "roi":
            return <RoiPage key={index} {...page} />;
          case "closingCta":
            return <ClosingCtaPage key={index} {...page} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
