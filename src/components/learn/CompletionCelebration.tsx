"use client";

import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { StarRating } from "./StarRating";
import { Zap, Coins, ChevronRight } from "lucide-react";

interface CompletionCelebrationProps {
  open: boolean;
  onClose: () => void;
  missionTitle: string;
  stars: 1 | 2 | 3;
  xp: number;
  coins: number;
}

export function CompletionCelebration({
  open,
  onClose,
  missionTitle,
  stars,
  xp,
  coins,
}: CompletionCelebrationProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="text-center py-4">
        {/* Confetti effect */}
        <div className="relative">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                background: [
                  "var(--primary)",
                  "var(--secondary)",
                  "var(--accent)",
                  "var(--block-looks)",
                ][i % 4],
                left: `${20 + Math.random() * 60}%`,
                top: 0,
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{
                y: 200,
                opacity: 0,
                rotate: 360 + Math.random() * 360,
                x: (Math.random() - 0.5) * 100,
              }}
              transition={{
                duration: 1.5,
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>

        <h2 className="text-2xl font-black mb-2">미션 클리어!</h2>
        <p className="text-[var(--text-2)] mb-4">{missionTitle}</p>

        <div className="mb-6">
          <StarRating stars={stars} size="lg" />
        </div>

        <div className="flex justify-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[var(--accent)] fill-[var(--accent)]" />
            <span className="font-bold text-lg">+{xp} XP</span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[var(--accent)]" />
            <span className="font-bold text-lg">+{coins} 코인</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            다시 도전
          </Button>
          <Button
            className="flex-1"
            onClick={onClose}
            iconRight={<ChevronRight className="w-4 h-4" />}
          >
            다음 미션
          </Button>
        </div>
      </div>
    </Modal>
  );
}
