import React from "react";
import { ClosingCtaPageContent } from "@/content/types";
import { PageShell } from "./PageShell";
import { Editable } from "@/components/content-editor/Editable";

type ClosingCtaPageProps = ClosingCtaPageContent & { pageIndex?: number };

export function ClosingCtaPage({
  pageIndex = 0,
  headline,
  body,
  cta,
  ctaUrl,
  website,
  variant = "dark",
  surface,
  pageNumber,
}: ClosingCtaPageProps) {
  const logoSrc = surface === "light" ? "/logos/orcaworks-dark.png" : "/logos/orcaworks-white.png";
  return (
    <PageShell variant={variant} surface={surface} pageIndex={pageIndex} pageNumber={pageNumber}>

      <div className="relative z-10 h-full flex flex-col p-12">
        <div className="mb-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="Orcaworks" className="h-auto w-48" />
        </div>

        <div className="flex-1 flex flex-col justify-center pb-10">
          <div className="flex items-end justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-bold leading-tight mb-6">
                <Editable path={["pages", pageIndex, "headline"]} value={headline} multiline />
              </h2>
              <p className="text-xl text-[var(--page-fg)] font-light mb-8">
                <Editable path={["pages", pageIndex, "body"]} value={body} multiline />
              </p>
              <a
                href={ctaUrl}
                className="inline-block bg-[var(--orca-orange)] text-white px-8 py-4 rounded-lg font-semibold text-lg no-underline"
              >
                <Editable path={["pages", pageIndex, "cta"]} value={cta} />
              </a>
            </div>

            <a
              href={ctaUrl}
              className="shrink-0 flex flex-col items-end gap-3 no-underline"
            >
              <div className={surface === "light" ? "bg-[var(--orca-dark)] rounded-xl p-3" : ""}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/orcaworks-qr-white.png"
                  alt="QR code to Orcaworks website"
                  className="w-36 h-36"
                />
              </div>
              {website && (
                <span className="text-[var(--page-fg)] text-xs opacity-80">
                  Scan to visit <Editable path={["pages", pageIndex, "website"]} value={website} />
                </span>
              )}
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
