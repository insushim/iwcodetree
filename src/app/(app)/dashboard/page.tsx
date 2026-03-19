"use client";

import { useState } from "react";
import { Plus, Clock, Zap, Target, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { NewProjectModal } from "@/components/dashboard/NewProjectModal";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StreakCounter } from "@/components/gamification/StreakCounter";

const demoProjects = [
  { id: "1", name: "우주 탐험 게임", updatedAt: "2시간 전", thumbnail: "🚀" },
  { id: "2", name: "고양이 점프", updatedAt: "어제", thumbnail: "🐱" },
  { id: "3", name: "미로 탈출", updatedAt: "3일 전", thumbnail: "🏃" },
];

export default function DashboardPage() {
  const [showNewProject, setShowNewProject] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">안녕하세요, 지우님! 👋</h1>
          <p className="text-[var(--text-3)] text-sm mt-1">
            오늘도 코딩 모험을 떠나볼까요?
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StreakCounter streak={7} />
          <Button
            icon={<Plus className="w-5 h-5" />}
            onClick={() => setShowNewProject(true)}
          >
            새 프로젝트
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: Zap,
            label: "총 XP",
            value: "2,340",
            color: "var(--accent)",
          },
          {
            icon: Target,
            label: "완료 미션",
            value: "18/36",
            color: "var(--secondary)",
          },
          {
            icon: Clock,
            label: "학습 시간",
            value: "42시간",
            color: "var(--info)",
          },
          {
            icon: Flame,
            label: "연속 출석",
            value: "7일",
            color: "var(--danger)",
          },
        ].map((stat) => (
          <Card key={stat.label} variant="bordered">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-xs text-[var(--text-3)] font-semibold">
                  {stat.label}
                </div>
                <div className="text-lg font-black">{stat.value}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Current Progress */}
      <Card header="현재 진행 상황">
        <div className="space-y-3">
          <ProgressBar
            value={18}
            max={36}
            label="미션 진행도"
            showValue
            color="primary"
          />
          <ProgressBar
            value={340}
            max={500}
            label="다음 레벨까지"
            showValue
            color="accent"
          />
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">내 프로젝트</h2>
            <button className="text-sm text-[var(--primary)] font-bold hover:underline">
              전체보기
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-bold mb-4">최근 활동</h2>
          <RecentActivity />
        </div>
      </div>

      <NewProjectModal
        open={showNewProject}
        onClose={() => setShowNewProject(false)}
      />
    </div>
  );
}
