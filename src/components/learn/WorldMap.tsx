"use client";

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
      { id: "1-1", x: 80, y: 380, status: "completed" as const },
      { id: "1-2", x: 160, y: 340, status: "completed" as const },
      { id: "1-3", x: 240, y: 360, status: "completed" as const },
      { id: "1-4", x: 320, y: 320, status: "available" as const },
      { id: "1-5", x: 400, y: 340, status: "locked" as const },
      { id: "1-6", x: 480, y: 300, status: "locked" as const },
    ],
  },
  {
    id: 2,
    name: "반복의 힘",
    color: "#3B82F6",
    missions: [
      { id: "2-1", x: 540, y: 260, status: "locked" as const },
      { id: "2-2", x: 600, y: 220, status: "locked" as const },
      { id: "2-3", x: 660, y: 240, status: "locked" as const },
      { id: "2-4", x: 720, y: 200, status: "locked" as const },
      { id: "2-5", x: 780, y: 220, status: "locked" as const },
      { id: "2-6", x: 840, y: 180, status: "locked" as const },
    ],
  },
  {
    id: 3,
    name: "조건의 세계",
    color: "#F59E0B",
    missions: [
      { id: "3-1", x: 880, y: 140, status: "locked" as const },
      { id: "3-2", x: 820, y: 100, status: "locked" as const },
      { id: "3-3", x: 760, y: 80, status: "locked" as const },
      { id: "3-4", x: 700, y: 100, status: "locked" as const },
      { id: "3-5", x: 640, y: 80, status: "locked" as const },
      { id: "3-6", x: 580, y: 60, status: "locked" as const },
    ],
  },
  {
    id: 4,
    name: "변수의 비밀",
    color: "#8B5CF6",
    missions: [
      { id: "4-1", x: 500, y: 60, status: "locked" as const },
      { id: "4-2", x: 420, y: 80, status: "locked" as const },
      { id: "4-3", x: 340, y: 60, status: "locked" as const },
      { id: "4-4", x: 260, y: 80, status: "locked" as const },
      { id: "4-5", x: 180, y: 60, status: "locked" as const },
      { id: "4-6", x: 100, y: 80, status: "locked" as const },
    ],
  },
  {
    id: 5,
    name: "게임 만들기",
    color: "#EF4444",
    missions: [
      { id: "5-1", x: 80, y: 140, status: "locked" as const },
      { id: "5-2", x: 160, y: 160, status: "locked" as const },
      { id: "5-3", x: 240, y: 140, status: "locked" as const },
      { id: "5-4", x: 320, y: 160, status: "locked" as const },
      { id: "5-5", x: 400, y: 140, status: "locked" as const },
      { id: "5-6", x: 480, y: 160, status: "locked" as const },
    ],
  },
  {
    id: 6,
    name: "마스터",
    color: "#D97706",
    missions: [
      { id: "6-1", x: 540, y: 380, status: "locked" as const },
      { id: "6-2", x: 620, y: 360, status: "locked" as const },
      { id: "6-3", x: 700, y: 380, status: "locked" as const },
      { id: "6-4", x: 780, y: 360, status: "locked" as const },
      { id: "6-5", x: 860, y: 380, status: "locked" as const },
      { id: "6-6", x: 920, y: 340, status: "locked" as const },
    ],
  },
];

export function WorldMap({ onSelectMission, selectedMission }: WorldMapProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#FFFFFF", border: "1px solid #F1F5F9" }}
    >
      <svg
        viewBox="0 0 1000 440"
        className="w-full h-auto"
        style={{ minHeight: 300 }}
      >
        <defs>
          <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#ECFDF5" />
          </linearGradient>
        </defs>
        <rect width="1000" height="440" fill="url(#mapBg)" />

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
              opacity="0.4"
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
            />
          );
        })}

        {/* Stage labels */}
        {stages.map((stage) => {
          const firstM = stage.missions[0];
          return (
            <text
              key={`label-${stage.id}`}
              x={firstM.x}
              y={firstM.y - 30}
              fill={stage.color}
              fontSize="14"
              fontWeight="800"
              textAnchor="middle"
            >
              Stage {stage.id}: {stage.name}
            </text>
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
              status={m.status}
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
