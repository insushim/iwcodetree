"use client";

import { CheckCircle, Star, Award, Edit3 } from "lucide-react";

const activities = [
  {
    icon: CheckCircle,
    text: "미션 '첫 움직임' 클리어!",
    time: "30분 전",
    color: "var(--secondary)",
  },
  {
    icon: Star,
    text: "+50 XP 획득",
    time: "30분 전",
    color: "var(--accent)",
  },
  {
    icon: Award,
    text: "'첫 걸음' 뱃지 획득",
    time: "1시간 전",
    color: "var(--block-looks)",
  },
  {
    icon: Edit3,
    text: "'우주 탐험 게임' 수정",
    time: "2시간 전",
    color: "var(--primary)",
  },
  {
    icon: CheckCircle,
    text: "미션 '반복의 마법' 클리어!",
    time: "어제",
    color: "var(--secondary)",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] divide-y divide-[var(--border-light)]">
      {activities.map((a, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${a.color}15` }}
          >
            <a.icon className="w-4 h-4" style={{ color: a.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{a.text}</div>
            <div className="text-xs text-[var(--text-3)]">{a.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
