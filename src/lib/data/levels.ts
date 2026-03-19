import type { LevelDefinition } from "@/types/user";

export const LEVELS: LevelDefinition[] = [
  {
    level: 1,
    name: "씨앗",
    xpRequired: 0,
    totalXp: 0,
    rewards: ["cat 스프라이트"],
    unlockedFeatures: ["기본 블록", "동작", "형태"],
  },
  {
    level: 2,
    name: "새싹",
    xpRequired: 200,
    totalXp: 200,
    rewards: ["dog 스프라이트", "sky_blue 배경"],
    unlockedFeatures: ["소리 블록", "이벤트 블록"],
  },
  {
    level: 3,
    name: "풀잎",
    xpRequired: 400,
    totalXp: 600,
    rewards: ["100 코인", "rabbit 스프라이트"],
    unlockedFeatures: ["반복 블록", "펜 블록"],
  },
  {
    level: 4,
    name: "꽃봉오리",
    xpRequired: 600,
    totalXp: 1200,
    rewards: ["200 코인", "wizard 스프라이트"],
    unlockedFeatures: ["조건 블록", "감지 블록"],
  },
  {
    level: 5,
    name: "꽃",
    xpRequired: 800,
    totalXp: 2000,
    rewards: ["300 코인", "robot 스프라이트"],
    unlockedFeatures: ["변수", "메시지 블록"],
  },
  {
    level: 6,
    name: "나무",
    xpRequired: 1000,
    totalXp: 3000,
    rewards: ["400 코인", "ninja 스프라이트"],
    unlockedFeatures: ["클론", "나만의 블록"],
  },
  {
    level: 7,
    name: "숲",
    xpRequired: 1400,
    totalXp: 4400,
    rewards: ["500 코인", "rocket 스프라이트"],
    unlockedFeatures: ["리스트", "고급 연산"],
  },
  {
    level: 8,
    name: "산",
    xpRequired: 1800,
    totalXp: 6200,
    rewards: ["700 코인", "ufo 스프라이트"],
    unlockedFeatures: ["고급 펜", "물리 블록"],
  },
  {
    level: 9,
    name: "하늘",
    xpRequired: 2400,
    totalXp: 8600,
    rewards: ["1000 코인", "전체 스프라이트 잠금해제"],
    unlockedFeatures: ["모든 블록 잠금해제"],
  },
  {
    level: 10,
    name: "우주",
    xpRequired: 3400,
    totalXp: 12000,
    rewards: ["2000 코인", "마스터 뱃지", "프로필 테두리"],
    unlockedFeatures: ["프로젝트 공유", "코드 내보내기"],
  },
];

export function getLevelForXp(totalXp: number): LevelDefinition {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVELS[i].totalXp) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getXpProgress(totalXp: number): {
  current: number;
  needed: number;
  percent: number;
} {
  const level = getLevelForXp(totalXp);
  const nextLevel = LEVELS[level.level] ?? level;
  const current = totalXp - level.totalXp;
  const needed = nextLevel.xpRequired;
  return {
    current,
    needed,
    percent: needed > 0 ? Math.min(100, (current / needed) * 100) : 100,
  };
}
