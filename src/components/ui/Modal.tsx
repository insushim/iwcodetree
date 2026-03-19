"use client";

import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

type ModalSize = "sm" | "md" | "lg" | "full";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-3xl",
  full: "max-w-[95vw] max-h-[95vh]",
};

export function Modal({
  open,
  onClose,
  title,
  size = "md",
  children,
  className = "",
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`
          relative w-full ${sizeClasses[size]}
          bg-[var(--bg-card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)]
          animate-pop-in overflow-hidden
          ${className}
        `}
      >
        {(title || true) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-light)]">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--border-light)] text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors text-xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        )}
        <div className="p-6 overflow-y-auto max-h-[70vh]">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
