"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Clock, Zap, Target, Flame, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { NewProjectModal } from "@/components/dashboard/NewProjectModal";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { useUserStore } from "@/stores/userStore";
import { useProjectStore } from "@/stores/projectStore";
import { useMissionStore } from "@/stores/missionStore";

const XP_THRESHOLDS = [
  0, 50, 200, 450, 800, 1250, 1800, 2450, 3200, 4050, 5000,
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, xp, level, coins, streakDays, badges } =
    useUserStore();
  const { projects, loadProjects } = useProjectStore();
  const { missionProgress } = useMissionStore();
  const [showNewProject, setShowNewProject] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    loadProjects();
  }, [isAuthenticated, router, loadProjects]);

  const completedMissions = Object.values(missionProgress).filter(
    (m) => m.status === "completed",
  ).length;
  const totalMissions = 36;
  const currentThreshold = XP_THRESHOLDS[level - 1] || 0;
  const nextThreshold =
    XP_THRESHOLDS[level] || XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  const xpInLevel = xp - currentThreshold;
  const xpForLevel = nextThreshold - currentThreshold;

  const displayName = user?.displayName || user?.username || "코더";
  const roleLabel = user?.role === "teacher" ? "선생님" : "";
  const greeting = roleLabel
    ? `${displayName} ${roleLabel}`
    : `${displayName}님`;

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">안녕하세요, {greeting}! 👋</h1>
          <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
            {user?.role === "teacher"
              ? "오늘도 학생들과 즐거운 코딩 수업을 시작해볼까요?"
              : "오늘도 코딩 모험을 떠나볼까요?"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StreakCounter streak={streakDays} />
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
            value: xp.toLocaleString(),
            color: "#F59E0B",
            bg: "#FFFBEB",
          },
          {
            icon: Target,
            label: "완료 미션",
            value: `${completedMissions}/${totalMissions}`,
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
            icon: Flame,
            label: "연속 출석",
            value: `${streakDays}일`,
            color: "#EF4444",
            bg: "#FEF2F2",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4"
            style={{ background: stat.bg, border: `1px solid ${stat.color}20` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color}20` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <div
                  className="text-xs font-semibold"
                  style={{ color: "#94A3B8" }}
                >
                  {stat.label}
                </div>
                <div className="text-lg font-black">{stat.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
      >
        <h3 className="font-bold mb-3">현재 진행 상황</h3>
        <div className="space-y-3">
          <ProgressBar
            value={completedMissions}
            max={totalMissions}
            label="미션 진행도"
            showValue
            color="primary"
          />
          <ProgressBar
            value={xpInLevel}
            max={xpForLevel || 1}
            label="다음 레벨까지"
            showValue
            color="accent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">내 프로젝트</h2>
          </div>
          {projects.length === 0 ? (
            <div
              className="rounded-xl p-8 text-center"
              style={{ background: "#FFFFFF", border: "2px dashed #E2E8F0" }}
            >
              <FolderOpen
                className="w-12 h-12 mx-auto mb-3"
                style={{ color: "#CBD5E1" }}
              />
              <p className="font-bold mb-1" style={{ color: "#64748B" }}>
                아직 프로젝트가 없어요
              </p>
              <p className="text-sm mb-4" style={{ color: "#94A3B8" }}>
                새 프로젝트를 만들어 코딩을 시작해보세요!
              </p>
              <Button
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => setShowNewProject(true)}
              >
                첫 프로젝트 만들기
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 6).map((p) => (
                <ProjectCard
                  key={p.id}
                  project={{
                    id: p.id,
                    name: p.title,
                    updatedAt: new Date(p.updatedAt).toLocaleDateString(
                      "ko-KR",
                      { month: "short", day: "numeric" },
                    ),
                    thumbnail: "🎮",
                  }}
                />
              ))}
            </div>
          )}
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
