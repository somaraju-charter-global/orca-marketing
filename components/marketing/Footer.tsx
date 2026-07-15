import React from "react";

type FooterProps = {
  pageNumber?: string | number;
  totalPages?: number;
  showLogo?: boolean;
  showContact?: boolean;
  address?: string;
  phone?: string;
  email?: string;
  citation?: { text: string; url: string };
  copyrightText?: string;
  website?: string;
};

export function Footer({
  pageNumber,
  totalPages,
  showLogo = true,
  showContact = true,
  address = "orcaworks.ai",
  phone = "(678) 374 4434",
  email = "sales@orcaworks.ai",
  citation,
  copyrightText,
  website,
}: FooterProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-8 py-4 border-t border-current/10">
      {showContact && (
        <div className="flex justify-center items-center gap-10 text-xs opacity-70">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
            </svg>
            <a
              href={`https://${address}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:no-underline"
            >
              {address}
            </a>
          </div>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z" />
            </svg>
            Phone: {phone}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 6-10 7L2 6" />
            </svg>
            Email: {email}
          </span>
        </div>
      )}

      {(showLogo || pageNumber || citation || copyrightText || website) && (
        <div className={`flex justify-between items-center text-xs ${showContact ? "mt-2" : ""}`}>
          {showLogo && <div className="font-medium">Orcaworks</div>}
          {copyrightText && !showLogo && <div className="opacity-70">{copyrightText}</div>}
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            {citation && (
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 underline"
              >
                {citation.text}
              </a>
            )}
            {website && <span className="opacity-70">{website}</span>}
            {pageNumber && (
              <div>{totalPages ? `${pageNumber} / ${totalPages}` : pageNumber}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
