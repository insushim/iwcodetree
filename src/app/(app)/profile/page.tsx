"use client";

import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { BadgeCollection } from "@/components/gamification/BadgeCollection";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { Zap, Target, Clock, Flame, Award } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useMissionStore } from "@/stores/missionStore";
import { useProjectStore } from "@/stores/projectStore";

const XP_THRESHOLDS = [
  0, 50, 200, 450, 800, 1250, 1800, 2450, 3200, 4050, 5000,
];

export default function ProfilePage() {
  const { user, xp, level, streakDays, badges } = useUserStore();
  const { missionProgress } = useMissionStore();
  const { projects } = useProjectStore();

  const completedMissions = Object.values(missionProgress).filter(
    (m) => m.status === "completed",
  ).length;
  const currentThreshold = XP_THRESHOLDS[level - 1] || 0;
  const nextThreshold =
    XP_THRESHOLDS[level] || XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  const xpInLevel = xp - currentThreshold;
  const xpForLevel = nextThreshold - currentThreshold;

  const displayName = user?.displayName || user?.username || "코더";
  const roleLabel =
    user?.role === "teacher"
      ? "선생님"
      : user?.role === "student"
        ? "학생"
        : "";

  const badgeItems =
    badges.length > 0
      ? badges.map((b) => ({
          id: b.id,
          name: b.name,
          icon: b.icon,
          unlocked: true,
          rarity: "common" as const,
        }))
      : [
          {
            id: "empty1",
            name: "첫 걸음",
            icon: "👣",
            unlocked: false,
            rarity: "common" as const,
          },
          {
            id: "empty2",
            name: "블록 마스터",
            icon: "🧱",
            unlocked: false,
            rarity: "rare" as const,
          },
          {
            id: "empty3",
            name: "반복왕",
            icon: "🔄",
            unlocked: false,
            rarity: "common" as const,
          },
          {
            id: "empty4",
            name: "게임 크리에이터",
            icon: "🎮",
            unlocked: false,
            rarity: "epic" as const,
          },
          {
            id: "empty5",
            name: "코딩 전설",
            icon: "👑",
            unlocked: false,
            rarity: "legendary" as const,
          },
        ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div
        className="rounded-xl p-6"
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 6px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-6">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: user?.avatarBgColor || "#6366F1" }}
          >
            {user?.avatarEmoji || "🐱"}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black">{displayName}</h1>
            <p className="text-sm mt-0.5" style={{ color: "#94A3B8" }}>
              {roleLabel} · 레벨 {level}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <LevelBadge level={level} size="md" />
              <div className="flex-1 max-w-xs">
                <ProgressBar
                  value={xpInLevel}
                  max={xpForLevel || 1}
                  label="다음 레벨까지"
                  showValue
                  color="accent"
                  size="sm"
                />
              </div>
              <StreakCounter streak={streakDays} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: Zap,
            label: "총 XP",
            value: xp.toLocaleString(),
            color: "#F59E0B",
            bg: "#FFFBEB",
          },
          {
            icon: Target,
            label: "완료 미션",
            value: String(completedMissions),
            color: "#10B981",
            bg: "#ECFDF5",
          },
          {
            icon: Clock,
            label: "프로젝트",
            value: `${projects.length}개`,
            color: "#3B82F6",
            bg: "#EFF6FF",
          },
          {
            icon: Award,
            label: "뱃지",
            value: String(badges.length),
            color: "#9966FF",
            bg: "#F5F0FF",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4 text-center"
            style={{ background: s.bg, border: `1px solid ${s.color}20` }}
          >
            <s.icon
              className="w-6 h-6 mx-auto mb-2"
              style={{ color: s.color }}
            />
            <div className="text-xl font-black">{s.value}</div>
            <div className="text-xs font-semibold" style={{ color: "#94A3B8" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5" style={{ color: "#F59E0B" }} />
          <h3 className="font-bold">뱃지 컬렉션</h3>
        </div>
        <BadgeCollection badges={badgeItems} />
      </div>
    </div>
  );
}
