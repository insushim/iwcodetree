"use client";

import React from "react";

type CardVariant = "default" | "elevated" | "bordered";

interface CardProps {
  variant?: CardVariant;
  hover?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantClasses: Record<CardVariant, string> = {
  default: "bg-[var(--bg-card)] shadow-[var(--shadow-sm)]",
  elevated: "bg-[var(--bg-elevated)] shadow-[var(--shadow-lg)]",
  bordered: "bg-[var(--bg-card)] border border-[var(--border)]",
};

export function Card({
  variant = "default",
  hover = false,
  header,
  footer,
  children,
  className = "",
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-[var(--radius-lg)] overflow-hidden
        ${variantClasses[variant]}
        ${hover ? "card-hover cursor-pointer" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {header && (
        <div className="px-5 py-4 border-b border-[var(--border-light)] font-bold text-lg">
          {header}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-3 border-t border-[var(--border-light)] bg-[var(--bg-sidebar)]">
          {footer}
        </div>
      )}
    </div>
  );
}
