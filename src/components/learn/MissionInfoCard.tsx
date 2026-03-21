"use client";

import Link from "next/link";
import {
  Star,
  Zap,
  Coins,
  ChevronRight,
  Lock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useMissionStore } from "@/stores/missionStore";

interface MissionInfoCardProps {
  missionId: string;
}

const missionData: Record<
  string,
  {
    title: string;
    desc: string;
    difficulty: number;
    xp: number;
    coins: number;
    concepts: string[];
  }
> = {
  "1-1": {
    title: "안녕, 코드블록!",
    desc: "블록을 끌어다 놓아 고양이를 움직여보자!",
    difficulty: 1,
    xp: 20,
    coins: 10,
    concepts: ["드래그앤드롭", "순차실행"],
  },
  "1-2": {
    title: "빙글빙글 돌아라!",
    desc: "회전 블록으로 고양이를 빙글빙글 돌려보자!",
    difficulty: 1,
    xp: 25,
    coins: 10,
    concepts: ["회전", "각도"],
  },
  "1-3": {
    title: "자기소개를 해봐!",
    desc: "고양이가 말풍선으로 자기소개를 하게 만들자!",
    difficulty: 1,
    xp: 25,
    coins: 10,
    concepts: ["말하기", "기다리기"],
  },
  "1-4": {
    title: "변신! 코스튬 바꾸기!",
    desc: "고양이의 모양을 바꿔서 애니메이션을 만들자!",
    difficulty: 1,
    xp: 30,
    coins: 15,
    concepts: ["코스튬", "모양 변경"],
  },
  "1-5": {
    title: "크기 변신!",
    desc: "스프라이트를 크게 또는 작게 만들어보자!",
    difficulty: 1,
    xp: 30,
    coins: 15,
    concepts: ["크기 변경", "숫자 입력"],
  },
  "1-6": {
    title: "소리를 내자!",
    desc: "고양이에게 소리를 입혀보자!",
    difficulty: 1,
    xp: 35,
    coins: 20,
    concepts: ["사운드", "통합 프로젝트"],
  },
  "2-1": {
    title: "반복 블록의 마법",
    desc: "'~번 반복하기' 블록을 배우자!",
    difficulty: 2,
    xp: 35,
    coins: 15,
    concepts: ["반복문", "반복 횟수"],
  },
  "2-2": {
    title: "무한 반복 댄스 파티!",
    desc: "무한 반복으로 영원히 춤추는 캐릭터!",
    difficulty: 2,
    xp: 40,
    coins: 15,
    concepts: ["무한 반복", "애니메이션"],
  },
  "2-3": {
    title: "벽에서 튕기는 공!",
    desc: "공이 벽에 부딪히면 튕기게 만들자!",
    difficulty: 2,
    xp: 40,
    coins: 15,
    concepts: ["벽 충돌", "무한 반복"],
  },
  "2-4": {
    title: "펜으로 그림 그리기!",
    desc: "펜 블록으로 화면에 그림을 그려보자!",
    difficulty: 2,
    xp: 45,
    coins: 20,
    concepts: ["펜", "도형 그리기"],
  },
  "2-5": {
    title: "나비가 날아다녀!",
    desc: "나비가 화면 안에서 자유롭게 날아다니게!",
    difficulty: 2,
    xp: 45,
    coins: 20,
    concepts: ["애니메이션", "이동+튕기기"],
  },
  "2-6": {
    title: "별 수집 게임!",
    desc: "키보드로 고양이를 움직여 별을 모으자!",
    difficulty: 2,
    xp: 55,
    coins: 25,
    concepts: ["키보드 입력", "미니 게임"],
  },
  "3-1": {
    title: "만약에... 라면?",
    desc: "'만약~라면' 블록으로 조건 행동!",
    difficulty: 2,
    xp: 40,
    coins: 15,
    concepts: ["조건문 if"],
  },
  "3-2": {
    title: "만약... 아니면!",
    desc: "두 가지 행동 중 선택!",
    difficulty: 2,
    xp: 45,
    coins: 15,
    concepts: ["if-else"],
  },
  "3-3": {
    title: "색깔 감지!",
    desc: "특정 색에 닿으면 반응하기!",
    difficulty: 2,
    xp: 50,
    coins: 20,
    concepts: ["색상 감지", "조건"],
  },
  "3-4": {
    title: "미로 탈출 게임!",
    desc: "벽에 닿지 않고 미로를 탈출하자!",
    difficulty: 3,
    xp: 60,
    coins: 25,
    concepts: ["색상 감지", "조건", "키보드"],
  },
  "3-5": {
    title: "퀴즈 만들기!",
    desc: "'묻고 기다리기'로 퀴즈 프로그램!",
    difficulty: 2,
    xp: 50,
    coins: 20,
    concepts: ["입력", "비교 연산"],
  },
  "3-6": {
    title: "가위바위보!",
    desc: "컴퓨터와 가위바위보 게임!",
    difficulty: 3,
    xp: 65,
    coins: 30,
    concepts: ["난수", "조건문 중첩"],
  },
  "4-1": {
    title: "점수를 세자!",
    desc: "'점수' 변수 만들기!",
    difficulty: 2,
    xp: 45,
    coins: 15,
    concepts: ["변수 생성", "값 변경"],
  },
  "4-2": {
    title: "체력 바를 만들자!",
    desc: "체력 변수로 게임 만들기!",
    difficulty: 2,
    xp: 50,
    coins: 20,
    concepts: ["변수 활용", "조건"],
  },
  "4-3": {
    title: "타이머 카운트다운!",
    desc: "남은 시간 표시하기!",
    difficulty: 3,
    xp: 55,
    coins: 20,
    concepts: ["변수 감소", "시간"],
  },
  "4-4": {
    title: "레벨 업 시스템!",
    desc: "점수에 따라 레벨 변경!",
    difficulty: 3,
    xp: 60,
    coins: 25,
    concepts: ["조건+변수"],
  },
  "4-5": {
    title: "대화 시스템!",
    desc: "변수로 대화 진행 관리!",
    difficulty: 2,
    xp: 50,
    coins: 20,
    concepts: ["상태 관리"],
  },
  "4-6": {
    title: "가게 놀이!",
    desc: "사고팔기 게임!",
    difficulty: 3,
    xp: 70,
    coins: 30,
    concepts: ["다중 변수", "연산"],
  },
  "5-1": {
    title: "클론의 습격!",
    desc: "클론으로 적 만들기!",
    difficulty: 3,
    xp: 60,
    coins: 25,
    concepts: ["클론 생성/삭제"],
  },
  "5-2": {
    title: "슈팅 게임!",
    desc: "총알 발사+적 충돌!",
    difficulty: 3,
    xp: 70,
    coins: 30,
    concepts: ["클론", "키입력", "충돌"],
  },
  "5-3": {
    title: "장애물 피하기!",
    desc: "떨어지는 장애물 피하기!",
    difficulty: 3,
    xp: 70,
    coins: 30,
    concepts: ["클론", "변수", "게임로직"],
  },
  "5-4": {
    title: "점프 게임!",
    desc: "중력과 점프 구현!",
    difficulty: 3,
    xp: 75,
    coins: 30,
    concepts: ["중력 시뮬레이션"],
  },
  "5-5": {
    title: "크레이지 팡팡!",
    desc: "풍선 터뜨리기!",
    difficulty: 3,
    xp: 75,
    coins: 30,
    concepts: ["클론", "랜덤", "타이머"],
  },
  "5-6": {
    title: "나만의 RPG!",
    desc: "키보드 이동+적+아이템!",
    difficulty: 3,
    xp: 90,
    coins: 40,
    concepts: ["통합 게임"],
  },
  "6-1": {
    title: "함수로 정리하기!",
    desc: "'내 블록'으로 코드 정리!",
    difficulty: 3,
    xp: 65,
    coins: 25,
    concepts: ["함수 정의"],
  },
  "6-2": {
    title: "메시지로 소통!",
    desc: "스프라이트 간 통신!",
    difficulty: 3,
    xp: 65,
    coins: 25,
    concepts: ["브로드캐스트"],
  },
  "6-3": {
    title: "인터랙티브 그림판!",
    desc: "마우스로 그림 그리기!",
    difficulty: 3,
    xp: 70,
    coins: 30,
    concepts: ["펜", "마우스", "키보드"],
  },
  "6-4": {
    title: "애니메이션 스토리!",
    desc: "장면 전환+대화!",
    difficulty: 3,
    xp: 75,
    coins: 30,
    concepts: ["배경 전환", "메시지"],
  },
  "6-5": {
    title: "코드를 읽자!",
    desc: "버그 찾아 수정하기!",
    difficulty: 3,
    xp: 70,
    coins: 30,
    concepts: ["디버깅"],
  },
  "6-6": {
    title: "자유 프로젝트!",
    desc: "모든 블록으로 자유 창작!",
    difficulty: 3,
    xp: 100,
    coins: 50,
    concepts: ["전체 통합", "창의성"],
  },
};

