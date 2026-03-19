"use client";

import { motion } from "framer-motion";
import { Gift, Coins, Zap } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface DailyRewardProps {
  open: boolean;
  onClose: () => void;
  day: number;
  xp: number;
  coins: number;
}

export function DailyReward({
  open,
  onClose,
  day,
  xp,
  coins,
}: DailyRewardProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="text-center py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] mx-auto mb-4 flex items-center justify-center shadow-glow-amber"
        >
          <Gift className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-2xl font-black mb-1">일일 보상!</h2>
        <p className="text-sm text-[var(--text-3)] mb-6">{day}일차 출석 보상</p>

        <div className="flex justify-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[var(--accent)] fill-[var(--accent)]" />
            <span className="font-bold">+{xp} XP</span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[var(--accent)]" />
            <span className="font-bold">+{coins} 코인</span>
          </div>
        </div>

        <Button onClick={onClose} fullWidth>
          받기
        </Button>
      </div>
    </Modal>
  );
}
