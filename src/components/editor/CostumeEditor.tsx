"use client";

import { Plus, Trash2 } from "lucide-react";

interface Costume {
  id: string;
  name: string;
  icon: string;
}

interface CostumeEditorProps {
  costumes: Costume[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CostumeEditor({
  costumes,
  selectedId,
  onSelect,
}: CostumeEditorProps) {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-[var(--text-2)]">모양</h3>
        <button className="p-1 rounded-md hover:bg-[var(--border-light)] text-[var(--text-3)]">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-1">
        {costumes.map((c, i) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${
              selectedId === c.id
                ? "bg-[var(--primary)]/10 border border-[var(--primary)]/30"
                : "hover:bg-[var(--bg-main)]"
            }`}
          >
            <span className="text-2xl">{c.icon}</span>
            <div className="flex-1">
              <div className="text-xs font-bold">{c.name}</div>
              <div className="text-[10px] text-[var(--text-3)]">
                모양 {i + 1}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
