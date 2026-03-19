"use client";

import React, { forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, options, placeholder, className = "", id, ...props },
    ref,
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-bold text-[var(--text-2)]"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            w-full px-4 py-2.5 text-sm font-medium appearance-none
            bg-[var(--bg-card)] border rounded-[var(--radius-md)]
            outline-none transition-all duration-200
            focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]
            ${error ? "border-[var(--danger)]" : "border-[var(--border)]"}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-xs font-semibold text-[var(--danger)]">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
