import type { Mission, MissionStage } from "@/types/mission";
import { stage1Missions } from "./stage1-first-steps";
import { stage2Missions } from "./stage2-loops";
import { stage3Missions } from "./stage3-conditions";
import { stage4Missions } from "./stage4-messages";
import { stage5Missions } from "./stage5-advanced";
import { stage6Missions } from "./stage6-master";

export const ALL_MISSIONS: Mission[] = [
  ...stage1Missions,
  ...stage2Missions,
  ...stage3Missions,
  ...stage4Missions,
  ...stage5Missions,
  ...stage6Missions,
];

export const MISSION_STAGES: MissionStage[] = [
  {
    id: 1,
    name: "첫 걸음",
    description:
      "코딩의 기본을 배워보세요! 스프라이트를 추가하고 움직여 봅시다.",
    icon: "🌱",
    missions: stage1Missions,
    requiredXp: 0,
  },
  {
    id: 2,
    name: "반복의 마법",
    description: "반복 블록으로 효율적인 코드를 만들어 보세요.",
    icon: "🔄",
    missions: stage2Missions,
    requiredXp: 200,
  },
  {
    id: 3,
    name: "조건과 변수",
    description: "조건문과 변수를 사용해 똑똑한 프로그램을 만드세요.",
    icon: "🧠",
    missions: stage3Missions,
    requiredXp: 600,
  },
  {
    id: 4,
    name: "메시지와 함수",
    description: "스프라이트 간 소통과 나만의 블록을 만들어 보세요.",
    icon: "📡",
    missions: stage4Missions,
    requiredXp: 1200,
  },
  {
    id: 5,
    name: "고급 프로젝트",
    description: "리스트, 클론, 물리를 활용한 고급 프로젝트에 도전하세요.",
    icon: "🚀",
    missions: stage5Missions,
    requiredXp: 2000,
  },
  {
    id: 6,
    name: "마스터",
    description: "AI, 알고리즘, 시뮬레이션까지! 코딩 마스터가 되어보세요.",
    icon: "👑",
    missions: stage6Missions,
    requiredXp: 3200,
  },
];

export function getMissionById(id: string): Mission | undefined {
  return ALL_MISSIONS.find((m) => m.id === id);
}

export function getStageById(id: number): MissionStage | undefined {
  return MISSION_STAGES.find((s) => s.id === id);
}

export function getMissionsByStage(stageId: number): Mission[] {
  return ALL_MISSIONS.filter((m) => m.stageId === stageId);
}
