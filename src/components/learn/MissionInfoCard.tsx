"use client";

import Link from "next/link";
import { Star, Zap, Coins, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
    status: "locked" | "available" | "completed";
  }
> = {
  "1-1": {
    title: "안녕, 코드블록!",
    desc: "블록을 끌어다 놓아 고양이를 움직여보자!",
    difficulty: 1,
    xp: 20,
    coins: 10,
    concepts: ["드래그앤드롭", "순차실행"],
    status: "completed",
  },
  "1-2": {
    title: "빙글빙글 돌아라!",
    desc: "회전 블록으로 고양이를 빙글빙글 돌려보자!",
    difficulty: 1,
    xp: 25,
    coins: 10,
    concepts: ["회전", "각도"],
    status: "completed",
  },
  "1-3": {
    title: "자기소개를 해봐!",
    desc: "고양이가 말풍선으로 자기소개를 하게 만들자!",
    difficulty: 1,
    xp: 25,
    coins: 10,
    concepts: ["말하기", "기다리기"],
    status: "completed",
  },
  "1-4": {
    title: "변신! 코스튬 바꾸기!",
    desc: "고양이의 모양을 바꿔서 애니메이션을 만들자!",
    difficulty: 1,
    xp: 30,
    coins: 15,
    concepts: ["코스튬", "모양 변경"],
    status: "available",
  },
  "1-5": {
    title: "크기 변신!",
    desc: "스프라이트를 크게 또는 작게 만들어보자!",
    difficulty: 1,
    xp: 30,
    coins: 15,
    concepts: ["크기 변경", "숫자 입력"],
    status: "locked",
  },
  "1-6": {
    title: "소리를 내자!",
    desc: "고양이에게 소리를 입혀보자!",
    difficulty: 1,
    xp: 35,
    coins: 20,
    concepts: ["사운드", "통합 프로젝트"],
    status: "locked",
  },
  "2-1": {
    title: "반복 블록의 마법",
    desc: "'~번 반복하기' 블록을 배우자!",
    difficulty: 2,
    xp: 35,
    coins: 15,
    concepts: ["반복문", "반복 횟수"],
    status: "locked",
  },
  "2-2": {
    title: "무한 반복 댄스 파티!",
    desc: "무한 반복으로 영원히 춤추는 캐릭터!",
    difficulty: 2,
    xp: 40,
    coins: 15,
    concepts: ["무한 반복", "애니메이션"],
    status: "locked",
  },
  "2-3": {
    title: "벽에서 튕기는 공!",
    desc: "공이 벽에 부딪히면 튕기게 만들자!",
    difficulty: 2,
    xp: 40,
    coins: 15,
    concepts: ["벽 충돌", "무한 반복"],
    status: "locked",
  },
  "2-4": {
    title: "펜으로 그림 그리기!",
    desc: "펜 블록으로 화면에 그림을 그려보자!",
    difficulty: 2,
    xp: 45,
    coins: 20,
    concepts: ["펜", "도형 그리기"],
    status: "locked",
  },
  "2-5": {
    title: "나비가 날아다녀!",
    desc: "나비가 화면 안에서 자유롭게 날아다니게!",
    difficulty: 2,
    xp: 45,
    coins: 20,
    concepts: ["애니메이션", "이동+튕기기"],
    status: "locked",
  },
  "2-6": {
    title: "별 수집 게임!",
    desc: "키보드로 고양이를 움직여 별을 모으자!",
    difficulty: 2,
    xp: 55,
    coins: 25,
    concepts: ["키보드 입력", "미니 게임"],
    status: "locked",
  },
  "3-1": {
    title: "만약에... 라면?",
    desc: "'만약~라면' 블록으로 조건 행동!",
    difficulty: 2,
    xp: 40,
    coins: 15,
    concepts: ["조건문 if"],
    status: "locked",
  },
  "3-2": {
    title: "만약... 아니면!",
    desc: "두 가지 행동 중 선택!",
    difficulty: 2,
    xp: 45,
    coins: 15,
    concepts: ["if-else"],
    status: "locked",
  },
  "3-3": {
    title: "색깔 감지!",
    desc: "특정 색에 닿으면 반응하기!",
    difficulty: 2,
    xp: 50,
    coins: 20,
    concepts: ["색상 감지", "조건"],
    status: "locked",
  },
  "3-4": {
    title: "미로 탈출 게임!",
    desc: "벽에 닿지 않고 미로를 탈출하자!",
    difficulty: 3,
    xp: 60,
    coins: 25,
    concepts: ["색상 감지", "조건", "키보드"],
    status: "locked",
  },
  "3-5": {
    title: "퀴즈 만들기!",
    desc: "'묻고 기다리기'로 퀴즈 프로그램!",
    difficulty: 2,
    xp: 50,
    coins: 20,
    concepts: ["입력", "비교 연산"],
    status: "locked",
  },
  "3-6": {
    title: "가위바위보!",
    desc: "컴퓨터와 가위바위보 게임!",
    difficulty: 3,
    xp: 65,
    coins: 30,
    concepts: ["난수", "조건문 중첩"],
    status: "locked",
  },
  "4-1": {
    title: "점수를 세자!",
    desc: "'점수' 변수 만들기!",
    difficulty: 2,
    xp: 45,
    coins: 15,
    concepts: ["변수 생성", "값 변경"],
    status: "locked",
  },
  "4-2": {
    title: "체력 바를 만들자!",
    desc: "체력 변수로 게임 만들기!",
    difficulty: 2,
    xp: 50,
    coins: 20,
    concepts: ["변수 활용", "조건"],
    status: "locked",
  },
  "4-3": {
    title: "타이머 카운트다운!",
    desc: "남은 시간 표시하기!",
    difficulty: 3,
    xp: 55,
    coins: 20,
    concepts: ["변수 감소", "시간"],
    status: "locked",
  },
  "4-4": {
    title: "레벨 업 시스템!",
    desc: "점수에 따라 레벨 변경!",
    difficulty: 3,
    xp: 60,
    coins: 25,
    concepts: ["조건+변수"],
    status: "locked",
  },
  "4-5": {
    title: "대화 시스템!",
    desc: "변수로 대화 진행 관리!",
    difficulty: 2,
    xp: 50,
    coins: 20,
    concepts: ["상태 관리"],
    status: "locked",
  },
  "4-6": {
    title: "가게 놀이!",
    desc: "사고팔기 게임!",
    difficulty: 3,
    xp: 70,
    coins: 30,
    concepts: ["다중 변수", "연산"],
    status: "locked",
  },
  "5-1": {
    title: "클론의 습격!",
    desc: "클론으로 적 만들기!",
    difficulty: 3,
    xp: 60,
    coins: 25,
    concepts: ["클론 생성/삭제"],
    status: "locked",
  },
  "5-2": {
    title: "슈팅 게임!",
    desc: "총알 발사+적 충돌!",
    difficulty: 3,
    xp: 70,
    coins: 30,
    concepts: ["클론", "키입력", "충돌"],
    status: "locked",
  },
  "5-3": {
    title: "장애물 피하기!",
    desc: "떨어지는 장애물 피하기!",
    difficulty: 3,
    xp: 70,
    coins: 30,
    concepts: ["클론", "변수", "게임로직"],
    status: "locked",
  },
  "5-4": {
    title: "점프 게임!",
    desc: "중력과 점프 구현!",
    difficulty: 3,
    xp: 75,
    coins: 30,
    concepts: ["중력 시뮬레이션"],
    status: "locked",
  },
  "5-5": {
    title: "크레이지 팡팡!",
    desc: "풍선 터뜨리기!",
    difficulty: 3,
    xp: 75,
    coins: 30,
    concepts: ["클론", "랜덤", "타이머"],
    status: "locked",
  },
  "5-6": {
    title: "나만의 RPG!",
    desc: "키보드 이동+적+아이템!",
    difficulty: 3,
    xp: 90,
    coins: 40,
    concepts: ["통합 게임"],
    status: "locked",
  },
  "6-1": {
    title: "함수로 정리하기!",
    desc: "'내 블록'으로 코드 정리!",
    difficulty: 3,
    xp: 65,
    coins: 25,
    concepts: ["함수 정의"],
    status: "locked",
  },
  "6-2": {
    title: "메시지로 소통!",
    desc: "스프라이트 간 통신!",
    difficulty: 3,
    xp: 65,
    coins: 25,
    concepts: ["브로드캐스트"],
    status: "locked",
  },
  "6-3": {
    title: "인터랙티브 그림판!",
    desc: "마우스로 그림 그리기!",
    difficulty: 3,
    xp: 70,
    coins: 30,
    concepts: ["펜", "마우스", "키보드"],
    status: "locked",
  },
  "6-4": {
    title: "애니메이션 스토리!",
    desc: "장면 전환+대화!",
    difficulty: 3,
    xp: 75,
    coins: 30,
    concepts: ["배경 전환", "메시지"],
    status: "locked",
  },
  "6-5": {
    title: "코드를 읽자!",
    desc: "버그 찾아 수정하기!",
    difficulty: 3,
    xp: 70,
    coins: 30,
    concepts: ["디버깅"],
    status: "locked",
  },
  "6-6": {
    title: "자유 프로젝트!",
    desc: "모든 블록으로 자유 창작!",
    difficulty: 3,
    xp: 100,
    coins: 50,
    concepts: ["전체 통합", "창의성"],
    status: "locked",
  },
};

