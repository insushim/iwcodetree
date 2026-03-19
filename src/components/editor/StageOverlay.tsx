"use client";

export function StageOverlay() {
  // This overlay renders speech bubbles, variable monitors, etc.
  // on top of the canvas via absolute positioning
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Speech bubbles, variable monitors would be rendered here */}
      {/* Example variable monitor */}
      {/*
      <div className="absolute top-2 left-2 pointer-events-auto bg-white/90 rounded-lg shadow-sm border border-[var(--border-light)] px-3 py-1.5 text-xs font-mono">
        <span className="text-[var(--block-variables)] font-bold">score</span>
        <span className="ml-2">0</span>
      </div>
      */}
    </div>
  );
}
