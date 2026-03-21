"use client";

import { useState } from "react";
import { WorldMap } from "@/components/learn/WorldMap";
import { MissionInfoCard } from "@/components/learn/MissionInfoCard";
import { useMissionStore } from "@/stores/missionStore";

export default function LearnPage() {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const { missionProgress } = useMissionStore();

  // Calculate progress stats
  const allMissions = [
    "1-1",
    "1-2",
    "1-3",
    "1-4",
    "1-5",
    "1-6",
    "2-1",
    "2-2",
    "2-3",
    "2-4",
    "2-5",
    "2-6",
    "3-1",
    "3-2",
    "3-3",
    "3-4",
    "3-5",
    "3-6",
    "4-1",
    "4-2",
    "4-3",
    "4-4",
    "4-5",
    "4-6",
    "5-1",
    "5-2",
    "5-3",
    "5-4",
    "5-5",
    "5-6",
    "6-1",
    "6-2",
    "6-3",
    "6-4",
    "6-5",
    "6-6",
  ];
  const completed = allMissions.filter(
    (id) => missionProgress[id]?.status === "completed",
  ).length;

  return (
    <div className="mx-auto" style={{ maxWidth: "1400px" }}>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1
            className="text-4xl font-black mb-3"
            style={{
              background:
                "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 2px 4px rgba(99, 102, 241, 0.1)",
            }}
          >
            ✨ 학습 월드맵
          </h1>
          <p className="text-lg" style={{ color: "#64748B" }}>
            미션을 클리어하며 코딩 세상을 탐험해보세요!
          </p>
          <div
            className="mt-4 px-4 py-2 rounded-xl inline-flex items-center gap-2"
            style={{
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                boxShadow: "0 0 6px rgba(16, 185, 129, 0.5)",
              }}
            />
            <span className="text-sm font-bold" style={{ color: "#065F46" }}>
              {completed}/36 미션 완료
            </span>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1fr_360px] lg:grid-cols-[1fr_320px] gap-6">
        <WorldMap
          onSelectMission={setSelectedMission}
          selectedMission={selectedMission}
        />
        <div>
          {selectedMission ? (
            <MissionInfoCard missionId={selectedMission} />
          ) : (
            <div
              className="rounded-2xl p-8 text-center relative overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              }}
            >
              {/* Animated background elements */}
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-20"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                  animation: "float 3s ease-in-out infinite",
                }}
              />
              <div
                className="absolute top-12 left-6 w-4 h-4 rounded-full opacity-15"
                style={{
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  animation: "float 4s ease-in-out infinite 1s",
                }}
              />
              <div
                className="absolute bottom-8 right-8 w-6 h-6 rounded-full opacity-20"
                style={{
                  background:
                    "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  animation: "float 3.5s ease-in-out infinite 0.5s",
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl transition-all duration-500 hover:scale-110 hover:rotate-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
                  }}
                >
                  <span
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                    }}
                  >
                    🗺️
                  </span>
                </div>
                <h3
                  className="font-bold text-xl mb-3"
                  style={{ color: "#1E293B" }}
                >
                  미션을 선택하세요
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#64748B" }}
                >
                  지도의 노드를 클릭하면
                  <br />
                  미션 정보가 표시됩니다
                </p>
                <div
                  className="mt-6 text-sm font-semibold"
                  style={{ color: "#8B5CF6" }}
                >
                  ✨ 첫 번째 미션부터 시작해보세요!
                </div>
              </div>

              <style jsx>{`
                @keyframes float {
                  0%,
                  100% {
                    transform: translateY(0px);
                  }
                  50% {
                    transform: translateY(-10px);
                  }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
