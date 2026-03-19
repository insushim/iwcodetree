"use client";

import React, { useEffect } from "react";
import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (type, message, duration = 3000) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, type, message, duration }] }));
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

const icons: Record<ToastType, string> = {
  success: "\u2705",
  error: "\u274C",
  info: "\u2139\uFE0F",
  warning: "\u26A0\uFE0F",
};

const bgClasses: Record<ToastType, string> = {
  success: "border-l-4 border-l-[var(--secondary)]",
  error: "border-l-4 border-l-[var(--danger)]",
  info: "border-l-4 border-l-[var(--info)]",
  warning: "border-l-4 border-l-[var(--accent)]",
};

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToast();

  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => removeToast(toast.id), toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, removeToast]);

  return (
    <div
      className={`
        animate-slide-up flex items-center gap-3 px-4 py-3
        bg-[var(--bg-card)] rounded-[var(--radius-md)] shadow-[var(--shadow-lg)]
        ${bgClasses[toast.type]}
      `}
    >
      <span className="text-lg">{icons[toast.type]}</span>
      <span className="text-sm font-semibold flex-1">{toast.message}</span>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-[var(--text-3)] hover:text-[var(--text-1)] text-lg leading-none"
      >
        &times;
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-80">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}
