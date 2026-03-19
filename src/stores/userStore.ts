import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  DEFAULT_AVATAR_BG_COLOR,
  DEFAULT_AVATAR_EMOJI,
  LS_KEY_USER,
} from "@/lib/utils/constants";

export type UserRole = "student" | "teacher" | "admin";
export type ThemeSetting = "light" | "dark";
export type LanguageSetting = "ko" | "en";

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarEmoji: string;
  avatarBgColor: string;
  role: UserRole;
}

export interface UserSettings {
  theme: ThemeSetting;
  language: LanguageSetting;
  sound: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

interface UserState {
  user: UserProfile | null;
  xp: number;
  level: number;
  coins: number;
  streakDays: number;
  badges: Badge[];
  isAuthenticated: boolean;
  settings: UserSettings;

  // Actions
  setUser: (user: UserProfile) => void;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  addBadge: (badge: Badge) => void;
  updateStreak: (days: number) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  logout: () => void;
}

function computeLevel(xp: number): number {
  // dynamic formula: level = floor(sqrt(xp / 50))
  // Simple but effective; level 1 = 50xp, level 2 = 200xp, etc.
  return Math.max(1, Math.floor(Math.sqrt(xp / 50)) + 1);
}

function loadPersistedUser(): Partial<UserState> {
  try {
    const raw = localStorage.getItem(LS_KEY_USER);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function persistUser(state: Partial<UserState>): void {
  try {
    localStorage.setItem(LS_KEY_USER, JSON.stringify(state));
  } catch {
    // storage full or unavailable
  }
}

const defaultSettings: UserSettings = {
  theme: "light",
  language: "ko",
  sound: true,
};

const defaultProfile: UserProfile = {
  id: "",
  username: "",
  displayName: "",
  avatarEmoji: DEFAULT_AVATAR_EMOJI,
  avatarBgColor: DEFAULT_AVATAR_BG_COLOR,
  role: "student",
};

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => {
      const persisted = loadPersistedUser();

      return {
        user: (persisted.user as UserProfile) ?? null,
        xp: (persisted.xp as number) ?? 0,
        level: (persisted.level as number) ?? 1,
        coins: (persisted.coins as number) ?? 0,
        streakDays: (persisted.streakDays as number) ?? 0,
        badges: (persisted.badges as Badge[]) ?? [],
        isAuthenticated: persisted.user != null,
        settings: {
          ...defaultSettings,
          ...((persisted.settings as Partial<UserSettings>) ?? {}),
        },

        setUser: (user) => {
          const newUser = { ...defaultProfile, ...user };
          set({ user: newUser, isAuthenticated: true });
          persistUser({ ...get(), user: newUser, isAuthenticated: true });
        },

        addXP: (amount) => {
          const newXp = get().xp + amount;
          const newLevel = computeLevel(newXp);
          set({ xp: newXp, level: newLevel });
          persistUser({ ...get(), xp: newXp, level: newLevel });
        },

        addCoins: (amount) => {
          const newCoins = get().coins + amount;
          set({ coins: newCoins });
          persistUser({ ...get(), coins: newCoins });
        },

        addBadge: (badge) => {
          const { badges } = get();
          if (badges.some((b) => b.id === badge.id)) return;
          const newBadges = [...badges, badge];
          set({ badges: newBadges });
          persistUser({ ...get(), badges: newBadges });
        },

        updateStreak: (days) => {
          set({ streakDays: days });
          persistUser({ ...get(), streakDays: days });
        },

        updateSettings: (partial) => {
          const newSettings = { ...get().settings, ...partial };
          set({ settings: newSettings });
          persistUser({ ...get(), settings: newSettings });
        },

        logout: () => {
          set({
            user: null,
            xp: 0,
            level: 1,
            coins: 0,
            streakDays: 0,
            badges: [],
            isAuthenticated: false,
            settings: defaultSettings,
          });
          localStorage.removeItem(LS_KEY_USER);
        },
      };
    },
    { name: "userStore" },
  ),
);
