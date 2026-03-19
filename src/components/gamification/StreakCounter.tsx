"use client";

import { Flame } from "lucide-react";

interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--danger)]/10">
      <Flame
        className={`w-5 h-5 ${streak > 0 ? "text-[var(--danger)] fill-[var(--danger)]" : "text-[var(--text-3)]"}`}
      />
      <span className="text-sm font-black text-[var(--danger)]">
        {streak}일
      </span>
    </div>
  );
}
