"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { SpriteLibraryModal } from "./SpriteLibraryModal";

interface SpritePanelProps {
  selectedSpriteId: string;
  onSelectSprite: (id: string) => void;
}

const demoSprites = [
  { id: "sprite_1", name: "고양이", icon: "🐱", x: 0, y: 0, size: 100 },
  { id: "sprite_2", name: "강아지", icon: "🐶", x: 100, y: 50, size: 80 },
];

export function SpritePanel({
  selectedSpriteId,
  onSelectSprite,
}: SpritePanelProps) {
  const [showLibrary, setShowLibrary] = useState(false);

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[var(--text-2)]">스프라이트</h3>
        <button
          onClick={() => setShowLibrary(true)}
          className="p-1.5 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {demoSprites.map((sprite) => (
          <button
            key={sprite.id}
            onClick={() => onSelectSprite(sprite.id)}
            className={`group relative w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 transition-all ${
              selectedSpriteId === sprite.id
                ? "border-[var(--primary)] bg-[var(--primary)]/5 shadow-sm"
                : "border-[var(--border-light)] hover:border-[var(--border)]"
            }`}
          >
            <span className="text-2xl">{sprite.icon}</span>
            <span className="text-[9px] font-bold text-[var(--text-3)] leading-none">
              {sprite.name}
            </span>
          </button>
        ))}
      </div>

      {/* Sprite properties */}
      {demoSprites.find((s) => s.id === selectedSpriteId) && (
        <div className="mt-3 p-3 bg-[var(--bg-main)] rounded-xl">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <label className="text-[var(--text-3)] font-semibold block mb-1">
                X
              </label>
              <input
                type="number"
                defaultValue={0}
                className="w-full px-2 py-1.5 rounded-lg border border-[var(--border-light)] bg-[var(--bg-card)] text-center font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-[var(--text-3)] font-semibold block mb-1">
                Y
              </label>
              <input
                type="number"
                defaultValue={0}
                className="w-full px-2 py-1.5 rounded-lg border border-[var(--border-light)] bg-[var(--bg-card)] text-center font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-[var(--text-3)] font-semibold block mb-1">
                크기
              </label>
              <input
                type="number"
                defaultValue={100}
                className="w-full px-2 py-1.5 rounded-lg border border-[var(--border-light)] bg-[var(--bg-card)] text-center font-mono text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {showLibrary && (
        <SpriteLibraryModal onClose={() => setShowLibrary(false)} />
      )}
    </div>
  );
}
