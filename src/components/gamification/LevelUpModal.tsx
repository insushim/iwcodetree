"use client";

import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LevelUpModalProps {
  open: boolean;
  onClose: () => void;
  level: number;
  rewards: string[];
}

export function LevelUpModal({
  open,
  onClose,
  level,
  rewards,
}: LevelUpModalProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="text-center py-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] mx-auto mb-4 flex items-center justify-center shadow-glow-amber"
        >
          <Star className="w-12 h-12 text-white fill-white" />
        </motion.div>

        <motion.h2
          className="text-3xl font-black gradient-text mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          레벨 업!
        </motion.h2>
        <p className="text-[var(--text-2)] mb-6">레벨 {level}이 되었어요!</p>

        {rewards.length > 0 && (
          <div className="bg-[var(--bg-main)] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Gift className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-bold">보상</span>
            </div>
            <div className="space-y-1">
              {rewards.map((r) => (
                <div
                  key={r}
                  className="text-sm text-[var(--text-2)] font-semibold"
                >
                  {r}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button onClick={onClose} fullWidth>
          계속하기
        </Button>
      </div>
    </Modal>
  );
}
