"use client";

import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { TrendingUp, Users, Target, Clock } from "lucide-react";

export function ClassAnalytics() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        {
          icon: Users,
          label: "학생 수",
          value: "28명",
          color: "var(--primary)",
        },
        {
          icon: Target,
          label: "평균 진행도",
          value: "72%",
          color: "var(--secondary)",
        },
        {
          icon: Clock,
          label: "주간 평균",
          value: "3.5시간",
          color: "var(--info)",
        },
        {
          icon: TrendingUp,
          label: "이번 주 성장",
          value: "+12%",
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
  );
}
