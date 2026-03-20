import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ActiveChallenge {
  startedAt: string;
  blockCount: number;
  usedBlockTypes: string[];
}

interface CompletedChallenge {
  completedAt: string;
  xpEarned: number;
  coinsEarned: number;
  stars: number;
}

const DAILY_TOTAL = 3;

interface ChallengeState {
  activeChallenges: Record<string, ActiveChallenge>;
  completedChallenges: Record<string, CompletedChallenge>;
  dailyCompletedIds: string[];
  weeklyCompletedIds: string[];

  // Actions
  startChallenge: (id: string) => void;
  completeChallenge: (
    id: string,
    xp: number,
    coins: number,
    stars: number,
  ) => void;
  updateProgress: (
    id: string,
    blockCount: number,
    usedBlockTypes: string[],
  ) => void;
  isCompleted: (id: string) => boolean;
  getDailyProgress: () => { completed: number; total: number };
}

export const useChallengeStore = create<ChallengeState>()(
  devtools(
    (set, get) => ({
      activeChallenges: {},
      completedChallenges: {},
      dailyCompletedIds: [],
      weeklyCompletedIds: [],

      startChallenge: (id) => {
        const activeChallenges = { ...get().activeChallenges };
        activeChallenges[id] = {
          startedAt: new Date().toISOString(),
          blockCount: 0,
          usedBlockTypes: [],
        };
        set({ activeChallenges });
      },

      completeChallenge: (id, xp, coins, stars) => {
        const activeChallenges = { ...get().activeChallenges };
        const completedChallenges = { ...get().completedChallenges };
        delete activeChallenges[id];
        completedChallenges[id] = {
          completedAt: new Date().toISOString(),
          xpEarned: xp,
          coinsEarned: coins,
          stars,
        };
        const dailyCompletedIds = get().dailyCompletedIds.includes(id)
          ? get().dailyCompletedIds
          : [...get().dailyCompletedIds, id];
        const weeklyCompletedIds = get().weeklyCompletedIds.includes(id)
          ? get().weeklyCompletedIds
          : [...get().weeklyCompletedIds, id];
        set({
          activeChallenges,
          completedChallenges,
          dailyCompletedIds,
          weeklyCompletedIds,
        });
      },

      updateProgress: (id, blockCount, usedBlockTypes) => {
        const activeChallenges = { ...get().activeChallenges };
        const current = activeChallenges[id];
        if (current) {
          activeChallenges[id] = { ...current, blockCount, usedBlockTypes };
          set({ activeChallenges });
        }
      },

      isCompleted: (id) => {
        return id in get().completedChallenges;
      },

      getDailyProgress: () => {
        return {
          completed: get().dailyCompletedIds.length,
          total: DAILY_TOTAL,
        };
      },
    }),
    { name: "challengeStore" },
  ),
);
