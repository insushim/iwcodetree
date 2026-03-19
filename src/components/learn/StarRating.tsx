"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  stars: 1 | 2 | 3;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-10 h-10",
};

export function StarRating({ stars, size = "md" }: StarRatingProps) {
  return (
    <div className="flex gap-1 justify-center">
      {[1, 2, 3].map((i) => (
        <Star
          key={i}
          className={`${sizeMap[size]} transition-all ${
            i <= stars
              ? "fill-[var(--accent)] text-[var(--accent)] animate-bounce-in"
              : "text-[var(--border)] fill-[var(--border-light)]"
          }`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}
