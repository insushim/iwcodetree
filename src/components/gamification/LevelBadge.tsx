"use client";

interface LevelBadgeProps {
  level: number;
  size?: "sm" | "md" | "lg";
}

export function LevelBadge({ level, size = "sm" }: LevelBadgeProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white font-black flex items-center justify-center shadow-sm`}
    >
      {level}
    </div>
  );
}
