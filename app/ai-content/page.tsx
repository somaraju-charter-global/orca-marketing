"use client";

import { useState } from "react";
import Link from "next/link";

type StepKey =
  | "research"
  | "planning"
  | "story"
  | "useCaseGuide"
  | "twoPageBrief";

type StepStatus = "pending" | "running" | "done";

const STEP_ORDER: StepKey[] = [
  "research",
  "planning",
  "story",
  "useCaseGuide",
  "twoPageBrief",
];

const STEP_LABELS: Record<StepKey, string> = {
  research: "Research Reference",
  planning: "Planning Raw Material",
  story: "Story",
  useCaseGuide: "Use-Case Guide Content",
  twoPageBrief: "Two-Page Brief Content",
};

function emptyOutputs(): Record<StepKey, string> {
  return {
    research: "",
    planning: "",
    story: "",
    useCaseGuide: "",
    twoPageBrief: "",
  };
}

function emptyStatuses(): Record<StepKey, StepStatus> {
  return {
    research: "pending",
    planning: "pending",
    story: "pending",
    useCaseGuide: "pending",
    twoPageBrief: "pending",
  };
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "untitled"
  );
}

export default function AiContentPage() {
  const [title, setTitle] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [statuses, setStatuses] = useState<Record<StepKey, StepStatus>>(
    emptyStatuses()
  );
  const [outputs, setOutputs] = useState<Record<StepKey, string>>(
    emptyOutputs()
  );
  const [activeTab, setActiveTab] = useState<StepKey>("research");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasAnyOutput = STEP_ORDER.some((step) => outputs[step]);

  async function handleGenerate() {
    if (!title.trim() || isRunning) return;

    setIsRunning(true);
    setErrorMessage(null);
    setStatuses(emptyStatuses());
    setOutputs(emptyOutputs());
    setActiveTab("research");

    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to start content generation.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);

          if (event.step === "error") {
            throw new Error(event.message);
          }
          if (event.step === "complete") {
            continue;
          }

          const step = event.step as StepKey;
          if (event.status === "started") {
            setStatuses((prev) => ({ ...prev, [step]: "running" }));
            setActiveTab(step);
          } else if (event.status === "done") {
            setStatuses((prev) => ({ ...prev, [step]: "done" }));
            setOutputs((prev) => ({ ...prev, [step]: event.content }));
            setActiveTab(step);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "Content generation failed."
      );
    } finally {
      setIsRunning(false);
    }
  }

  function downloadMarkdown(step: StepKey) {
    const content = outputs[step];
    if (!content) return;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(title)}-${slugify(STEP_LABELS[step])}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function downloadAll() {
    STEP_ORDER.forEach((step) => {
      if (outputs[step]) downloadMarkdown(step);
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← Back to all documents
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
          AI Content Generation
        </h1>
        <p className="text-gray-600 mb-8">
          Enter a title or concept and generate a Research Reference,
          Planning Raw Material, Story, Use-Case Guide Content, and
          Two-Page Brief Content in one pass.
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <label
            htmlFor="content-title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title or Concept
          </label>
          <div className="flex gap-3">
            <input
              id="content-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Governed Execution for the Retail Supply Chain"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isRunning}
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isRunning || !title.trim()}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isRunning ? "Generating…" : "Generate Content"}
            </button>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600 mt-3">{errorMessage}</p>
          )}

          <ol className="flex flex-wrap gap-4 mt-6">
            {STEP_ORDER.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${
                    statuses[step] === "done"
                      ? "bg-green-600 text-white"
                      : statuses[step] === "running"
                        ? "bg-blue-600 text-white animate-pulse"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {statuses[step] === "done" ? "✓" : index + 1}
                </span>
                {STEP_LABELS[step]}
              </li>
            ))}
          </ol>
        </div>

        {hasAnyOutput && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-4">
              <div className="flex gap-1 overflow-x-auto">
                {STEP_ORDER.map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setActiveTab(step)}
                    disabled={!outputs[step]}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                      activeTab === step
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {STEP_LABELS[step]}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={downloadAll}
                className="text-sm px-3 py-2 text-gray-600 hover:text-gray-900 whitespace-nowrap"
              >
                Export all (.md)
              </button>
            </div>

            <div className="p-4">
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={() => downloadMarkdown(activeTab)}
                  disabled={!outputs[activeTab]}
                  className="text-sm px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Export {STEP_LABELS[activeTab]} (.md)
                </button>
              </div>
              <textarea
                value={outputs[activeTab]}
                onChange={(event) =>
                  setOutputs((prev) => ({
                    ...prev,
                    [activeTab]: event.target.value,
                  }))
                }
                placeholder={
                  statuses[activeTab] === "running"
                    ? "Generating…"
                    : "This step hasn't run yet."
                }
                className="w-full min-h-[420px] font-mono text-sm text-gray-900 border border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
