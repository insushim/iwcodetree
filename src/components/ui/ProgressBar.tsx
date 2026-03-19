"use client";

import React from "react";

type ProgressColor = "primary" | "secondary" | "accent" | "danger" | "info";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: ProgressColor;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorClasses: Record<ProgressColor, string> = {
  primary: "bg-[var(--primary)]",
  secondary: "bg-[var(--secondary)]",
  accent: "bg-[var(--accent)]",
  danger: "bg-[var(--danger)]",
  info: "bg-[var(--info)]",
};

const heightClasses = { sm: "h-2", md: "h-3", lg: "h-5" };

export function ProgressBar({
  value,
  max = 100,
  color = "primary",
  label,
  showValue = false,
  size = "md",
  className = "",
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5 text-sm font-semibold">
          {label && <span className="text-[var(--text-2)]">{label}</span>}
          {showValue && (
            <span className="text-[var(--text-3)]">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full ${heightClasses[size]} bg-[var(--border-light)] rounded-full overflow-hidden`}
      >
        <div
          className={`${heightClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
