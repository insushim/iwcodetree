"use client";

import { Card } from "@/components/ui/Card";
import { Users, ClipboardList, BarChart3, TrendingUp } from "lucide-react";

export default function TeacherDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-black">교사 대시보드</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Users,
            label: "총 학생",
            value: "32명",
            color: "var(--primary)",
          },
          {
            icon: ClipboardList,
            label: "진행 과제",
            value: "3개",
            color: "var(--secondary)",
          },
          {
            icon: BarChart3,
            label: "평균 진행도",
            value: "68%",
            color: "var(--info)",
          },
          {
            icon: TrendingUp,
            label: "이번 주 활동",
            value: "+15%",
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

      <div className="grid lg:grid-cols-2 gap-6">
        <Card header="최근 과제 현황">
          <div className="space-y-3">
            {[
              { name: "반복문 미션", submitted: 28, total: 32 },
              { name: "조건문 미션", submitted: 15, total: 32 },
              { name: "자유 프로젝트", submitted: 8, total: 32 },
            ].map((a) => (
              <div key={a.name} className="flex items-center justify-between">
                <span className="text-sm font-semibold">{a.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full"
                      style={{
                        width: `${(a.submitted / a.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-[var(--text-3)] font-semibold w-12 text-right">
                    {a.submitted}/{a.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card header="도움이 필요한 학생">
          <div className="space-y-2">
            {[
              { name: "김민수", issue: "반복문 미션 3회 실패", level: 3 },
              { name: "이서연", issue: "2일째 미접속", level: 5 },
              { name: "박준호", issue: "조건문 미션 진행 어려움", level: 4 },
            ].map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--bg-main)]"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--danger)]/10 flex items-center justify-center text-xs font-bold text-[var(--danger)]">
                  {s.name[0]}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">{s.name}</div>
                  <div className="text-xs text-[var(--text-3)]">{s.issue}</div>
                </div>
                <span className="text-xs bg-[var(--border-light)] px-2 py-1 rounded-full font-semibold">
                  Lv.{s.level}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