export function MissionInfoCard({ missionId }: MissionInfoCardProps) {
  const mission = missionData[missionId];

  if (!mission) {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: "#FFFFFF", border: "1px solid #F1F5F9" }}
      >
        <Lock className="w-8 h-8 mx-auto mb-2" style={{ color: "#94A3B8" }} />
        <h3 className="font-bold">잠긴 미션</h3>
        <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
          이전 미션을 완료하면 열립니다
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#FFFFFF", border: "1px solid #F1F5F9" }}
    >
      <div className="p-5" style={{ borderBottom: "1px solid #F1F5F9" }}>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(3)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4"
              style={
                i < mission.difficulty
                  ? { fill: "#F59E0B", color: "#F59E0B" }
                  : { color: "#E2E8F0" }
              }
            />
          ))}
        </div>
        <h3 className="text-lg font-bold">{mission.title}</h3>
        <p
          className="text-sm mt-1 leading-relaxed"
          style={{ color: "#475569" }}
        >
          {mission.desc}
        </p>
      </div>

      <div
        className="px-5 py-3 flex items-center gap-4"
        style={{ borderBottom: "1px solid #F1F5F9", background: "#F8FAFC" }}
      >
        <div className="flex items-center gap-1.5">
          <Zap
            className="w-4 h-4"
            style={{ color: "#F59E0B", fill: "#F59E0B" }}
          />
          <span className="text-sm font-bold">{mission.xp} XP</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Coins className="w-4 h-4" style={{ color: "#F59E0B" }} />
          <span className="text-sm font-bold">{mission.coins} 코인</span>
        </div>
      </div>

      <div className="px-5 py-3" style={{ borderBottom: "1px solid #F1F5F9" }}>
        <div className="text-xs font-bold mb-2" style={{ color: "#94A3B8" }}>
          학습 개념
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {mission.concepts.map((c) => (
            <span
              key={c}
              className="px-2 py-1 rounded-md text-xs font-bold"
              style={{ background: "#EEF2FF", color: "#6366F1" }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        {mission.status === "locked" ? (
          <div className="text-center py-2">
            <Lock
              className="w-5 h-5 mx-auto mb-1"
              style={{ color: "#CBD5E1" }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: "#94A3B8" }}
            >
              이전 미션을 완료하세요
            </span>
          </div>
        ) : mission.status === "completed" ? (
          <Link href={`/learn/${missionId}`}>
            <Button fullWidth variant="ghost">
              다시 도전하기
            </Button>
          </Link>
        ) : (
          <Link href={`/learn/${missionId}`}>
            <Button fullWidth icon={<ChevronRight className="w-4 h-4" />}>
              미션 시작
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
