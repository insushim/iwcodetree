"use client";

import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BarChart3, Users, Target, Clock } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-black">학습 리포트</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Users,
            label: "활성 학생",
            value: "29/32",
            color: "var(--primary)",
          },
          {
            icon: Target,
            label: "평균 완료율",
            value: "68%",
            color: "var(--secondary)",
          },
          {
            icon: Clock,
            label: "주간 평균 학습",
            value: "4.2시간",
            color: "var(--info)",
          },
          {
            icon: BarChart3,
            label: "평균 점수",
            value: "85점",
            color: "var(--accent)",
          },
        ].map((s) => (
          <Card key={s.label} variant="bordered">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${s.color}15` }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-xs text-[var(--text-3)] font-semibold">
                  {s.label}
                </div>
                <div className="text-lg font-black">{s.value}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card header="스테이지별 진행도">
        <div className="space-y-4">
          {[
            { name: "Stage 1: 시작의 숲", progress: 92 },
            { name: "Stage 2: 반복의 호수", progress: 74 },
            { name: "Stage 3: 조건의 산", progress: 48 },
            { name: "Stage 4: 변수의 마을", progress: 25 },
            { name: "Stage 5: 함수의 성", progress: 8 },
            { name: "Stage 6: 창작의 하늘", progress: 2 },
          ].map((stage) => (
            <ProgressBar
              key={stage.name}
              value={stage.progress}
              label={stage.name}
              showValue
              color={
                stage.progress > 70
                  ? "secondary"
                  : stage.progress > 40
                    ? "primary"
                    : "accent"
              }
            />
          ))}
        </div>
      </Card>

      <Card header="일반적인 어려움">
        <div className="space-y-2">
          {[
            { concept: "중첩 반복문", struggling: 12 },
            { concept: "조건문 조합 (AND/OR)", struggling: 9 },
            { concept: "변수 초기화", struggling: 7 },
            { concept: "함수 매개변수", struggling: 5 },
          ].map((c) => (
            <div
              key={c.concept}
              className="flex items-center justify-between py-2 border-b border-[var(--border-light)] last:border-0"
            >
              <span className="text-sm font-semibold">{c.concept}</span>
              <span className="text-sm text-[var(--danger)] font-bold">
                {c.struggling}명 어려움
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
