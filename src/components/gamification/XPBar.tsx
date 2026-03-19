"use client";

import { Zap } from "lucide-react";

interface XPBarProps {
  current: number;
  max: number;
}

export function XPBar({ current, max }: XPBarProps) {
  const pct = Math.min(100, (current / max) * 100);

  return (
    <div className="flex items-center gap-2">
      <Zap className="w-4 h-4 text-[var(--accent)] fill-[var(--accent)]" />
      <div className="w-28 h-2.5 bg-[var(--border-light)] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold text-[var(--text-3)]">
        {current}/{max}
      </span>
    </div>
  );
}
