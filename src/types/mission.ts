export interface MissionStep {
  id: string;
  order: number;
  title: string;
  description: string;
  hint?: string;
  requiredBlockType?: string;
  validationFn?: string;
}

export interface CompletionCheck {
  type: "blocks_used" | "sprite_moved" | "custom";
  requiredBlocks?: string[];
  minBlocks?: number;
  customCheck?: string;
}

export interface Mission {
  id: string;
  stageId: number;
  orderInStage: number;
  title: string;
  description: string;
  icon: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  xpReward: number;
  coinReward: number;
  badgeReward?: string;
  category: string;
  concepts: string[];
  mapPosition: { x: number; y: number };
  availableCategories: string[];
  starterSprites: string[];
  starterBackdrop: string;
  steps: MissionStep[];
  hints: [string, string, string];
  completionCheck: CompletionCheck;
}

export interface MissionStage {
  id: number;
  name: string;
  description: string;
  icon: string;
  missions: Mission[];
  requiredXp: number;
}
