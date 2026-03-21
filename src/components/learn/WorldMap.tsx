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
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow:
          "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)",
      }}
    >
      <svg
        viewBox="0 0 1000 440"
        className="w-full h-auto"
        style={{ minHeight: 340 }}
      >
        <defs>
          <radialGradient id="mapBg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="30%" stopColor="#EEF2FF" />
            <stop offset="60%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#ECFDF5" />
          </radialGradient>
          <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0" />
          </filter>
          <pattern
            id="sparkles"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="30" r="1" fill="rgba(139, 92, 246, 0.3)">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="70" cy="80" r="1.5" fill="rgba(59, 130, 246, 0.4)">
              <animate
                attributeName="opacity"
                values="0.2;0.8;0.2"
                dur="4s"
                repeatCount="indefinite"
                begin="1s"
              />
            </circle>
            <circle cx="40" cy="70" r="0.8" fill="rgba(16, 185, 129, 0.4)">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="2.5s"
                repeatCount="indefinite"
                begin="0.5s"
              />
            </circle>
          </pattern>
        </defs>

        <rect width="1000" height="440" rx="16" fill="url(#mapBg)" />
        <rect
          width="1000"
          height="440"
          rx="16"
          fill="url(#sparkles)"
          opacity="0.7"
        />

        {/* Smooth curved paths within stages */}
        {stages.map((stage) => {
          const missions = stage.missions;
          if (missions.length < 2) return null;

          let pathData = `M ${missions[0].x} ${missions[0].y}`;
          for (let i = 1; i < missions.length; i++) {
            const prev = missions[i - 1];
            const curr = missions[i];
            const controlX = (prev.x + curr.x) / 2;
            const controlY = Math.min(prev.y, curr.y) - 20;
            pathData += ` Q ${controlX} ${controlY} ${curr.x} ${curr.y}`;
          }

          return (
            <g key={stage.id}>
              <path
                d={pathData}
                fill="none"
                stroke={stage.color}
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.6"
                filter="url(#pathGlow)"
              />
              <path
                d={pathData}
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="12,8"
                opacity="0.7"
              />
            </g>
          );
        })}

        {/* Connect stages with curved bridges */}
        {stages.slice(1).map((stage, i) => {
          const prev = stages[i];
          const lastPrev = prev.missions[prev.missions.length - 1];
          const firstCurr = stage.missions[0];
          const midX = (lastPrev.x + firstCurr.x) / 2;
          const midY = (lastPrev.y + firstCurr.y) / 2 - 30;
          const bridgePath = `M ${lastPrev.x} ${lastPrev.y} Q ${midX} ${midY} ${firstCurr.x} ${firstCurr.y}`;

          return (
            <g key={`conn-${i}`}>
              <path
                d={bridgePath}
                fill="none"
                stroke="rgba(203, 213, 225, 0.8)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8,4"
              />
              <path
                d={bridgePath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="4,2"
              />
            </g>
          );
        })}

        {/* Stage labels with modern pill design */}
        {stages.map((stage) => {
          const firstM = stage.missions[0];
          const lastM = stage.missions[stage.missions.length - 1];
          const centerX = (firstM.x + lastM.x) / 2;
          const centerY = Math.min(firstM.y, lastM.y) - 50;

          return (
            <g key={`label-${stage.id}`}>
              <defs>
                <linearGradient
                  id={`labelGrad-${stage.id}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor={stage.color} stopOpacity="0.9" />
                  <stop
                    offset="100%"
                    stopColor={stage.color}
                    stopOpacity="0.7"
                  />
                </linearGradient>
              </defs>
              <rect
                x={centerX - 70}
                y={centerY - 12}
                width="140"
                height="24"
                rx="12"
                fill={`url(#labelGrad-${stage.id})`}
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="1"
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.1))"
              />
              <text
                x={centerX}
                y={centerY + 1}
                fill="white"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
              >
                STAGE {stage.id}: {stage.name.toUpperCase()}
              </text>
              <circle
                cx={centerX - 55}
                cy={centerY}
                r="6"
                fill="rgba(255, 255, 255, 0.3)"
              />
              <text
                x={centerX - 55}
                y={centerY + 1}
                fill="white"
                fontSize="8"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {stage.id}
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
