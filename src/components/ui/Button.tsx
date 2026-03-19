"use client";

import React, { forwardRef } from "react";
import { Spinner } from "./Spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] active:scale-[0.97]",
  secondary:
    "bg-[var(--secondary)] hover:brightness-110 text-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] active:scale-[0.97]",
  ghost:
    "bg-transparent hover:bg-[var(--border-light)] text-[var(--text-2)] hover:text-[var(--text-1)]",
  danger:
    "bg-[var(--danger)] hover:brightness-110 text-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] active:scale-[0.97]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5 rounded-[var(--radius-sm)]",
  md: "px-5 py-2.5 text-base gap-2 rounded-[var(--radius-md)]",
  lg: "px-7 py-3.5 text-lg gap-2.5 rounded-[var(--radius-lg)]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconRight,
      fullWidth = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center font-bold transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {loading ? <Spinner size="sm" /> : icon}
        {children}
        {iconRight}
      </button>
    );
  },
);

Button.displayName = "Button";
