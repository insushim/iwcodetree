"use client";

import Link from "next/link";
import { Star, Zap, Coins, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MissionInfoCardProps {
  missionId: string;
}

// Demo data
const missionData: Record<
  string,
  {
    title: string;
    desc: string;
    difficulty: number;
    xp: number;
    coins: number;
    concepts: string[];
    status: "locked" | "available" | "completed";
  }
> = {
  m1: {
    title: "첫 움직임",
    desc: "스프라이트를 움직여보세요! 블록을 연결해서 고양이를 걸어가게 만들어봐요.",
    difficulty: 1,
    xp: 30,
    coins: 10,
    concepts: ["움직이기", "방향"],
    status: "completed",
  },
  m2: {
    title: "인사하기",
    desc: "스프라이트가 말풍선으로 인사하게 만들어보세요.",
    difficulty: 1,
    xp: 30,
    coins: 10,
    concepts: ["말하기", "기다리기"],
    status: "completed",
  },
  m3: {
    title: "소리 내기",
    desc: "클릭하면 소리가 나도록 만들어보세요.",
    difficulty: 1,
    xp: 40,
    coins: 15,
    concepts: ["소리", "이벤트"],
    status: "completed",
  },
  m4: {
    title: "반복의 마법",
    desc: "반복 블록으로 같은 동작을 여러 번 실행해보세요.",
    difficulty: 2,
    xp: 50,
    coins: 20,
    concepts: ["반복", "패턴"],
    status: "available",
  },
};

export function MissionInfoCard({ missionId }: MissionInfoCardProps) {
  const mission = missionData[missionId];

  if (!mission) {
    return (
      <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] p-6 text-center">
        <Lock className="w-8 h-8 text-[var(--text-3)] mx-auto mb-2" />
        <h3 className="font-bold">잠긴 미션</h3>
        <p className="text-sm text-[var(--text-3)] mt-1">
          이전 미션을 완료하면 열립니다
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[var(--border-light)]">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < mission.difficulty
                  ? "fill-[var(--accent)] text-[var(--accent)]"
                  : "text-[var(--border)]"
              }`}
            />
          ))}
        </div>
        <h3 className="text-lg font-bold">{mission.title}</h3>
        <p className="text-sm text-[var(--text-2)] mt-1 leading-relaxed">
          {mission.desc}
        </p>
      </div>

      {/* Rewards */}
      <div className="px-5 py-3 flex items-center gap-4 border-b border-[var(--border-light)] bg-[var(--bg-main)]">
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-[var(--accent)] fill-[var(--accent)]" />
          <span className="text-sm font-bold">{mission.xp} XP</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Coins className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-sm font-bold">{mission.coins} 코인</span>
        </div>
      </div>

      {/* Concepts */}
      <div className="px-5 py-3 border-b border-[var(--border-light)]">
        <div className="text-xs font-bold text-[var(--text-3)] mb-2">
          학습 개념
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {mission.concepts.map((c) => (
            <span
              key={c}
              className="px-2 py-1 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="p-5">
        {mission.status === "completed" ? (
          <Link href={`/learn/${missionId}`}>
            <Button fullWidth variant="ghost">
              다시 도전하기
            </Button>
          </Link>
        ) : (
          <Link href={`/learn/${missionId}`}>
            <Button fullWidth icon={<ChevronRight className="w-4 h-4" />}>
              미션 시작
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
