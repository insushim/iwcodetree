export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "milestone" | "skill" | "social" | "special" | "collection";
  rarity: "common" | "rare" | "epic" | "legendary";
  condition: string;
}

export type Achievement = Badge;

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: "create" | "modify" | "debug" | "remix";
  difficulty: 1 | 2 | 3;
  xpReward: number;
  coinReward: number;
  requirements: string[];
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  type: "project" | "contest" | "collaboration";
  difficulty: 3 | 4 | 5;
  xpReward: number;
  coinReward: number;
  requirements: string[];
  durationDays: number;
}

export interface LevelDefinition {
  level: number;
  name: string;
  xpRequired: number;
  totalXp: number;
  rewards: string[];
  unlockedFeatures: string[];
}

export interface SoundDefinition {
  id: string;
  name: string;
  description: string;
  type: "effect" | "music" | "instrument" | "voice";
  category: string;
  durationMs: number;
}

export interface BackdropDefinition {
  id: string;
  name: string;
  category: string;
  svg: string;
  tags: string[];
}

export interface UserProgress {
  level: number;
  xp: number;
  coins: number;
  completedMissions: string[];
  badges: string[];
  currentStreak: number;
  longestStreak: number;
}

export interface UserProfile {
  id: string;
  nickname: string;
  avatarSpriteId: string;
  progress: UserProgress;
  createdAt: string;
  lastActiveAt: string;
}
