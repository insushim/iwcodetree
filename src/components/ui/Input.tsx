"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, iconRight, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-bold text-[var(--text-2)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-2.5 text-sm font-medium
              bg-[var(--bg-card)] border rounded-[var(--radius-md)]
              outline-none transition-all duration-200
              placeholder:text-[var(--text-3)]
              focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]
              ${error ? "border-[var(--danger)]" : "border-[var(--border)]"}
              ${icon ? "pl-10" : ""}
              ${iconRight ? "pr-10" : ""}
              ${className}
            `}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]">
              {iconRight}
            </span>
          )}
        </div>
        {error && (
          <span className="text-xs font-semibold text-[var(--danger)]">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
