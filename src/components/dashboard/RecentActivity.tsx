"use client";

import { Activity } from "lucide-react";

export function RecentActivity() {
  // In a real app, this would come from a store/API.
  // For now, show empty state since there's no activity yet.
  return (
    <div
      className="rounded-xl p-6 text-center"
      style={{ background: "#FFFFFF", border: "1px solid #F1F5F9" }}
    >
      <Activity
        className="w-10 h-10 mx-auto mb-3"
        style={{ color: "#CBD5E1" }}
      />
      <p className="text-sm font-semibold" style={{ color: "#64748B" }}>
        아직 활동 기록이 없어요
      </p>
      <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>
        미션을 시작하거나 프로젝트를 만들면 여기에 표시돼요!
      </p>
    </div>
  );
}
