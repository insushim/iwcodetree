"use client";

import { useState } from "react";
import { WorldMap } from "@/components/learn/WorldMap";
import { MissionInfoCard } from "@/components/learn/MissionInfoCard";

export default function LearnPage() {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  return (
    <div className="mx-auto" style={{ maxWidth: "1400px" }}>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black">학습 월드맵</h1>
          <p className="text-sm text-[var(--text-3)] mt-1">
            미션을 클리어하며 코딩 세상을 탐험해보세요!
          </p>
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
              className="rounded-2xl p-8 text-center"
              style={{
                background: "linear-gradient(135deg, var(--bg-card), #F8FAFC)",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                }}
              >
                🗺️
              </div>
              <h3 className="font-bold text-lg mb-2">미션을 선택하세요</h3>
              <p className="text-sm text-[var(--text-3)] leading-relaxed">
                지도의 노드를 클릭하면
                <br />
                미션 정보가 표시됩니다
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
