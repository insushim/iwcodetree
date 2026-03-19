import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type MissionStatus = "locked" | "unlocked" | "in-progress" | "completed";

export interface MissionProgress {
  status: MissionStatus;
  stars: number; // 0-3
  hintsUsed: number;
  timeSpent: number; // seconds
  completedAt?: string;
}

interface MissionState {
  missionProgress: Record<string, MissionProgress>;
  currentMissionId: string | null;

  // Actions
  startMission: (missionId: string) => void;
  completeMission: (
    missionId: string,
    stars: number,
    timeSpent: number,
  ) => void;
  unlockMission: (missionId: string) => void;
  useHint: (missionId: string) => void;
  updateTimeSpent: (missionId: string, seconds: number) => void;
  resetMission: (missionId: string) => void;
  setCurrentMission: (missionId: string | null) => void;
}

function getOrDefault(
  progress: Record<string, MissionProgress>,
  id: string,
): MissionProgress {
  return (
    progress[id] ?? {
      status: "locked",
      stars: 0,
      hintsUsed: 0,
      timeSpent: 0,
    }
  );
}

export const useMissionStore = create<MissionState>()(
  devtools(
    (set, get) => ({
      missionProgress: {},
      currentMissionId: null,

      startMission: (missionId) => {
        const progress = { ...get().missionProgress };
        const current = getOrDefault(progress, missionId);
        progress[missionId] = { ...current, status: "in-progress" };
        set({ missionProgress: progress, currentMissionId: missionId });
      },

      completeMission: (missionId, stars, timeSpent) => {
        const progress = { ...get().missionProgress };
        const current = getOrDefault(progress, missionId);
        progress[missionId] = {
          ...current,
          status: "completed",
          stars: Math.max(current.stars, stars),
          timeSpent,
          completedAt: new Date().toISOString(),
        };
        set({ missionProgress: progress });
      },

      unlockMission: (missionId) => {
        const progress = { ...get().missionProgress };
        const current = getOrDefault(progress, missionId);
        if (current.status === "locked") {
          progress[missionId] = { ...current, status: "unlocked" };
          set({ missionProgress: progress });
        }
      },

      useHint: (missionId) => {
        const progress = { ...get().missionProgress };
        const current = getOrDefault(progress, missionId);
        progress[missionId] = {
          ...current,
          hintsUsed: current.hintsUsed + 1,
        };
        set({ missionProgress: progress });
      },

      updateTimeSpent: (missionId, seconds) => {
        const progress = { ...get().missionProgress };
        const current = getOrDefault(progress, missionId);
        progress[missionId] = { ...current, timeSpent: seconds };
        set({ missionProgress: progress });
      },

      resetMission: (missionId) => {
        const progress = { ...get().missionProgress };
        progress[missionId] = {
          status: "unlocked",
          stars: 0,
          hintsUsed: 0,
          timeSpent: 0,
        };
        set({ missionProgress: progress });
      },

      setCurrentMission: (missionId) => set({ currentMissionId: missionId }),
    }),
    { name: "missionStore" },
  ),
);
