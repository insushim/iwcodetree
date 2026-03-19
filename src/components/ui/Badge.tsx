"use client";

import React from "react";

type BadgeColor =
  | "primary"
  | "secondary"
  | "accent"
  | "danger"
  | "info"
  | "gray";

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  primary: "bg-[var(--primary-50)] text-[var(--primary)]",
  secondary: "bg-emerald-50 text-[var(--secondary)]",
  accent: "bg-amber-50 text-[var(--accent)]",
  danger: "bg-red-50 text-[var(--danger)]",
  info: "bg-blue-50 text-[var(--info)]",
  gray: "bg-[var(--border-light)] text-[var(--text-2)]",
};

export function Badge({
  color = "primary",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 text-xs font-bold
        rounded-[var(--radius-full)]
        ${colorClasses[color]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
