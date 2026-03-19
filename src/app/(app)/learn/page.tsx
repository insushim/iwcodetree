"use client";

import { useState } from "react";
import { WorldMap } from "@/components/learn/WorldMap";
import { MissionInfoCard } from "@/components/learn/MissionInfoCard";

export default function LearnPage() {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black">학습 월드맵</h1>
        <p className="text-sm text-[var(--text-3)] mt-1">
          미션을 클리어하며 코딩 세상을 탐험해보세요!
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <WorldMap
          onSelectMission={setSelectedMission}
          selectedMission={selectedMission}
        />
        <div>
          {selectedMission ? (
            <MissionInfoCard missionId={selectedMission} />
          ) : (
            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] p-6 text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="font-bold mb-1">미션을 선택하세요</h3>
              <p className="text-sm text-[var(--text-3)]">
                지도의 노드를 클릭하면 미션 정보가 표시됩니다
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
