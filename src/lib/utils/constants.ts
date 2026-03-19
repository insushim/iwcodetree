// Stage dimensions (Scratch-compatible)
export const STAGE_WIDTH = 480;
export const STAGE_HEIGHT = 360;

// Sprite limits
export const MAX_SPRITES = 20;
export const DEFAULT_SPRITE_SIZE = 100; // percentage
export const MIN_SPRITE_SIZE = 5;
export const MAX_SPRITE_SIZE = 500;

// XP & leveling
export const XP_THRESHOLDS: readonly number[] = [
  0, 100, 250, 500, 850, 1300, 1900, 2600, 3500, 4600, 5900, 7500, 9400, 11700,
  14500, 17800, 21700, 26300, 31700, 38000, 45300,
] as const;

export const XP_PER_MISSION_STAR: Record<number, number> = {
  1: 10,
  2: 25,
  3: 50,
};

// Coins
export const COINS_PER_MISSION = 5;
export const COINS_PER_LEVEL_UP = 20;

// Streak
export const STREAK_BONUS_THRESHOLD = 7; // days for bonus
export const STREAK_BONUS_XP = 50;

// Runtime
export const TARGET_FPS = 30;
export const FRAME_DURATION_MS = 1000 / TARGET_FPS;
export const MAX_CLONE_COUNT = 300;

// Blockly
export const BLOCKLY_GRID_SPACING = 20;
export const BLOCKLY_GRID_LENGTH = 3;
export const BLOCKLY_GRID_SNAP = true;
export const BLOCKLY_ZOOM = {
  controls: true,
  wheel: true,
  startScale: 0.8,
  maxScale: 3,
  minScale: 0.3,
  scaleSpeed: 1.2,
} as const;

// LocalStorage keys
export const LS_KEY_USER = "codeblock_user";
export const LS_KEY_PROJECTS = "codeblock_projects";
export const LS_KEY_SETTINGS = "codeblock_settings";

// Backdrop colors
export const DEFAULT_BACKDROP = "#ffffff";

// Avatar defaults
export const DEFAULT_AVATAR_EMOJI = "🐱";
export const DEFAULT_AVATAR_BG_COLOR = "#7c3aed";
