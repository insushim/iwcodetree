"use client";

import { useState } from "react";
import { Image } from "lucide-react";

const backdrops = [
  { id: "white", name: "흰색", color: "#FFFFFF" },
  { id: "sky", name: "하늘", color: "#87CEEB" },
  { id: "grass", name: "잔디", color: "#4CAF50" },
  { id: "space", name: "우주", color: "#1A1A2E" },
  { id: "beach", name: "해변", color: "#FFD700" },
  { id: "city", name: "도시", color: "#607D8B" },
];

export function BackdropPanel() {
  const [selected, setSelected] = useState("white");

  return (
    <div className="p-3">
      <div className="flex items-center gap-2 mb-2">
        <Image className="w-4 h-4 text-[var(--text-3)]" />
        <h3 className="text-sm font-bold text-[var(--text-2)]">배경</h3>
      </div>
      <div className="flex gap-1.5">
        {backdrops.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelected(b.id)}
            className={`w-10 h-10 rounded-lg border-2 transition-all ${
              selected === b.id
                ? "border-[var(--primary)] scale-110"
                : "border-[var(--border-light)]"
            }`}
            style={{ background: b.color }}
            title={b.name}
          />
        ))}
      </div>
    </div>
  );
}
