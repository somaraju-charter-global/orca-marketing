"use client";

import { useEffect } from "react";

export interface ValidationResult<T> {
  success: true;
  data: T;
}

export interface ValidationFailure {
  success: false;
  error: string;
}

export interface UseExtensionBridgeOptions<T> {
  validate: (data: unknown) => ValidationResult<T> | ValidationFailure;
  onApply: (data: T) => void;
  onError?: (error: string) => void;
}

type BridgePayload = { __orcaBridge: true; data: unknown; error?: string };

function isBridgePayload(value: unknown): value is BridgePayload {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as Record<string, unknown>).__orcaBridge === true
  );
}

const ORCA_DATA_ATTR = 'data-orca-page-data';

/**
 * Listens for data from the OrcaWorks Chrome extension using a CSP-safe
 * DOM attribute bridge. The content script sets `data-orca-page-data` on
 * `documentElement`; this hook observes changes, validates the payload, and
 * applies it. Keeps the legacy CustomEvent listener as a fallback.
 */
export function useExtensionBridge<T>({
  validate,
  onApply,
  onError,
}: UseExtensionBridgeOptions<T>) {
  useEffect(() => {
    function applyData(data: unknown) {
      console.info('[useExtensionBridge] applyData received:', JSON.stringify(data, null, 2));
      if (data === undefined) {
        console.info('[useExtensionBridge] applyData skipped: data is undefined');
        return;
      }

      // Unwrap eventName/eventValue wrapper if present (from EmitEventExecutor)
      let dataToValidate = data;
      if (data !== null && typeof data === 'object') {
        const record = data as Record<string, unknown>;
        if (typeof record.eventName === 'string' && record.eventValue != null) {
          console.info('[useExtensionBridge] unwrapping eventName/eventValue wrapper');
          dataToValidate = record.eventValue;
        }
      }

      const validation = validate(dataToValidate);
      console.info('[useExtensionBridge] validation result:', JSON.stringify(validation, null, 2));
      if (!validation.success) {
        onError?.(validation.error);
        return;
      }

      onApply(validation.data);
    }

    function readAndClearDomBridge() {
      const html = document.documentElement;
      const raw = html.getAttribute(ORCA_DATA_ATTR);
      console.info('[useExtensionBridge] readAndClearDomBridge raw:', raw);
      if (!raw) return;

      html.removeAttribute(ORCA_DATA_ATTR);

      try {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        console.info('[useExtensionBridge] parsed bridge payload:', JSON.stringify(parsed, null, 2));
        if (parsed.__orcaBridge !== true) return;

        if (parsed.error) {
          onError?.(String(parsed.error));
          return;
        }

        applyData(parsed.data);
      } catch (err) {
        onError?.(err instanceof Error ? err.message : String(err));
      }
    }

    function customEventHandler(event: Event) {
      const detail = (event as CustomEvent<Record<string, unknown> | undefined>)
        .detail;
      console.info('[useExtensionBridge] customEventHandler detail:', JSON.stringify(detail, null, 2));

      if (!detail || detail.__orcaBridge !== true) {
        return;
      }

      applyData(detail.data);
    }

    function messageHandler(event: MessageEvent<unknown>) {
      console.info('[useExtensionBridge] messageHandler event.data:', JSON.stringify(event.data, null, 2));
      // Only accept messages sent from this same window (content script -> page).
      if (event.source !== window || !isBridgePayload(event.data)) {
        return;
      }

      if (event.data.error) {
        onError?.(String(event.data.error));
        return;
      }

      applyData(event.data.data);
    }

    // MutationObserver works even when CSP blocks inline-script injection.
    const observer = new MutationObserver((mutations) => {
      const hasAttrChange = mutations.some(
        (m) => m.type === 'attributes' && m.attributeName === ORCA_DATA_ATTR
      );
      if (hasAttrChange) readAndClearDomBridge();
    });
    observer.observe(document.documentElement, { attributes: true });

    // Catch any value already present at mount.
    readAndClearDomBridge();

    window.addEventListener("ORCA_PAGE_DATA", customEventHandler);
    window.addEventListener("message", messageHandler);
    return () => {
      observer.disconnect();
      window.removeEventListener("ORCA_PAGE_DATA", customEventHandler);
      window.removeEventListener("message", messageHandler);
    };
  }, [validate, onApply, onError]);
}
