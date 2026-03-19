"use client";

import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Switch({
  checked,
  onChange,
  label,
  disabled = false,
}: SwitchProps) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <button
        role="switch"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative w-11 h-6 rounded-full transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30
          disabled:opacity-50 disabled:cursor-not-allowed
          ${checked ? "bg-[var(--primary)]" : "bg-[var(--border)]"}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
            shadow-[var(--shadow-sm)] transition-transform duration-200
            ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
      {label && (
        <span className="text-sm font-semibold text-[var(--text-2)]">
          {label}
        </span>
      )}
    </label>
  );
}
