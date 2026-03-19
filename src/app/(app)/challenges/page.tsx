"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Zap, Clock, Star, Trophy, Calendar, ChevronRight } from "lucide-react";

const dailyChallenges = [
  {
    id: "d1",
    title: "반복의 힘",
    desc: "반복 블록을 사용해서 별 모양을 그려보세요",
    xp: 30,
    coins: 10,
    difficulty: 1,
    timeLeft: "12시간",
  },
  {
    id: "d2",
    title: "소리 마법사",
    desc: "3가지 다른 소리를 사용하는 프로젝트를 만드세요",
    xp: 40,
    coins: 15,
    difficulty: 2,
    timeLeft: "12시간",
  },
  {
    id: "d3",
    title: "조건부 인사",
    desc: "클릭하면 다른 인사를 하는 스프라이트를 만드세요",
    xp: 50,
    coins: 20,
    difficulty: 2,
    timeLeft: "12시간",
  },
];

const weeklyChallenges = [
  {
    id: "w1",
    title: "미니 게임 챌린지",
    desc: "간단한 미니 게임을 만들어 공유하세요. 가장 많은 좋아요를 받은 프로젝트가 우승!",
    xp: 200,
    coins: 100,
    participants: 45,
    daysLeft: 4,
  },
  {
    id: "w2",
    title: "애니메이션 콘테스트",
    desc: "30초 이내의 재미있는 애니메이션을 만들어보세요",
    xp: 150,
    coins: 80,
    participants: 32,
    daysLeft: 4,
  },
];

export default function ChallengesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black">챌린지</h1>
        <p className="text-sm text-[var(--text-3)] mt-1">
          도전을 완료하고 보상을 받으세요!
        </p>
      </div>

      {/* Daily */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[var(--accent)]" />
          <h2 className="text-lg font-bold">오늘의 챌린지</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {dailyChallenges.map((c) => (
            <Card key={c.id} variant="bordered" hover>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(c.difficulty)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-3)]">
                    <Clock className="w-3 h-3" />
                    {c.timeLeft}
                  </div>
                </div>
                <h3 className="font-bold">{c.title}</h3>
                <p className="text-sm text-[var(--text-2)]">{c.desc}</p>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="text-[var(--accent)] flex items-center gap-1">
                    <Zap className="w-3 h-3" />+{c.xp} XP
                  </span>
                  <span className="text-[var(--secondary)]">
                    +{c.coins} 코인
                  </span>
                </div>
                <Button size="sm" fullWidth>
                  도전하기
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Weekly */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-[var(--primary)]" />
          <h2 className="text-lg font-bold">주간 챌린지</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {weeklyChallenges.map((c) => (
            <Card key={c.id} variant="elevated">
              <div className="space-y-3">
                <h3 className="text-lg font-bold">{c.title}</h3>
                <p className="text-sm text-[var(--text-2)]">{c.desc}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-bold text-[var(--accent)] flex items-center gap-1">
                    <Zap className="w-4 h-4" />+{c.xp} XP
                  </span>
                  <span className="text-[var(--text-3)]">
                    {c.participants}명 참여중
                  </span>
                  <span className="text-[var(--text-3)]">
                    {c.daysLeft}일 남음
                  </span>
                </div>
                <Button fullWidth>
                  참여하기
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