// Flatten all mission IDs in order
const allMissionIds = [
  "1-1",
  "1-2",
  "1-3",
  "1-4",
  "1-5",
  "1-6",
  "2-1",
  "2-2",
  "2-3",
  "2-4",
  "2-5",
  "2-6",
  "3-1",
  "3-2",
  "3-3",
  "3-4",
  "3-5",
  "3-6",
  "4-1",
  "4-2",
  "4-3",
  "4-4",
  "4-5",
  "4-6",
  "5-1",
  "5-2",
  "5-3",
  "5-4",
  "5-5",
  "5-6",
  "6-1",
  "6-2",
  "6-3",
  "6-4",
  "6-5",
  "6-6",
];

function getDisplayStatus(
  missionId: string,
  missionProgress: Record<string, { status: string }>,
): "completed" | "available" | "locked" {
  const progress = missionProgress[missionId];
  if (progress?.status === "completed") return "completed";
  if (progress?.status === "unlocked" || progress?.status === "in-progress")
    return "available";

  // First mission is always available if no progress exists
  if (missionId === "1-1" && !progress) return "available";

  // Check if previous mission is completed → this one becomes available
  const idx = allMissionIds.indexOf(missionId);
  if (idx > 0) {
    const prevId = allMissionIds[idx - 1];
    const prevProgress = missionProgress[prevId];
    if (prevProgress?.status === "completed") return "available";
  }

  return "locked";
}

