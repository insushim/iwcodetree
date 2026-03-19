"use client";

import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: "sm" | "md" | "lg" | "full";
  className?: string;
}

const roundedClasses = {
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  full: "rounded-full",
};

export function Skeleton({
  width,
  height = "1rem",
  rounded = "md",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`
        bg-[var(--border-light)] ${roundedClasses[rounded]}
        bg-[length:200%_100%]
        ${className}
      `}
      style={{
        width: width ?? "100%",
        height,
        backgroundImage:
          "linear-gradient(90deg, var(--border-light) 0%, var(--border) 50%, var(--border-light) 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
}
