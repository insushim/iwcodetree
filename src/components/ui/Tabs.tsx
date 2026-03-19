"use client";

import React, { useState, useRef, useEffect } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = "" }: TabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = activeTab || tabs[0]?.id;

  useEffect(() => {
    const idx = tabs.findIndex((t) => t.id === current);
    const el = tabRefs.current[idx];
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [current, tabs]);

  return (
    <div
      className={`relative flex gap-1 p-1 bg-[var(--border-light)] rounded-[var(--radius-md)] ${className}`}
    >
      <div
        className="absolute top-1 h-[calc(100%-8px)] bg-[var(--bg-card)] rounded-[var(--radius-sm)] shadow-[var(--shadow-sm)] transition-all duration-300"
        style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
      />
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          onClick={() => onChange(tab.id)}
          className={`
            relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-bold
            rounded-[var(--radius-sm)] transition-colors duration-200
            ${current === tab.id ? "text-[var(--primary)]" : "text-[var(--text-3)] hover:text-[var(--text-2)]"}
          `}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
