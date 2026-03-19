"use client";

import { Award, Lock } from "lucide-react";

interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface BadgeCollectionProps {
  badges: BadgeItem[];
}

const rarityColors = {
  common: "border-[var(--text-3)]",
  rare: "border-[var(--info)]",
  epic: "border-[var(--block-looks)]",
  legendary: "border-[var(--accent)]",
};

const rarityBg = {
  common: "bg-[var(--text-3)]/10",
  rare: "bg-[var(--info)]/10",
  epic: "bg-[var(--block-looks)]/10",
  legendary: "bg-[var(--accent)]/10",
};

export function BadgeCollection({ badges }: BadgeCollectionProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
            badge.unlocked
              ? `${rarityColors[badge.rarity]} ${rarityBg[badge.rarity]} hover:scale-105 cursor-pointer`
              : "border-[var(--border-light)] bg-[var(--bg-main)] opacity-40"
          }`}
          title={badge.name}
        >
          {badge.unlocked ? (
            <>
              <span className="text-2xl">{badge.icon}</span>
              <span className="text-[9px] font-bold text-center leading-tight px-1 truncate w-full">
                {badge.name}
              </span>
            </>
          ) : (
            <Lock className="w-5 h-5 text-[var(--text-3)]" />
          )}
        </div>
      ))}
    </div>
  );
}
