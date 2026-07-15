import React from "react";
import { MarketingGuide } from "@/content/types";
import { GuideThemeProvider } from "./GuideThemeContext";
import { CoverPage } from "./CoverPage";
import { TitlePage } from "./TitlePage";
import { ContentsPage } from "./ContentsPage";
import { DarkEditorialPage } from "./DarkEditorialPage";
import { ImageCalloutPage } from "./ImageCalloutPage";
import { UseCasePage } from "./UseCasePage";
import { UseCaseDetail } from "./UseCaseDetail";
import { QuotePage } from "./QuotePage";
import { StatPage } from "./StatPage";
import { BeforeAfterPage } from "./BeforeAfterPage";
import { RoiPage } from "./RoiPage";
import { ClosingCtaPage } from "./ClosingCtaPage";

export function MarketingDocument({ guide }: { guide: MarketingGuide }) {
  return (
    <GuideThemeProvider theme={guide.accentTheme}>
      <main className="pdf-document">
        {guide.pages.map((page, index) => {
          switch (page.type) {
            case "cover":
              return <CoverPage key={index} pageIndex={index} {...page} />;
            case "titlePage":
              return <TitlePage key={index} pageIndex={index} {...page} />;
            case "contents":
              return <ContentsPage key={index} pageIndex={index} {...page} />;
            case "darkEditorial":
              return <DarkEditorialPage key={index} pageIndex={index} {...page} />;
            case "imageCallout":
              return <ImageCalloutPage key={index} pageIndex={index} {...page} />;
            case "useCase":
              return <UseCasePage key={index} pageIndex={index} {...page} />;
            case "useCaseDetail":
              return <UseCaseDetail key={index} pageIndex={index} {...page} />;
            case "quote":
              return <QuotePage key={index} pageIndex={index} {...page} />;
            case "stat":
              return <StatPage key={index} pageIndex={index} {...page} />;
            case "beforeAfter":
              return <BeforeAfterPage key={index} pageIndex={index} {...page} />;
            case "roi":
              return <RoiPage key={index} pageIndex={index} {...page} />;
            case "closingCta":
              return <ClosingCtaPage key={index} pageIndex={index} {...page} />;
            default:
              return null;
          }
        })}
      </main>
    </GuideThemeProvider>
  );
}
