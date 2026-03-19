"use client";

import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { BadgeCollection } from "@/components/gamification/BadgeCollection";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { Zap, Target, Clock, Flame, Award } from "lucide-react";

const demoBadges = [
  {
    id: "b1",
    name: "첫 걸음",
    icon: "👣",
    unlocked: true,
    rarity: "common" as const,
  },
  {
    id: "b2",
    name: "블록 마스터",
    icon: "🧱",
    unlocked: true,
    rarity: "rare" as const,
  },
  {
    id: "b3",
    name: "반복왕",
    icon: "🔄",
    unlocked: true,
    rarity: "common" as const,
  },
  {
    id: "b4",
    name: "소셜 스타",
    icon: "⭐",
    unlocked: true,
    rarity: "epic" as const,
  },
  {
    id: "b5",
    name: "7일 연속",
    icon: "🔥",
    unlocked: true,
    rarity: "rare" as const,
  },
  {
    id: "b6",
    name: "코딩 전설",
    icon: "👑",
    unlocked: false,
    rarity: "legendary" as const,
  },
  {
    id: "b7",
    name: "버그 헌터",
    icon: "🐛",
    unlocked: false,
    rarity: "epic" as const,
  },
  {
    id: "b8",
    name: "창작의 신",
    icon: "🎨",
    unlocked: false,
    rarity: "legendary" as const,
  },
];

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card variant="elevated">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white text-3xl font-black">
            JW
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black">김지우</h1>
            <p className="text-sm text-[var(--text-3)] mt-0.5">코딩 모험가</p>
            <div className="flex items-center gap-4 mt-3">
              <LevelBadge level={7} size="md" />
              <div className="flex-1 max-w-xs">
                <ProgressBar
                  value={340}
                  max={500}
                  label="다음 레벨까지"
                  showValue
                  color="accent"
                  size="sm"
                />
              </div>
              <StreakCounter streak={7} />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Zap, label: "총 XP", value: "2,340", color: "var(--accent)" },
          {
            icon: Target,
            label: "완료 미션",
            value: "18",
            color: "var(--secondary)",
          },
          {
            icon: Clock,
            label: "학습 시간",
            value: "42h",
            color: "var(--info)",
          },
          {
            icon: Award,
            label: "뱃지",
            value: "5",
            color: "var(--block-looks)",
          },
        ].map((s) => (
          <Card key={s.label} variant="bordered">
            <div className="text-center">
              <s.icon
                className="w-6 h-6 mx-auto mb-2"
                style={{ color: s.color }}
              />
              <div className="text-xl font-black">{s.value}</div>
              <div className="text-xs text-[var(--text-3)] font-semibold">
                {s.label}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Badges */}
      <Card
        header={
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--accent)]" />
            뱃지 컬렉션
          </div>
        }
      >
        <BadgeCollection badges={demoBadges} />
      </Card>
    </div>
  );
}
