import { describe, expect, it } from "vitest";
import {
  isAllowedImageReference,
  imageRefSchema,
  parseUploadedImageReference,
} from "../image-path";

describe("isAllowedImageReference", () => {
  it("allows bundled static assets under /images and /logos", () => {
    expect(isAllowedImageReference("/images/orcaworks-stack-v3.jpg")).toBe(true);
    expect(isAllowedImageReference("/logos/orcaworks-white.png")).toBe(true);
  });

  it("allows static assets nested in subfolders under /images", () => {
    expect(isAllowedImageReference("/images/guides/bg-white.jpg")).toBe(true);
    expect(
      isAllowedImageReference("/images/guides/retail-operations-workflow.jpg")
    ).toBe(true);
  });

  it("rejects path traversal attempts", () => {
    expect(isAllowedImageReference("/images/../../../etc/passwd.jpg")).toBe(
      false
    );
    expect(isAllowedImageReference("/images/guides/../../secret.jpg")).toBe(
      false
    );
  });


  it("rejects protocol-relative URLs", () => {
    expect(isAllowedImageReference("//evil.example.com/images/x.jpg")).toBe(
      false
    );
  });

  it("allows locally-stored uploads served through /api/local-blob", () => {
    expect(
      isAllowedImageReference(
        "/api/local-blob/domains/example.com/images/abc-123.jpg"
      )
    ).toBe(true);
  });

  it("allows Vercel Blob URLs for uploaded images", () => {
    expect(
      isAllowedImageReference(
        "https://abc123.public.blob.vercel-storage.com/domains/example.com/images/abc-123.png"
      )
    ).toBe(true);
  });

  it("rejects arbitrary external image URLs", () => {
    expect(isAllowedImageReference("https://evil.example.com/huge.png")).toBe(
      false
    );
  });

  it("rejects data: URIs", () => {
    expect(isAllowedImageReference("data:image/png;base64,AAAA")).toBe(false);
  });

  it("rejects disallowed extensions even on an otherwise-safe path", () => {
    expect(isAllowedImageReference("/images/malicious.svg.exe")).toBe(false);
  });

  it("integrates with zod as a refinement", () => {
    expect(imageRefSchema.safeParse("/images/foo.jpg").success).toBe(true);
    expect(imageRefSchema.safeParse("https://evil.example.com/x.jpg").success).toBe(
      false
    );
  });
});

describe("parseUploadedImageReference", () => {
  it("extracts domain and filename from a local-blob upload URL", () => {
    expect(
      parseUploadedImageReference(
        "/api/local-blob/domains/example.com/images/abc-123.jpg"
      )
    ).toEqual({ domain: "example.com", filename: "abc-123.jpg" });
  });

  it("extracts domain and filename from a Vercel Blob upload URL", () => {
    expect(
      parseUploadedImageReference(
        "https://abc123.public.blob.vercel-storage.com/domains/example.com/images/abc-123.png"
      )
    ).toEqual({ domain: "example.com", filename: "abc-123.png" });
  });

  it("returns null for bundled static assets — they must never be deleted", () => {
    expect(parseUploadedImageReference("/images/orcaworks-stack-v3.jpg")).toBeNull();
    expect(parseUploadedImageReference("/images/guides/bg-white.jpg")).toBeNull();
    expect(parseUploadedImageReference("/logos/orcaworks-white.png")).toBeNull();
  });

  it("returns null for arbitrary/unrecognized URLs", () => {
    expect(parseUploadedImageReference("https://evil.example.com/x.jpg")).toBeNull();
    expect(parseUploadedImageReference("not a url at all")).toBeNull();
  });
});
