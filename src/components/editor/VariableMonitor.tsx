"use client";

interface VariableMonitorProps {
  name: string;
  value: string | number;
  x?: number;
  y?: number;
}

export function VariableMonitor({
  name,
  value,
  x = 8,
  y = 8,
}: VariableMonitorProps) {
  return (
    <div
      className="absolute pointer-events-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-[var(--border-light)] px-3 py-1.5 text-xs font-mono select-none cursor-move"
      style={{ left: x, top: y }}
    >
      <span className="text-[var(--block-variables)] font-bold">{name}</span>
      <span className="ml-2 text-[var(--text-1)]">{value}</span>
    </div>
  );
}
