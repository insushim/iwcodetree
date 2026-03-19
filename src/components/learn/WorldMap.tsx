"use client";

import { MissionNode } from "./MissionNode";

interface WorldMapProps {
  onSelectMission: (id: string) => void;
  selectedMission: string | null;
}

const stages = [
  {
    id: 1,
    name: "시작의 숲",
    color: "#10B981",
    missions: [
      { id: "m1", x: 80, y: 380, status: "completed" as const },
      { id: "m2", x: 160, y: 340, status: "completed" as const },
      { id: "m3", x: 240, y: 360, status: "completed" as const },
      { id: "m4", x: 320, y: 320, status: "available" as const },
      { id: "m5", x: 400, y: 340, status: "locked" as const },
      { id: "m6", x: 480, y: 300, status: "locked" as const },
    ],
  },
  {
    id: 2,
    name: "반복의 호수",
    color: "#3B82F6",
    missions: [
      { id: "m7", x: 540, y: 260, status: "locked" as const },
      { id: "m8", x: 600, y: 220, status: "locked" as const },
      { id: "m9", x: 660, y: 240, status: "locked" as const },
      { id: "m10", x: 720, y: 200, status: "locked" as const },
      { id: "m11", x: 780, y: 220, status: "locked" as const },
      { id: "m12", x: 840, y: 180, status: "locked" as const },
    ],
  },
  {
    id: 3,
    name: "조건의 산",
    color: "#F59E0B",
    missions: [
      { id: "m13", x: 880, y: 140, status: "locked" as const },
      { id: "m14", x: 820, y: 100, status: "locked" as const },
      { id: "m15", x: 760, y: 80, status: "locked" as const },
      { id: "m16", x: 700, y: 100, status: "locked" as const },
      { id: "m17", x: 640, y: 80, status: "locked" as const },
      { id: "m18", x: 580, y: 60, status: "locked" as const },
    ],
  },
];

export function WorldMap({ onSelectMission, selectedMission }: WorldMapProps) {
  return (
    <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] overflow-hidden">
      <svg
        viewBox="0 0 960 440"
        className="w-full h-auto"
        style={{ minHeight: 300 }}
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#ECFDF5" />
          </linearGradient>
        </defs>
        <rect width="960" height="440" fill="url(#mapBg)" />

        {/* Path lines */}
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
        {stages.length > 1 &&
          stages.slice(1).map((stage, i) => {
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
              {stage.name}
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
