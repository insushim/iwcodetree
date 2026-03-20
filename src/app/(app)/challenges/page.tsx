"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Zap,
  Clock,
  Star,
  Trophy,
  Calendar,
  ChevronRight,
  CheckCircle,
  Filter,
} from "lucide-react";
import { DAILY_SPECS, WEEKLY_SPECS } from "@/lib/data/challenges";
import { useChallengeStore } from "@/stores/challengeStore";

const categoryLabels: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  motion: { label: "동작", color: "#2563EB", bg: "#DBEAFE" },
  looks: { label: "형태", color: "#7C3AED", bg: "#F3E8FF" },
  sound: { label: "소리", color: "#DB2777", bg: "#FCE7F3" },
  events: { label: "이벤트", color: "#D97706", bg: "#FEF3C7" },
  control: { label: "제어", color: "#EA580C", bg: "#FFF7ED" },
  sensing: { label: "감지", color: "#0891B2", bg: "#CFFAFE" },
  operators: { label: "연산", color: "#059669", bg: "#D1FAE5" },
  variables: { label: "변수", color: "#DC2626", bg: "#FEE2E2" },
  pen: { label: "펜", color: "#4F46E5", bg: "#E0E7FF" },
  myblocks: { label: "나만의 블록", color: "#7C3AED", bg: "#F3E8FF" },
  mixed: { label: "종합", color: "#6366F1", bg: "#EEF2FF" },
};

const categories = [
  "전체",
  "motion",
  "looks",
  "sound",
  "events",
  "control",
  "sensing",
  "operators",
  "variables",
  "pen",
  "mixed",
];

export default function ChallengesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("전체");
  const { completedChallenges } = useChallengeStore();

  const filteredDaily =
    filter === "전체"
      ? DAILY_SPECS
      : DAILY_SPECS.filter((c) => c.category === filter);

  const completedCount = DAILY_SPECS.filter(
    (c) => completedChallenges[c.id],
  ).length;

  return (
    <div className="mx-auto" style={{ maxWidth: "1400px" }}>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">챌린지</h1>
          <p className="text-sm text-[var(--text-3)] mt-1">
            도전을 완료하고 보상을 받으세요! ({completedCount}/
            {DAILY_SPECS.length} 완료)
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-[var(--text-3)] flex-shrink-0" />
        {categories.map((cat) => {
          const info = categoryLabels[cat];
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all"
              style={{
                background: isActive
                  ? info?.bg || "var(--primary)"
                  : "var(--bg-sidebar)",
                color: isActive ? info?.color || "white" : "var(--text-3)",
                border: isActive
                  ? `1px solid ${info?.color || "var(--primary)"}33`
                  : "1px solid transparent",
              }}
            >
              {cat === "전체" ? "전체" : info?.label || cat}
            </button>
          );
        })}
      </div>

      {/* Daily Challenges */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-lg font-bold">일일 챌린지</h2>
          <span className="text-xs text-[var(--text-3)] ml-2">
            {filteredDaily.length}개
          </span>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
          {filteredDaily.map((c) => {
            const done = !!completedChallenges[c.id];
            const cat = categoryLabels[c.category];
            return (
              <Card
                key={c.id}
                variant="bordered"
                hover
                onClick={() => router.push(`/challenges/${c.id}`)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{ background: cat?.bg, color: cat?.color }}
                    >
                      {cat?.label}
                    </span>
                    <div className="flex items-center gap-1">
                      {done && (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      )}
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-2.5 h-2.5 ${i < c.difficulty ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold">{c.title}</h3>
                  <p className="text-xs text-[var(--text-2)] line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-bold">
                      <span className="text-[var(--accent)] flex items-center gap-1">
                        <Zap className="w-3 h-3" />+{c.xpReward} XP
                      </span>
                      <span className="text-[var(--secondary)]">
                        +{c.coinReward} 코인
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[var(--text-3)]">
                      <Clock className="w-3 h-3" />~{c.estimatedMinutes}분
                    </div>
                  </div>
                  <Button
                    size="sm"
                    fullWidth
                    variant={done ? "ghost" : "primary"}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/challenges/${c.id}`);
                    }}
                  >
                    {done ? "다시 도전" : "도전하기"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Weekly Challenges */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold">주간 챌린지</h2>
        </div>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
          {WEEKLY_SPECS.map((c) => {
            const done = !!completedChallenges[c.id];
            const cat = categoryLabels[c.category];
            return (
              <Card
                key={c.id}
                variant="elevated"
                hover
                onClick={() => router.push(`/challenges/${c.id}`)}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{ background: cat?.bg, color: cat?.color }}
                    >
                      {cat?.label}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < c.difficulty ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                    {done && (
                      <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <p className="text-sm text-[var(--text-2)] line-clamp-2">
                    {c.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-bold text-[var(--accent)] flex items-center gap-1">
                      <Zap className="w-4 h-4" />+{c.xpReward} XP
                    </span>
                    <span className="text-[var(--secondary)] font-bold">
                      +{c.coinReward} 코인
                    </span>
                    <span className="text-[var(--text-3)] flex items-center gap-1 ml-auto">
                      <Clock className="w-3.5 h-3.5" />~{c.estimatedMinutes}분
                    </span>
                  </div>
                  <Button
                    fullWidth
                    variant={done ? "ghost" : "primary"}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/challenges/${c.id}`);
                    }}
                  >
                    {done ? "다시 도전" : "참여하기"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
