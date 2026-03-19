"use client";

interface MissionNodeProps {
  id: string;
  x: number;
  y: number;
  status: "locked" | "available" | "completed";
  color: string;
  selected: boolean;
  onClick: () => void;
}

export function MissionNode({
  id,
  x,
  y,
  status,
  color,
  selected,
  onClick,
}: MissionNodeProps) {
  const r = selected ? 18 : 15;

  return (
    <g
      onClick={status !== "locked" ? onClick : undefined}
      style={{ cursor: status !== "locked" ? "pointer" : "default" }}
    >
      {/* Glow ring for selected */}
      {selected && (
        <circle
          cx={x}
          cy={y}
          r={r + 4}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.3"
        >
          <animate
            attributeName="r"
            values={`${r + 4};${r + 8};${r + 4}`}
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.1;0.3"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Node circle */}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={
          status === "completed"
            ? color
            : status === "available"
              ? "#FFFFFF"
              : "#E2E8F0"
        }
        stroke={status === "available" ? color : "none"}
        strokeWidth={status === "available" ? 3 : 0}
      />

      {/* Icon */}
      {status === "completed" && (
        <text
          x={x}
          y={y + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="14"
          fill="white"
        >
          ✓
        </text>
      )}
      {status === "available" && (
        <text
          x={x}
          y={y + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fill={color}
          fontWeight="bold"
        >
          ★
        </text>
      )}
      {status === "locked" && (
        <text
          x={x}
          y={y + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="11"
          fill="#94A3B8"
        >
          🔒
        </text>
      )}
    </g>
  );
}