export function MissionInfoCard({ missionId }: MissionInfoCardProps) {
  const mission = missionData[missionId];
  const { missionProgress } = useMissionStore();
  const status = getDisplayStatus(missionId, missionProgress);

  if (!mission) {
    return (
      <div
        className="rounded-2xl p-6 text-center relative overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(241, 245, 249, 0.8)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          animation: "fadeIn 0.5s ease-out",
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)",
          }}
        />
        <div className="relative z-10">
          <Lock className="w-8 h-8 mx-auto mb-2" style={{ color: "#94A3B8" }} />
          <h3 className="font-bold">잠긴 미션</h3>
          <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
            이전 미션을 완료하면 열립니다
          </p>
        </div>
      </div>
    );
  }

  // Get stage color based on mission ID
  const stageColors = {
    1: {
      primary: "#10B981",
      light: "#D1FAE5",
      gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    },
    2: {
      primary: "#3B82F6",
      light: "#DBEAFE",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
    },
    3: {
      primary: "#F59E0B",
      light: "#FEF3C7",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    },
    4: {
      primary: "#8B5CF6",
      light: "#EDE9FE",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
    },
    5: {
      primary: "#EF4444",
      light: "#FEE2E2",
      gradient: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
    },
    6: {
      primary: "#D97706",
      light: "#FED7AA",
      gradient: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
    },
  };
  const stage = parseInt(missionId.split("-")[0]) as keyof typeof stageColors;
  const stageColor = stageColors[stage] || stageColors[1];

  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow:
          "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        animation: "slideUp 0.6s ease-out",
      }}
    >
      {/* Gradient Header */}
      <div
        className="relative p-5"
        style={{
          background: stageColor.gradient,
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 transition-all duration-300"
                  style={
                    i < mission.difficulty
                      ? {
                          fill: "#FBBF24",
                          color: "#FBBF24",
                          filter:
                            "drop-shadow(0 0 6px rgba(251, 191, 36, 0.8))",
                          animation: `starShimmer 2s infinite ${i * 0.3}s`,
                        }
                      : { color: "rgba(255, 255, 255, 0.4)" }
                  }
                />
              ))}
            </div>
            {status === "completed" && (
              <CheckCircle
                className="w-6 h-6"
                style={{
                  color: "#FFFFFF",
                  fill: "rgba(16, 185, 129, 0.9)",
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                }}
              />
            )}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">
            {mission.title}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed drop-shadow-sm">
            {mission.desc}
          </p>
        </div>
      </div>

      {/* XP and Coins Section */}
      <div
        className="px-5 py-4 flex items-center gap-6"
        style={{
          borderBottom: "1px solid rgba(241, 245, 249, 0.5)",
          background: "rgba(248, 250, 252, 0.6)",
        }}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
            boxShadow: "0 4px 12px rgba(251, 191, 36, 0.3)",
          }}
        >
          <Zap
            className="w-5 h-5"
            style={{
              color: "#FFFFFF",
              fill: "#FFFFFF",
              filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
            }}
          />
          <span className="text-sm font-bold text-white drop-shadow-sm">
            {mission.xp} XP
          </span>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            boxShadow: "0 4px 12px rgba(217, 119, 6, 0.3)",
          }}
        >
          <Coins
            className="w-5 h-5"
            style={{
              color: "#FFFFFF",
              filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
            }}
          />
          <span className="text-sm font-bold text-white drop-shadow-sm">
            {mission.coins} 코인
          </span>
        </div>
      </div>

      {/* Concepts Section */}
      <div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid rgba(241, 245, 249, 0.5)" }}
      >
        <div
          className="text-xs font-bold mb-3 uppercase tracking-wider"
          style={{ color: "#94A3B8" }}
        >
          학습 개념
        </div>
        <div className="flex gap-2 flex-wrap">
          {mission.concepts.map((concept, index) => (
            <span
              key={concept}
              className="px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${stageColor.light} 0%, rgba(255, 255, 255, 0.8) 100%)`,
                color: stageColor.primary,
                border: `1px solid ${stageColor.primary}20`,
                boxShadow: `0 2px 8px ${stageColor.primary}15`,
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      {/* Action Section */}
      <div className="p-6">
        {status === "locked" ? (
          <div className="text-center py-4">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{
                background: "rgba(203, 213, 225, 0.2)",
                border: "2px dashed #CBD5E1",
              }}
            >
              <Lock className="w-6 h-6" style={{ color: "#94A3B8" }} />
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: "#94A3B8" }}
            >
              이전 미션을 완료하세요
            </span>
          </div>
        ) : status === "completed" ? (
          <Link href={`/learn/${missionId}`}>
            <button
              className="w-full py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                color: "#059669",
                border: "2px solid rgba(16, 185, 129, 0.3)",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
              }}
            >
              <CheckCircle className="w-4 h-4" />
              다시 도전하기
            </button>
          </Link>
        ) : (
          <Link href={`/learn/${missionId}`}>
            <button
              className="w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 relative overflow-hidden group"
              style={{
                background: stageColor.gradient,
                color: "#FFFFFF",
                boxShadow: `0 6px 20px ${stageColor.primary}40`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)",
                  animation: "shimmer 1.5s infinite",
                }}
              />
              <span className="relative z-10">미션 시작</span>
              <ChevronRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes starShimmer {
          0%,
          100% {
            filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(251, 191, 36, 1));
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
