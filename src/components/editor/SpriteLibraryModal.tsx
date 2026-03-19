"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface SpriteLibraryModalProps {
  onClose: () => void;
}

const categories = ["전체", "동물", "캐릭터", "물건", "탈것"];

const sprites = [
  { id: "cat", name: "고양이", icon: "🐱", category: "동물" },
  { id: "dog", name: "강아지", icon: "🐶", category: "동물" },
  { id: "rabbit", name: "토끼", icon: "🐰", category: "동물" },
  { id: "bear", name: "곰", icon: "🐻", category: "동물" },
  { id: "bird", name: "새", icon: "🐦", category: "동물" },
  { id: "fish", name: "물고기", icon: "🐠", category: "동물" },
  { id: "boy", name: "소년", icon: "👦", category: "캐릭터" },
  { id: "girl", name: "소녀", icon: "👧", category: "캐릭터" },
  { id: "wizard", name: "마법사", icon: "🧙", category: "캐릭터" },
  { id: "robot", name: "로봇", icon: "🤖", category: "캐릭터" },
  { id: "ball", name: "공", icon: "⚽", category: "물건" },
  { id: "star", name: "별", icon: "⭐", category: "물건" },
  { id: "car", name: "자동차", icon: "🚗", category: "탈것" },
  { id: "rocket", name: "로켓", icon: "🚀", category: "탈것" },
];

export function SpriteLibraryModal({ onClose }: SpriteLibraryModalProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("전체");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = sprites.filter((s) => {
    const matchSearch = s.name.includes(search);
    const matchCat = category === "전체" || s.category === category;
    return matchSearch && matchCat;
  });

  return (
    <Modal open onClose={onClose} title="스프라이트 선택" size="lg">
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-3)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="스프라이트 검색..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>
        </div>

        <div className="flex gap-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                category === c
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--text-3)] hover:bg-[var(--border-light)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 max-h-64 overflow-y-auto">
          {filtered.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                selected === s.id
                  ? "border-[var(--primary)] bg-[var(--primary)]/5"
                  : "border-[var(--border-light)] hover:border-[var(--border)]"
              }`}
            >
              <span className="text-3xl">{s.icon}</span>
              <span className="text-[10px] font-bold text-[var(--text-3)]">
                {s.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            취소
          </Button>
          <Button className="flex-1" onClick={onClose} disabled={!selected}>
            추가하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
