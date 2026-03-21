"use client";

import Link from "next/link";
import {
  Star,
  Zap,
  Coins,
  ChevronRight,
  Lock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useMissionStore } from "@/stores/missionStore";
import { missionData, allMissionIds } from "@/data/missionData";

interface MissionInfoCardProps {
  missionId: string;
}

function getDisplayStatus(
  missionId: string,
  missionProgress: Record<string, { status: string }>,
): "completed" | "available" | "locked" {
  const progress = missionProgress[missionId];
  if (progress?.status === "completed") return "completed";
  if (progress?.status === "unlocked" || progress?.status === "in-progress")
    return "available";

  // First mission is always available if no progress exists
  if (missionId === "1-1" && !progress) return "available";

  // Check if previous mission is completed → this one becomes available
  const idx = allMissionIds.indexOf(missionId);
  if (idx > 0) {
    const prevId = allMissionIds[idx - 1];
    const prevProgress = missionProgress[prevId];
    if (prevProgress?.status === "completed") return "available";
  }

  return "locked";
}

export function MissionInfoCard({ missionId }: MissionInfoCardProps) {
  const mission = missionData[missionId];
  const { missionProgress } = useMissionStore();
  const status = getDisplayStatus(missionId, missionProgress);

  if (!mission) {
    return (
      <div
        className="rounded-2xl p-6 text-center relative overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(241, 245, 249, 0.8)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          animation: "fadeIn 0.5s ease-out",
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)",
          }}
        />
        <div className="relative z-10">
          <Lock className="w-8 h-8 mx-auto mb-2" style={{ color: "#94A3B8" }} />
          <h3 className="font-bold">잠긴 미션</h3>
          <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
            이전 미션을 완료하면 열립니다
          </p>
        </div>
      </div>
    );
  }

  // Get stage color based on mission ID
  const stageColors = {
    1: {
      primary: "#10B981",
      light: "#D1FAE5",
      gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    },
    2: {
      primary: "#3B82F6",
      light: "#DBEAFE",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
    },
    3: {
      primary: "#F59E0B",
      light: "#FEF3C7",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    },
    4: {
      primary: "#8B5CF6",
      light: "#EDE9FE",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
    },
    5: {
      primary: "#EF4444",
      light: "#FEE2E2",
      gradient: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
    },
    6: {
      primary: "#D97706",
      light: "#FED7AA",
      gradient: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
    },
  };
  const stage = parseInt(missionId.split("-")[0]) as keyof typeof stageColors;
  const stageColor = stageColors[stage] || stageColors[1];

  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow:
          "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        animation: "slideUp 0.6s ease-out",
      }}
    >
      {/* Gradient Header */}
      <div
        className="relative p-5"
        style={{
          background: stageColor.gradient,
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 transition-all duration-300"
                  style={
                    i < mission.difficulty
                      ? {
                          fill: "#FBBF24",
                          color: "#FBBF24",
                          filter:
                            "drop-shadow(0 0 6px rgba(251, 191, 36, 0.8))",
                          animation: `starShimmer 2s infinite ${i * 0.3}s`,
                        }
                      : { color: "rgba(255, 255, 255, 0.4)" }
                  }
                />
              ))}
            </div>
            {status === "completed" && (
              <CheckCircle
                className="w-6 h-6"
                style={{
                  color: "#FFFFFF",
                  fill: "rgba(16, 185, 129, 0.9)",
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                }}
              />
            )}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">
            {mission.title}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed drop-shadow-sm">
            {mission.desc}
          </p>
        </div>
      </div>

      {/* XP and Coins Section */}
      <div
        className="px-5 py-4 flex items-center gap-6"
        style={{
          borderBottom: "1px solid rgba(241, 245, 249, 0.5)",
          background: "rgba(248, 250, 252, 0.6)",
        }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
            boxShadow: "0 4px 12px rgba(251, 191, 36, 0.3)",
          }}
        >
          <Zap
            className="w-5 h-5"
            style={{
              color: "#FFFFFF",
              fill: "#FFFFFF",
              filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
            }}
          />
          <span className="text-sm font-bold text-white drop-shadow-sm">
            {mission.xp} XP
          </span>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            boxShadow: "0 4px 12px rgba(217, 119, 6, 0.3)",
          }}
        >
          <Coins
            className="w-5 h-5"
            style={{
              color: "#FFFFFF",
              filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
            }}
          />
          <span className="text-sm font-bold text-white drop-shadow-sm">
            {mission.coins} 코인
          </span>
        </div>
      </div>

      {/* Concepts Section */}
      <div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid rgba(241, 245, 249, 0.5)" }}
      >
        <div
          className="text-xs font-bold mb-3 uppercase tracking-wider"
          style={{ color: "#94A3B8" }}
        >
          학습 개념
        </div>
        <div className="flex gap-2 flex-wrap">
          {mission.concepts.map((concept, index) => (
            <span
              key={concept}
              className="px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${stageColor.light} 0%, rgba(255, 255, 255, 0.8) 100%)`,
                color: stageColor.primary,
                border: `1px solid ${stageColor.primary}20`,
                boxShadow: `0 2px 8px ${stageColor.primary}15`,
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      {/* Action Section */}
      <div className="p-6">
        {status === "locked" ? (
          <div className="text-center py-4">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{
                background: "rgba(203, 213, 225, 0.2)",
                border: "2px dashed #CBD5E1",
              }}
            >
              <Lock className="w-6 h-6" style={{ color: "#94A3B8" }} />
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: "#94A3B8" }}
            >
              이전 미션을 완료하세요
            </span>
          </div>
        ) : status === "completed" ? (
          <Link href={`/learn/${missionId}`}>
            <button
              className="w-full py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                color: "#059669",
                border: "2px solid rgba(16, 185, 129, 0.3)",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
              }}
            >
              <CheckCircle className="w-4 h-4" />
              다시 도전하기
            </button>
          </Link>
        ) : (
          <Link href={`/learn/${missionId}`}>
            <button
              className="w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 relative overflow-hidden group"
              style={{
                background: stageColor.gradient,
                color: "#FFFFFF",
                boxShadow: `0 6px 20px ${stageColor.primary}40`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)",
                  animation: "shimmer 1.5s infinite",
                }}
              />
              <span className="relative z-10">미션 시작</span>
              <ChevronRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes starShimmer {
          0%,
          100% {
            filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(251, 191, 36, 1));
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
