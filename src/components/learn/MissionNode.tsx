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
  const r = selected ? 20 : 16;

  return (
    <g
      onClick={status !== "locked" ? onClick : undefined}
      style={{ cursor: status !== "locked" ? "pointer" : "default" }}
      className="group"
    >
      <defs>
        <radialGradient id={`nodeGrad-${id}`} cx="30%" cy="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
        <radialGradient id={`completedGrad-${id}`} cx="30%" cy="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
        <filter id={`shadow-${id}`}>
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3" />
        </filter>
        <filter id={`glow-${id}`}>
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Pulsing ring for available missions */}
      {status === "available" && !selected && (
        <circle
          cx={x}
          cy={y}
          r={r + 6}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.4"
        >
          <animate
            attributeName="r"
            values={`${r + 3};${r + 10};${r + 3}`}
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0.1;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Selection glow ring */}
      {selected && (
        <circle cx={x} cy={y} r={r + 8} fill={color} opacity="0.2">
          <animate
            attributeName="r"
            values={`${r + 5};${r + 12};${r + 5}`}
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

      {/* Node background circle with shadow */}
      <circle
        cx={x}
        cy={y}
        r={r + 2}
        fill={
          status === "completed"
            ? `url(#completedGrad-${id})`
            : status === "available"
              ? `url(#nodeGrad-${id})`
              : "rgba(226, 232, 240, 0.8)"
        }
        filter={`url(#shadow-${id})`}
        className="transition-all duration-300 group-hover:scale-110"
      />

      {/* Main node circle */}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={
          status === "completed"
            ? color
            : status === "available"
              ? "#FFFFFF"
              : "#F1F5F9"
        }
        stroke={
          status === "completed"
            ? "rgba(255, 255, 255, 0.4)"
            : status === "available"
              ? color
              : "rgba(148, 163, 184, 0.5)"
        }
        strokeWidth={
          status === "completed" ? 2 : status === "available" ? 3 : 1
        }
        filter={
          status === "completed" || selected ? `url(#glow-${id})` : undefined
        }
        className="transition-all duration-300"
      />

      {/* Completion burst effect */}
      {status === "completed" && (
        <>
          <g opacity="0.6">
            {[...Array(8)].map((_, i) => {
              const angle = i * 45 * (Math.PI / 180);
              const x1 = x + Math.cos(angle) * (r - 3);
              const y1 = y + Math.sin(angle) * (r - 3);
              const x2 = x + Math.cos(angle) * (r + 6);
              const y2 = y + Math.sin(angle) * (r + 6);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
          <circle
            cx={x}
            cy={y}
            r={8}
            fill="rgba(255, 255, 255, 0.9)"
            className="animate-pulse"
          />
          <text
            x={x}
            y={y + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="16"
            fill={color}
            fontWeight="bold"
          >
            ✓
          </text>
        </>
      )}

      {/* Available star with glow */}
      {status === "available" && (
        <>
          <circle
            cx={x}
            cy={y}
            r={8}
            fill={color}
            opacity="0.15"
            className="animate-pulse"
          />
          <text
            x={x}
            y={y + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="14"
            fill={color}
            fontWeight="bold"
            filter="drop-shadow(0 0 3px rgba(0,0,0,0.3))"
          >
            ★
          </text>
        </>
      )}

      {/* Locked state with frosted effect */}
      {status === "locked" && (
        <>
          <circle
            cx={x}
            cy={y}
            r={10}
            fill="rgba(148, 163, 184, 0.2)"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          <text
            x={x}
            y={y + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="12"
            fill="#94A3B8"
            opacity="0.7"
          >
            🔒
          </text>
        </>
      )}
    </g>
  );
}
