"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface AchievementToastProps {
  name: string;
  description: string;
  onClose: () => void;
}

export function AchievementToast({
  name,
  description,
  onClose,
}: AchievementToastProps) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed top-4 right-4 z-[60] bg-[var(--bg-card)] border border-[var(--accent)]/30 rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-sm cursor-pointer"
      onClick={onClose}
    >
      <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
        <Award className="w-6 h-6 text-[var(--accent)]" />
      </div>
      <div>
        <div className="text-xs font-bold text-[var(--accent)] mb-0.5">
          뱃지 획득!
        </div>
        <div className="font-bold text-sm">{name}</div>
        <div className="text-xs text-[var(--text-3)]">{description}</div>
      </div>
    </motion.div>
  );
}
