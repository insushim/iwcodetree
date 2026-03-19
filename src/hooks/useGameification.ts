"use client";

import { useCallback } from "react";
import { useUserStore, type Badge } from "@/stores/userStore";
import {
  XP_THRESHOLDS,
  XP_PER_MISSION_STAR,
  COINS_PER_MISSION,
  COINS_PER_LEVEL_UP,
  STREAK_BONUS_THRESHOLD,
  STREAK_BONUS_XP,
} from "@/lib/utils/constants";
import { generateId } from "@/lib/utils/helpers";

export interface LevelUpResult {
  leveled: boolean;
  previousLevel: number;
  newLevel: number;
  coinsAwarded: number;
}

export function useGameification() {
  const {
    xp,
    level,
    coins,
    streakDays,
    badges,
    addXP,
    addCoins,
    addBadge,
    updateStreak,
  } = useUserStore();

  /** Award XP and detect level-up */
  const awardXP = useCallback(
    (amount: number): LevelUpResult => {
      const previousLevel = level;
      addXP(amount);
      const newLevel = useUserStore.getState().level;
      const leveled = newLevel > previousLevel;
      let coinsAwarded = 0;
      if (leveled) {
        coinsAwarded = COINS_PER_LEVEL_UP * (newLevel - previousLevel);
        addCoins(coinsAwarded);
      }
      return { leveled, previousLevel, newLevel, coinsAwarded };
    },
    [level, addXP, addCoins],
  );

  /** Award XP based on mission stars */
  const awardMissionXP = useCallback(
    (stars: number): LevelUpResult => {
      const xpAmount = XP_PER_MISSION_STAR[stars] ?? 0;
      const result = awardXP(xpAmount);
      addCoins(COINS_PER_MISSION);
      return result;
    },
    [awardXP, addCoins],
  );

  /** Calculate XP progress toward next level */
  const getXPProgress = useCallback((): {
    current: number;
    needed: number;
    percentage: number;
  } => {
    const currentThreshold = XP_THRESHOLDS[level - 1] ?? 0;
    const nextThreshold = XP_THRESHOLDS[level] ?? currentThreshold + 1000;
    const current = xp - currentThreshold;
    const needed = nextThreshold - currentThreshold;
    return {
      current,
      needed,
      percentage: Math.min(100, (current / needed) * 100),
    };
  }, [xp, level]);

  /** Record a login day and update streak */
  const recordLogin = useCallback(() => {
    const lastLogin = localStorage.getItem("codeblock_last_login");
    const today = new Date().toISOString().slice(0, 10);

    if (lastLogin === today) return; // already logged in today

    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .slice(0, 10);
    const newStreak = lastLogin === yesterday ? streakDays + 1 : 1;
    updateStreak(newStreak);
    localStorage.setItem("codeblock_last_login", today);

    // Streak bonus
    if (newStreak > 0 && newStreak % STREAK_BONUS_THRESHOLD === 0) {
      awardXP(STREAK_BONUS_XP);
    }
  }, [streakDays, updateStreak, awardXP]);

  /** Try to earn a badge */
  const tryEarnBadge = useCallback(
    (
      badgeId: string,
      name: string,
      description: string,
      icon: string,
      condition: () => boolean,
    ): boolean => {
      if (badges.some((b) => b.id === badgeId)) return false;
      if (!condition()) return false;

      const badge: Badge = {
        id: badgeId,
        name,
        description,
        icon,
        earnedAt: new Date().toISOString(),
      };
      addBadge(badge);
      return true;
    },
    [badges, addBadge],
  );

  return {
    xp,
    level,
    coins,
    streakDays,
    badges,
    awardXP,
    awardMissionXP,
    getXPProgress,
    recordLogin,
    tryEarnBadge,
  };
}
