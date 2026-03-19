"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface LikeButtonProps {
  initialLikes: number;
  liked?: boolean;
}

export function LikeButton({
  initialLikes,
  liked: initialLiked = false,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialLikes);

  const toggle = () => {
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border-light)] hover:border-[var(--border)] transition-all"
    >
      <motion.div
        animate={liked ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            liked
              ? "fill-[var(--danger)] text-[var(--danger)]"
              : "text-[var(--text-3)]"
          }`}
        />
      </motion.div>
      <span className="text-sm font-bold">{count}</span>
    </button>
  );
}
