import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditModeProvider } from "./EditModeContext";
import { EditableImage } from "./EditableImage";

function renderEditableImage(updateField: (path: (string | number)[], value: string | undefined) => void) {
  return render(
    <EditModeProvider value={{ isEditing: true, updateField }}>
      <EditableImage
        path={["page1", "solutionVisual", "imagePath"]}
        src="/images/orcaworks-stack-v3.jpg"
        alt="Solution visual"
        fill
        className="object-contain"
      />
    </EditModeProvider>
  );
}

describe("EditableImage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uploads the selected file, calls updateField with the returned URL, and cleans up the previous image", async () => {
    const updateField = vi.fn();
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === "DELETE") {
        return { ok: true, json: async () => ({ ok: true, deleted: true }) };
      }
      return {
        ok: true,
        json: async () => ({
          ok: true,
          url: "/api/local-blob/images/new-456.jpg",
          width: 1200,
          height: 800,
        }),
      };
    });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <EditModeProvider value={{ isEditing: true, updateField }}>
        <EditableImage
          path={["page1", "solutionVisual", "imagePath"]}
          src="/api/local-blob/images/old-123.jpg"
          alt="Solution visual"
          fill
          optional
          className="object-contain"
        />
      </EditModeProvider>
    );

    const file = new File(["fake-bytes"], "photo.jpg", { type: "image/jpeg" });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(updateField).toHaveBeenCalledTimes(1));
    expect(updateField).toHaveBeenCalledWith(
      ["page1", "solutionVisual", "imagePath"],
      "/api/local-blob/images/new-456.jpg"
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/upload/image",
      expect.objectContaining({ method: "POST" })
    );
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/upload/image",
        expect.objectContaining({
          method: "DELETE",
          body: JSON.stringify({
            url: "/api/local-blob/images/old-123.jpg",
          }),
        })
      )
    );
  });

  it("does not attempt cleanup when there was no previous image", async () => {
    const updateField = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        url: "/api/local-blob/images/new-456.jpg",
        width: 1200,
        height: 800,
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <EditModeProvider value={{ isEditing: true, updateField }}>
        <EditableImage
          path={["pages", 0, "image"]}
          alt=""
          fill
          optional
          className="object-cover"
        />
      </EditModeProvider>
    );

    const file = new File(["fake-bytes"], "photo.jpg", { type: "image/jpeg" });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(updateField).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledTimes(1); // only the POST — no DELETE call
  });

  it("shows a client-side error and never calls updateField for a disallowed file type", async () => {
    const updateField = vi.fn();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    renderEditableImage(updateField);

    const file = new File(["fake-bytes"], "photo.gif", { type: "image/gif" });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    expect(await screen.findByText(/only jpg and png/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(updateField).not.toHaveBeenCalled();
  });

  it("shows the server-provided error and does not call updateField when the upload is rejected", async () => {
    const updateField = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Image is 100x100px. Minimum allowed is 600x400px." }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderEditableImage(updateField);

    const file = new File(["fake-bytes"], "photo.jpg", { type: "image/jpeg" });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    expect(await screen.findByText(/minimum allowed is 600x400px/i)).toBeInTheDocument();
    expect(updateField).not.toHaveBeenCalled();
  });

  it("renders a plain image with no overlay when not in edit mode", () => {
    render(
      <EditModeProvider value={{ isEditing: false, updateField: vi.fn() }}>
        <EditableImage
          path={["page1", "solutionVisual", "imagePath"]}
          src="/images/orcaworks-stack-v3.jpg"
          alt="Solution visual"
          fill
          className="object-contain"
        />
      </EditModeProvider>
    );

    expect(screen.queryByText(/click to replace image/i)).not.toBeInTheDocument();
    expect(document.querySelector('input[type="file"]')).toBeNull();
  });

  it("shows a Delete button for an optional field, clears it via updateField(path, undefined), and cleans up storage", async () => {
    const updateField = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, deleted: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <EditModeProvider value={{ isEditing: true, updateField }}>
        <EditableImage
          path={["pages", 0, "image"]}
          src="/api/local-blob/images/bg-123.jpg"
          alt=""
          fill
          optional
          className="object-cover"
        />
      </EditModeProvider>
    );

    fireEvent.click(screen.getByTitle(/remove image/i));

    expect(updateField).toHaveBeenCalledWith(["pages", 0, "image"], undefined);
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/upload/image",
        expect.objectContaining({
          method: "DELETE",
          body: JSON.stringify({
            url: "/api/local-blob/images/bg-123.jpg",
          }),
        })
      )
    );
  });

  it("does not show a Delete button for a required field", () => {
    render(
      <EditModeProvider value={{ isEditing: true, updateField: vi.fn() }}>
        <EditableImage
          path={["pages", 1, "image"]}
          src="/images/guides/retail-operations-workflow.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </EditModeProvider>
    );

    expect(screen.queryByTitle(/remove image/i)).not.toBeInTheDocument();
  });

  it("shows a click-to-add placeholder for an optional field with no image yet", () => {
    render(
      <EditModeProvider value={{ isEditing: true, updateField: vi.fn() }}>
        <EditableImage
          path={["pages", 0, "image"]}
          alt=""
          fill
          optional
          className="object-cover"
        />
      </EditModeProvider>
    );

    expect(screen.getByText(/click to add image/i)).toBeInTheDocument();
  });

  it("renders nothing in edit mode for a required field with no image", () => {
    const { container } = render(
      <EditModeProvider value={{ isEditing: true, updateField: vi.fn() }}>
        <EditableImage path={["pages", 1, "image"]} alt="" fill className="object-cover" />
      </EditModeProvider>
    );

    expect(container.firstChild).toBeNull();
  });
});
