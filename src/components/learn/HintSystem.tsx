"use client";

import { useState } from "react";
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

interface HintSystemProps {
  hints: [string, string, string] | string[];
}

export function HintSystem({ hints }: HintSystemProps) {
  const [revealed, setRevealed] = useState(0);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--bg-main)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-sm font-bold">힌트</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-[var(--text-3)]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--text-3)]" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-3 space-y-2">
          {hints.slice(0, revealed).map((hint, i) => (
            <div
              key={i}
              className="p-2.5 rounded-lg bg-[var(--accent)]/5 border border-[var(--accent)]/10 text-sm text-[var(--text-2)]"
            >
              <span className="font-bold text-[var(--accent)] mr-1">
                힌트 {i + 1}:
              </span>
              {hint}
            </div>
          ))}
          {revealed < hints.length && (
            <button
              onClick={() => setRevealed(revealed + 1)}
              className="text-sm text-[var(--primary)] font-bold hover:underline"
            >
              힌트 {revealed + 1} 보기 ({hints.length - revealed}개 남음)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
