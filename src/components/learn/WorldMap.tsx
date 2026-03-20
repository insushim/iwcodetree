"use client";

import { useMissionStore } from "@/stores/missionStore";
import { MissionNode } from "./MissionNode";

interface WorldMapProps {
  onSelectMission: (id: string) => void;
  selectedMission: string | null;
}

const stages = [
  {
    id: 1,
    name: "첫걸음",
    color: "#10B981",
    missions: [
      { id: "1-1", x: 80, y: 380 },
      { id: "1-2", x: 160, y: 340 },
      { id: "1-3", x: 240, y: 360 },
      { id: "1-4", x: 320, y: 320 },
      { id: "1-5", x: 400, y: 340 },
      { id: "1-6", x: 480, y: 300 },
    ],
  },
  {
    id: 2,
    name: "반복의 힘",
    color: "#3B82F6",
    missions: [
      { id: "2-1", x: 540, y: 260 },
      { id: "2-2", x: 600, y: 220 },
      { id: "2-3", x: 660, y: 240 },
      { id: "2-4", x: 720, y: 200 },
      { id: "2-5", x: 780, y: 220 },
      { id: "2-6", x: 840, y: 180 },
    ],
  },
  {
    id: 3,
    name: "조건의 세계",
    color: "#F59E0B",
    missions: [
      { id: "3-1", x: 880, y: 140 },
      { id: "3-2", x: 820, y: 100 },
      { id: "3-3", x: 760, y: 80 },
      { id: "3-4", x: 700, y: 100 },
      { id: "3-5", x: 640, y: 80 },
      { id: "3-6", x: 580, y: 60 },
    ],
  },
  {
    id: 4,
    name: "변수의 비밀",
    color: "#8B5CF6",
    missions: [
      { id: "4-1", x: 500, y: 60 },
      { id: "4-2", x: 420, y: 80 },
      { id: "4-3", x: 340, y: 60 },
      { id: "4-4", x: 260, y: 80 },
      { id: "4-5", x: 180, y: 60 },
      { id: "4-6", x: 100, y: 80 },
    ],
  },
  {
    id: 5,
    name: "게임 만들기",
    color: "#EF4444",
    missions: [
      { id: "5-1", x: 80, y: 140 },
      { id: "5-2", x: 160, y: 160 },
      { id: "5-3", x: 240, y: 140 },
      { id: "5-4", x: 320, y: 160 },
      { id: "5-5", x: 400, y: 140 },
      { id: "5-6", x: 480, y: 160 },
    ],
  },
  {
    id: 6,
    name: "마스터",
    color: "#D97706",
    missions: [
      { id: "6-1", x: 540, y: 380 },
      { id: "6-2", x: 620, y: 360 },
      { id: "6-3", x: 700, y: 380 },
      { id: "6-4", x: 780, y: 360 },
      { id: "6-5", x: 860, y: 380 },
      { id: "6-6", x: 920, y: 340 },
    ],
  },
];

// Flatten all mission IDs in order
const allMissionIds = stages.flatMap((s) => s.missions.map((m) => m.id));

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

export function WorldMap({ onSelectMission, selectedMission }: WorldMapProps) {
  const { missionProgress } = useMissionStore();

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      <svg
        viewBox="0 0 1000 440"
        className="w-full h-auto"
        style={{ minHeight: 340 }}
      >
        <defs>
          <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EEF2FF" />
            <stop offset="50%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#ECFDF5" />
          </linearGradient>
          <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
          </filter>
        </defs>
        <rect width="1000" height="440" rx="16" fill="url(#mapBg)" />

        {/* Path lines within stages */}
        {stages.map((stage) => {
          const pts = stage.missions.map((m) => `${m.x},${m.y}`).join(" ");
          return (
            <polyline
              key={stage.id}
              points={pts}
              fill="none"
              stroke={stage.color}
              strokeWidth="3"
              strokeDasharray="8,4"
              opacity="0.35"
            />
          );
        })}

        {/* Connect stages */}
        {stages.slice(1).map((stage, i) => {
          const prev = stages[i];
          const lastPrev = prev.missions[prev.missions.length - 1];
          const firstCurr = stage.missions[0];
          return (
            <line
              key={`conn-${i}`}
              x1={lastPrev.x}
              y1={lastPrev.y}
              x2={firstCurr.x}
              y2={firstCurr.y}
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.5"
            />
          );
        })}

        {/* Stage labels */}
        {stages.map((stage) => {
          const firstM = stage.missions[0];
          return (
            <g key={`label-${stage.id}`}>
              <rect
                x={firstM.x - 60}
                y={firstM.y - 46}
                width="120"
                height="22"
                rx="11"
                fill={stage.color}
                opacity="0.12"
              />
              <text
                x={firstM.x}
                y={firstM.y - 32}
                fill={stage.color}
                fontSize="12"
                fontWeight="700"
                textAnchor="middle"
              >
                Stage {stage.id}: {stage.name}
              </text>
            </g>
          );
        })}

        {/* Mission nodes */}
        {stages.flatMap((stage) =>
          stage.missions.map((m) => (
            <MissionNode
              key={m.id}
              id={m.id}
              x={m.x}
              y={m.y}
              status={getDisplayStatus(m.id, missionProgress)}
              color={stage.color}
              selected={selectedMission === m.id}
              onClick={() => onSelectMission(m.id)}
            />
          )),
        )}
      </svg>
    </div>
  );
}
