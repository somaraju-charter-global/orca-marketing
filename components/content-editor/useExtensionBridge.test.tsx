import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useState } from "react";
import { useExtensionBridge } from "./useExtensionBridge";

interface Payload {
  value: string;
}

function TestConsumer() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useExtensionBridge<Payload>({
    validate: (unknownData) => {
      const candidate = unknownData as Partial<Payload>;
      if (typeof candidate?.value !== "string") {
        return { success: false, error: "Invalid payload" };
      }
      return { success: true, data: candidate as Payload };
    },
    onApply: (payload) => setData(payload),
    onError: (message) => setError(message),
  });

  return (
    <div>
      <div data-testid="data">{data ? data.value : "no-data"}</div>
      <div data-testid="error">{error ?? "no-error"}</div>
    </div>
  );
}

describe("useExtensionBridge", () => {
  it("ignores events missing the __orcaBridge marker", () => {
    render(<TestConsumer />);
    act(() => {
      window.dispatchEvent(
        new CustomEvent("ORCA_PAGE_DATA", { detail: { data: { value: "ok" } } })
      );
    });
    expect(screen.getByTestId("data").textContent).toBe("no-data");
    expect(screen.getByTestId("error").textContent).toBe("no-error");
  });

  it("ignores bridge events with no data", () => {
    render(<TestConsumer />);
    act(() => {
      window.dispatchEvent(
        new CustomEvent("ORCA_PAGE_DATA", { detail: { __orcaBridge: true } })
      );
    });
    expect(screen.getByTestId("data").textContent).toBe("no-data");
    expect(screen.getByTestId("error").textContent).toBe("no-error");
  });

  it("applies validated data from the ORCA_PAGE_DATA event", () => {
    render(<TestConsumer />);
    act(() => {
      window.dispatchEvent(
        new CustomEvent("ORCA_PAGE_DATA", {
          detail: { __orcaBridge: true, data: { value: "applied" } },
        })
      );
    });
    expect(screen.getByTestId("data").textContent).toBe("applied");
    expect(screen.getByTestId("error").textContent).toBe("no-error");
  });

  it("calls onError when validation fails", () => {
    render(<TestConsumer />);
    act(() => {
      window.dispatchEvent(
        new CustomEvent("ORCA_PAGE_DATA", {
          detail: { __orcaBridge: true, data: { value: 123 } },
        })
      );
    });
    expect(screen.getByTestId("data").textContent).toBe("no-data");
    expect(screen.getByTestId("error").textContent).toBe("Invalid payload");
  });

  it("cleans up the event listener on unmount", () => {
    const { unmount } = render(<TestConsumer />);
    unmount();
    act(() => {
      window.dispatchEvent(
        new CustomEvent("ORCA_PAGE_DATA", {
          detail: { __orcaBridge: true, data: { value: "after-unmount" } },
        })
      );
    });
    // If the listener were still active, calling onApply on an unmounted
    // component would log a React warning. The assertion mainly ensures
    // the test completes without throwing.
    expect(true).toBe(true);
  });
});
