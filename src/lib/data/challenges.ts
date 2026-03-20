import type { DailyChallenge, WeeklyChallenge } from "@/types/user";

// ---------------------------------------------------------------------------
// ChallengeSpec – enhanced challenge data for the challenge player
// ---------------------------------------------------------------------------
export interface ChallengeSpec {
  id: string;
  title: string;
  description: string;
  category:
    | "motion"
    | "looks"
    | "sound"
    | "events"
    | "control"
    | "sensing"
    | "operators"
    | "variables"
    | "pen"
    | "myblocks"
    | "mixed";
  difficulty: 1 | 2 | 3 | 4 | 5;
  xpReward: number;
  coinReward: number;
  requiredBlockTypes: string[];
  suggestedBlockTypes?: string[];
  goals: {
    id: string;
    description: string;
    check: "block_used" | "block_count" | "block_connected";
  }[];
  hints: string[];
  toolboxCategories?: string[];
  estimatedMinutes: number;
  tags: string[];
}

// ===========================================================================
// DAILY CHALLENGE SPECS (30)
// ===========================================================================
export const DAILY_SPECS: ChallengeSpec[] = [
  // ── 1-5: 동작 기초 (Motion basics) ──────────────────────────────────────
  {
    id: "ds-1",
    title: "첫 걸음! 앞으로 걷기",
    description:
      "스프라이트를 앞으로 100걸음 움직여 보세요. '이동하기' 블록을 사용하면 스프라이트가 바라보는 방향으로 이동합니다.",
    category: "motion",
    difficulty: 1,
    xpReward: 25,
    coinReward: 5,
    requiredBlockTypes: ["move_steps"],
    suggestedBlockTypes: ["when_flag_clicked"],
    goals: [
      {
        id: "g1",
        description: "'이동하기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "깃발 클릭 이벤트에 연결하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "'이동하기' 블록은 동작 카테고리에 있어요.",
      "숫자를 100으로 바꿔보세요.",
      "초록 깃발을 클릭하면 실행돼요. 이벤트 블록을 맨 위에 놓아보세요!",
    ],
    toolboxCategories: ["motion", "events"],
    estimatedMinutes: 3,
    tags: ["입문", "동작"],
  },
  {
    id: "ds-2",
    title: "빙글빙글 회전하기",
    description:
      "스프라이트를 오른쪽으로 90도, 왼쪽으로 90도 회전시켜 보세요. 회전 블록으로 방향을 바꿀 수 있어요!",
    category: "motion",
    difficulty: 1,
    xpReward: 25,
    coinReward: 5,
    requiredBlockTypes: ["turn_right", "turn_left"],
    suggestedBlockTypes: ["when_flag_clicked", "move_steps"],
    goals: [
      {
        id: "g1",
        description: "'오른쪽으로 돌기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'왼쪽으로 돌기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g3",
        description: "두 블록 모두 이벤트에 연결하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "회전 블록은 동작 카테고리 위쪽에 있어요.",
      "90을 넣으면 직각으로 회전해요.",
      "이동하기와 회전을 번갈아 사용하면 지그재그로 움직여요!",
    ],
    toolboxCategories: ["motion", "events"],
    estimatedMinutes: 3,
    tags: ["입문", "동작", "회전"],
  },
  {
    id: "ds-3",
    title: "원하는 곳으로 순간이동",
    description:
      "스프라이트를 x: 100, y: 50 좌표로 이동시켜 보세요. 좌표를 사용하면 원하는 위치에 정확히 놓을 수 있어요.",
    category: "motion",
    difficulty: 1,
    xpReward: 30,
    coinReward: 5,
    requiredBlockTypes: ["goto_xy"],
    suggestedBlockTypes: ["when_flag_clicked", "set_x", "set_y"],
    goals: [
      {
        id: "g1",
        description: "'x, y로 이동하기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "이벤트 블록에 연결하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "무대의 중앙이 (0, 0)이에요.",
      "x는 왼쪽(-), 오른쪽(+), y는 아래(-), 위(+)예요.",
      "여러 개의 '이동하기' 블록을 순서대로 놓으면 여러 곳을 방문해요!",
    ],
    toolboxCategories: ["motion", "events"],
    estimatedMinutes: 4,
    tags: ["입문", "동작", "좌표"],
  },
  {
    id: "ds-4",
    title: "부드럽게 미끄러지기",
    description:
      "스프라이트가 2초 동안 x: -100, y: 0으로 부드럽게 미끄러지게 하세요. 글라이드 블록을 사용하면 애니메이션처럼 보여요!",
    category: "motion",
    difficulty: 1,
    xpReward: 30,
    coinReward: 5,
    requiredBlockTypes: ["glide_to_xy"],
    suggestedBlockTypes: ["when_flag_clicked", "goto_xy"],
    goals: [
      {
        id: "g1",
        description: "'미끄러지기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "이벤트 블록에 연결하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "글라이드 블록에 초를 입력하면 그 시간 동안 이동해요.",
      "먼저 '이동하기'로 시작 위치를 정하고, 그 다음 '미끄러지기'를 사용해보세요.",
      "여러 '미끄러지기'를 이어 붙이면 경로를 따라 이동해요!",
    ],
    toolboxCategories: ["motion", "events"],
    estimatedMinutes: 4,
    tags: ["입문", "동작", "애니메이션"],
  },
  {
    id: "ds-5",
    title: "벽에 부딪히면 튕기기",
    description:
      "스프라이트가 계속 움직이다가 벽에 닿으면 튕겨나오게 하세요. 무한 반복과 벽 튕기기 블록을 조합해 보세요!",
    category: "motion",
    difficulty: 2,
    xpReward: 40,
    coinReward: 8,
    requiredBlockTypes: ["move_steps", "bounce_on_edge", "forever_loop"],
    suggestedBlockTypes: ["when_flag_clicked", "turn_right"],
    goals: [
      {
        id: "g1",
        description: "'벽에 닿으면 튕기기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'무한 반복' 안에 이동과 튕기기를 넣으세요",
        check: "block_connected",
      },
    ],
    hints: [
      "'무한 반복' 블록 안에 '이동하기'와 '벽에 닿으면 튕기기'를 넣으세요.",
      "방향을 15도 정도 기울여 놓으면 대각선으로 움직여요.",
      "스프라이트가 뒤집히지 않게 하려면 회전 방식을 바꿔보세요!",
    ],
    toolboxCategories: ["motion", "events", "control"],
    estimatedMinutes: 5,
    tags: ["동작", "반복", "물리"],
  },

  // ── 6-10: 형태와 표현 (Looks) ───────────────────────────────────────────
  {
    id: "ds-6",
    title: "말풍선으로 인사하기",
    description:
      "스프라이트가 '안녕하세요!'라고 2초 동안 말하게 하세요. 말하기 블록으로 캐릭터에게 대사를 줄 수 있어요.",
    category: "looks",
    difficulty: 1,
    xpReward: 25,
    coinReward: 5,
    requiredBlockTypes: ["say_for_secs"],
    suggestedBlockTypes: ["when_flag_clicked", "say"],
    goals: [
      {
        id: "g1",
        description: "'말하기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "이벤트 블록에 연결하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "'형태' 카테고리에서 '~ 말하기' 블록을 찾으세요.",
      "텍스트를 '안녕하세요!'로 바꿔보세요.",
      "'생각하기' 블록을 사용하면 생각 풍선이 나와요!",
    ],
    toolboxCategories: ["looks", "events"],
    estimatedMinutes: 3,
    tags: ["입문", "형태", "대화"],
  },
  {
    id: "ds-7",
    title: "코스튬 바꿔 걷기",
    description:
      "코스튬을 반복해서 바꾸면 캐릭터가 걷는 것처럼 보여요! 반복 블록과 '다음 코스튬' 블록을 조합하세요.",
    category: "looks",
    difficulty: 2,
    xpReward: 35,
    coinReward: 8,
    requiredBlockTypes: ["next_costume", "repeat_times"],
    suggestedBlockTypes: ["when_flag_clicked", "wait_secs", "move_steps"],
    goals: [
      {
        id: "g1",
        description: "'다음 코스튬' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "반복 블록 안에서 코스튬을 바꾸세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "'기다리기' 블록으로 속도를 조절하세요",
        check: "block_used",
      },
    ],
    hints: [
      "반복 블록 안에 '다음 코스튬'과 '0.2초 기다리기'를 넣으세요.",
      "기다리기 없이 코스튬을 바꾸면 너무 빨라서 안 보여요!",
      "이동하기 블록도 같이 넣으면 진짜 걷는 것처럼 보여요.",
    ],
    toolboxCategories: ["looks", "events", "control"],
    estimatedMinutes: 5,
    tags: ["형태", "애니메이션", "반복"],
  },
  {
    id: "ds-8",
    title: "크기 변신! 커졌다 작아졌다",
    description:
      "스프라이트의 크기를 바꿔보세요. 크기를 점점 키웠다가 다시 줄이면 숨 쉬는 것처럼 보여요!",
    category: "looks",
    difficulty: 2,
    xpReward: 35,
    coinReward: 8,
    requiredBlockTypes: ["change_size_by", "repeat_times"],
    suggestedBlockTypes: ["when_flag_clicked", "wait_secs", "set_size_to"],
    goals: [
      {
        id: "g1",
        description: "'크기 바꾸기' 블록을 2번 이상 사용하세요",
        check: "block_count",
      },
      { id: "g2", description: "반복 블록을 사용하세요", check: "block_used" },
    ],
    hints: [
      "양수를 넣으면 커지고, 음수를 넣으면 작아져요.",
      "반복 블록으로 10씩 10번 키운 다음, 10씩 10번 줄여보세요.",
      "'크기를 100으로 정하기'로 처음에 원래 크기로 리셋하세요!",
    ],
    toolboxCategories: ["looks", "events", "control"],
    estimatedMinutes: 5,
    tags: ["형태", "크기", "애니메이션"],
  },
  {
    id: "ds-9",
    title: "유령 효과로 사라지기",
    description:
      "색깔, 유령 등 그래픽 효과를 사용해 스프라이트를 서서히 투명하게 만들어 보세요.",
    category: "looks",
    difficulty: 2,
    xpReward: 40,
    coinReward: 8,
    requiredBlockTypes: ["set_effect", "repeat_times"],
    suggestedBlockTypes: ["when_flag_clicked", "wait_secs", "clear_effects"],
    goals: [
      {
        id: "g1",
        description: "'효과 정하기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "반복 블록으로 점점 사라지게 하세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "'효과 지우기' 블록으로 원래대로 돌리세요",
        check: "block_used",
      },
    ],
    hints: [
      "'유령 효과'를 선택하고 숫자를 올리면 투명해져요.",
      "반복 블록 안에서 유령 효과를 5씩 올려보세요.",
      "'그래픽 효과 지우기'로 다시 보이게 할 수 있어요!",
    ],
    toolboxCategories: ["looks", "events", "control"],
    estimatedMinutes: 5,
    tags: ["형태", "효과", "애니메이션"],
  },
  {
    id: "ds-10",
    title: "배경 바꿔 장면 전환하기",
    description:
      "배경을 바꿔서 이야기의 장면을 전환하세요. 스프라이트가 말한 후 다음 배경으로 넘어가 보세요!",
    category: "looks",
    difficulty: 2,
    xpReward: 40,
    coinReward: 8,
    requiredBlockTypes: ["switch_backdrop", "say_for_secs"],
    suggestedBlockTypes: ["when_flag_clicked", "wait_secs", "next_backdrop"],
    goals: [
      {
        id: "g1",
        description: "'배경 바꾸기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'말하기' 블록으로 대사를 추가하세요",
        check: "block_used",
      },
      {
        id: "g3",
        description: "2번 이상 배경을 전환하세요",
        check: "block_count",
      },
    ],
    hints: [
      "배경은 무대(Stage)를 선택하고 코드를 작성하세요.",
      "'배경 바꾸기' 사이에 '기다리기'를 넣으면 자연스러워요.",
      "스프라이트의 '말하기'와 무대의 '배경 바꾸기'를 '방송하기'로 연결해보세요!",
    ],
    toolboxCategories: ["looks", "events", "control"],
    estimatedMinutes: 6,
    tags: ["형태", "배경", "스토리"],
  },

  // ── 11-13: 소리 (Sound) ─────────────────────────────────────────────────
  {
    id: "ds-11",
    title: "소리 넣어 생동감 주기",
    description:
      "스프라이트를 클릭하면 소리가 나도록 하세요. 소리 블록으로 프로젝트에 생동감을 더해보세요!",
    category: "sound",
    difficulty: 1,
    xpReward: 25,
    coinReward: 5,
    requiredBlockTypes: ["play_sound", "when_sprite_clicked"],
    suggestedBlockTypes: ["say_for_secs"],
    goals: [
      {
        id: "g1",
        description: "'소리 재생하기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "스프라이트 클릭 이벤트에 연결하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "'소리' 카테고리에서 '소리 재생하기' 블록을 찾으세요.",
      "'이 스프라이트를 클릭했을 때' 이벤트를 사용하세요.",
      "소리 탭에서 새 소리를 추가할 수 있어요!",
    ],
    toolboxCategories: ["sound", "events"],
    estimatedMinutes: 3,
    tags: ["입문", "소리"],
  },
  {
    id: "ds-12",
    title: "피아노 건반 만들기",
    description:
      "키보드를 누르면 다른 음이 나오는 미니 피아노를 만들어 보세요! '음 연주하기' 블록을 사용하세요.",
    category: "sound",
    difficulty: 2,
    xpReward: 40,
    coinReward: 8,
    requiredBlockTypes: ["play_note", "when_key_pressed"],
    suggestedBlockTypes: ["set_volume"],
    goals: [
      {
        id: "g1",
        description: "'음 연주하기' 블록을 3개 이상 사용하세요",
        check: "block_count",
      },
      {
        id: "g2",
        description: "다른 키에 다른 음을 연결하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "'키를 눌렀을 때' 이벤트를 여러 개 만들고, 각각 다른 키를 지정하세요.",
      "도=60, 레=62, 미=64, 파=65, 솔=67이에요.",
      "A, S, D, F, G 키에 도, 레, 미, 파, 솔을 연결해보세요!",
    ],
    toolboxCategories: ["sound", "events"],
    estimatedMinutes: 7,
    tags: ["소리", "음악", "이벤트"],
  },
  {
    id: "ds-13",
    title: "볼륨 조절기 만들기",
    description:
      "위 화살표를 누르면 볼륨이 올라가고, 아래 화살표를 누르면 볼륨이 내려가는 조절기를 만드세요.",
    category: "sound",
    difficulty: 2,
    xpReward: 35,
    coinReward: 8,
    requiredBlockTypes: ["change_volume", "when_key_pressed"],
    suggestedBlockTypes: ["set_volume", "say_for_secs", "volume_value"],
    goals: [
      {
        id: "g1",
        description: "'볼륨 바꾸기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "위/아래 키에 각각 연결하세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "현재 볼륨을 말풍선으로 보여주세요",
        check: "block_used",
      },
    ],
    hints: [
      "위 화살표 키에 '볼륨을 10만큼 바꾸기', 아래 키에 '-10만큼 바꾸기'를 연결하세요.",
      "'볼륨' 값 블록을 '말하기' 블록에 넣으면 현재 볼륨이 보여요.",
      "볼륨은 0~100 사이에요!",
    ],
    toolboxCategories: ["sound", "events", "looks"],
    estimatedMinutes: 5,
    tags: ["소리", "이벤트", "볼륨"],
  },

  // ── 14-17: 이벤트 (Events) ──────────────────────────────────────────────
  {
    id: "ds-14",
    title: "초록 깃발로 시작!",
    description:
      "초록 깃발을 클릭하면 스프라이트가 인사하고, 앞으로 걸어가는 프로그램을 만드세요.",
    category: "events",
    difficulty: 1,
    xpReward: 25,
    coinReward: 5,
    requiredBlockTypes: ["when_flag_clicked", "say_for_secs", "move_steps"],
    goals: [
      {
        id: "g1",
        description: "'깃발 클릭' 이벤트를 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "말하기와 이동하기를 순서대로 연결하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "'이벤트' 카테고리의 '깃발 클릭했을 때' 블록을 맨 위에 놓으세요.",
      "그 아래에 '안녕! 2초 말하기', 그 아래에 '100걸음 이동하기'를 연결하세요.",
      "블록을 위에서 아래로 순서대로 실행해요!",
    ],
    toolboxCategories: ["events", "looks", "motion"],
    estimatedMinutes: 3,
    tags: ["입문", "이벤트"],
  },
  {
    id: "ds-15",
    title: "키보드로 조종하기",
    description:
      "방향키(위, 아래, 왼쪽, 오른쪽)로 스프라이트를 자유롭게 움직여 보세요!",
    category: "events",
    difficulty: 2,
    xpReward: 40,
    coinReward: 8,
    requiredBlockTypes: ["when_key_pressed", "change_x", "change_y"],
    suggestedBlockTypes: ["point_direction"],
    goals: [
      {
        id: "g1",
        description: "'키를 눌렀을 때' 이벤트를 4개 사용하세요",
        check: "block_count",
      },
      {
        id: "g2",
        description: "각 방향키에 이동을 연결하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "오른쪽 키 → 'x 좌표를 10만큼 바꾸기', 왼쪽 키 → '-10만큼 바꾸기'",
      "위쪽 키 → 'y 좌표를 10만큼 바꾸기', 아래쪽 키 → '-10만큼 바꾸기'",
      "4개의 '키를 눌렀을 때' 블록을 각각 만드세요!",
    ],
    toolboxCategories: ["events", "motion"],
    estimatedMinutes: 6,
    tags: ["이벤트", "키보드", "동작"],
  },
  {
    id: "ds-16",
    title: "방송으로 대화 만들기",
    description:
      "방송하기와 방송 받았을 때 블록으로 두 스프라이트가 대화하는 장면을 만드세요.",
    category: "events",
    difficulty: 2,
    xpReward: 45,
    coinReward: 10,
    requiredBlockTypes: ["broadcast_msg", "when_receive_msg", "say_for_secs"],
    suggestedBlockTypes: ["when_flag_clicked", "wait_secs"],
    goals: [
      {
        id: "g1",
        description: "'방송하기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'방송 받았을 때' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g3",
        description: "두 블록을 올바르게 연결하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "첫 번째 스프라이트: '안녕!' 2초 말하기 → '인사' 방송하기",
      "두 번째 스프라이트: '인사 받았을 때' → '반가워!' 2초 말하기",
      "'방송하고 기다리기'를 사용하면 답변이 끝날 때까지 기다려요!",
    ],
    toolboxCategories: ["events", "looks", "control"],
    estimatedMinutes: 7,
    tags: ["이벤트", "방송", "대화"],
  },
  {
    id: "ds-17",
    title: "배경이 바뀌면 반응하기",
    description:
      "배경이 바뀌었을 때 스프라이트가 다른 동작을 하도록 만들어 보세요. 장면 전환 이벤트를 활용합니다.",
    category: "events",
    difficulty: 2,
    xpReward: 40,
    coinReward: 8,
    requiredBlockTypes: ["when_backdrop_switch", "switch_backdrop"],
    suggestedBlockTypes: ["say_for_secs", "when_flag_clicked", "wait_secs"],
    goals: [
      {
        id: "g1",
        description: "'배경이 바뀌었을 때' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "배경 바꾸기로 장면을 전환하세요",
        check: "block_used",
      },
    ],
    hints: [
      "무대에서 '배경 바꾸기' 블록으로 배경을 전환하세요.",
      "스프라이트에 '배경이 ~(으)로 바뀌었을 때' 이벤트를 추가하세요.",
      "각 배경마다 스프라이트가 다른 말을 하게 만들어 보세요!",
    ],
    toolboxCategories: ["events", "looks"],
    estimatedMinutes: 6,
    tags: ["이벤트", "배경", "장면전환"],
  },

  // ── 18-22: 제어 흐름 (Control) ──────────────────────────────────────────
  {
    id: "ds-18",
    title: "반복! 사각형 그리기",
    description:
      "반복 블록을 사용해서 '이동 → 90도 회전'을 4번 반복해 사각형 경로로 이동하게 하세요.",
    category: "control",
    difficulty: 1,
    xpReward: 30,
    coinReward: 5,
    requiredBlockTypes: ["repeat_times", "move_steps", "turn_right"],
    suggestedBlockTypes: ["when_flag_clicked"],
    goals: [
      {
        id: "g1",
        description: "'반복' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "반복 안에 이동과 회전을 넣으세요",
        check: "block_connected",
      },
    ],
    hints: [
      "사각형은 4번 반복이에요!",
      "반복 안에 '100걸음 이동하기' + '90도 돌기'를 넣으세요.",
      "삼각형은 3번 반복 + 120도, 오각형은 5번 반복 + 72도예요!",
    ],
    toolboxCategories: ["control", "motion", "events"],
    estimatedMinutes: 5,
    tags: ["제어", "반복", "도형"],
  },
  {
    id: "ds-19",
    title: "무한 루프로 계속 움직이기",
    description:
      "무한 반복 블록을 사용해 스프라이트가 멈추지 않고 계속 움직이게 하세요.",
    category: "control",
    difficulty: 1,
    xpReward: 30,
    coinReward: 5,
    requiredBlockTypes: ["forever_loop", "move_steps"],
    suggestedBlockTypes: ["when_flag_clicked", "bounce_on_edge"],
    goals: [
      {
        id: "g1",
        description: "'무한 반복' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "안에 이동 블록을 넣으세요",
        check: "block_connected",
      },
    ],
    hints: [
      "'무한 반복' 블록은 안의 블록을 계속 반복해요.",
      "'벽에 닿으면 튕기기'를 넣으면 화면 밖으로 안 나가요.",
      "초록 깃발을 다시 클릭하거나 빨간 정지를 누르면 멈춰요!",
    ],
    toolboxCategories: ["control", "motion", "events"],
    estimatedMinutes: 4,
    tags: ["제어", "반복", "무한루프"],
  },
  {
    id: "ds-20",
    title: "만약~라면 조건 사용하기",
    description:
      "만약 스프라이트가 벽에 닿으면 방향을 바꾸는 조건문을 만들어 보세요.",
    category: "control",
    difficulty: 2,
    xpReward: 40,
    coinReward: 8,
    requiredBlockTypes: ["if_then", "touching_target"],
    suggestedBlockTypes: [
      "forever_loop",
      "move_steps",
      "turn_right",
      "when_flag_clicked",
    ],
    goals: [
      {
        id: "g1",
        description: "'만약~라면' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'~에 닿았는가?' 블록을 조건에 넣으세요",
        check: "block_connected",
      },
    ],
    hints: [
      "'만약~라면' 블록의 육각형 칸에 조건을 넣어요.",
      "'벽에 닿았는가?' 블록을 감지 카테고리에서 찾으세요.",
      "무한 반복 안에 넣어야 계속 체크해요!",
    ],
    toolboxCategories: ["control", "sensing", "motion", "events"],
    estimatedMinutes: 6,
    tags: ["제어", "조건문", "감지"],
  },
  {
    id: "ds-21",
    title: "만약~아니라면 분기 만들기",
    description:
      "마우스를 클릭하면 고양이가 '야옹' 하고, 안 누르면 '졸려...'라고 하는 프로그램을 만드세요.",
    category: "control",
    difficulty: 2,
    xpReward: 45,
    coinReward: 10,
    requiredBlockTypes: ["if_then_else", "mouse_down_bool", "say"],
    suggestedBlockTypes: ["forever_loop", "when_flag_clicked"],
    goals: [
      {
        id: "g1",
        description: "'만약~아니라면' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'마우스를 클릭했는가?' 조건을 넣으세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "각 분기에 다른 '말하기'를 넣으세요",
        check: "block_count",
      },
    ],
    hints: [
      "'만약~아니라면'은 조건이 참일 때와 거짓일 때 다른 동작을 해요.",
      "감지 카테고리의 '마우스를 클릭했는가?' 블록을 조건에 넣으세요.",
      "무한 반복 안에 넣어야 계속 반응해요!",
    ],
    toolboxCategories: ["control", "sensing", "looks", "events"],
    estimatedMinutes: 6,
    tags: ["제어", "조건문", "분기"],
  },
  {
    id: "ds-22",
    title: "클론으로 눈 내리기",
    description:
      "클론을 사용해 눈송이가 하늘에서 계속 내리는 효과를 만들어 보세요!",
    category: "control",
    difficulty: 3,
    xpReward: 55,
    coinReward: 12,
    requiredBlockTypes: [
      "create_clone_of",
      "when_clone_start",
      "delete_this_clone",
    ],
    suggestedBlockTypes: [
      "forever_loop",
      "when_flag_clicked",
      "wait_secs",
      "change_y",
      "random_from_to",
      "set_x",
      "hide_sprite",
      "show_sprite",
    ],
    goals: [
      {
        id: "g1",
        description: "'나 자신의 클론 만들기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'클론으로 시작했을 때' 이벤트를 사용하세요",
        check: "block_used",
      },
      {
        id: "g3",
        description: "'이 클론 삭제하기'로 정리하세요",
        check: "block_used",
      },
    ],
    hints: [
      "원본은 숨기고, 무한 반복으로 0.3초마다 클론을 만드세요.",
      "클론이 시작되면 무작위 x 위치, 맨 위에서 시작해서 아래로 내려오게 하세요.",
      "y좌표가 -180보다 작아지면 클론을 삭제하세요!",
    ],
    toolboxCategories: ["control", "motion", "events", "operators", "looks"],
    estimatedMinutes: 10,
    tags: ["제어", "클론", "효과"],
  },

  // ── 23-25: 감지 (Sensing) ───────────────────────────────────────────────
  {
    id: "ds-23",
    title: "마우스를 따라오는 스프라이트",
    description:
      "스프라이트가 마우스 포인터의 위치를 따라가게 하세요. 감지 블록으로 마우스 좌표를 읽을 수 있어요!",
    category: "sensing",
    difficulty: 1,
    xpReward: 30,
    coinReward: 5,
    requiredBlockTypes: ["mouse_x_value", "mouse_y_value", "goto_xy"],
    suggestedBlockTypes: ["forever_loop", "when_flag_clicked"],
    goals: [
      {
        id: "g1",
        description: "'마우스 x 좌표'와 'y 좌표' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "무한 반복 안에서 이동하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "'이동하기' 블록의 x에 '마우스 x 좌표', y에 '마우스 y 좌표'를 넣으세요.",
      "무한 반복 안에 넣어야 계속 따라와요.",
      "'미끄러지기'를 대신 사용하면 부드럽게 따라와요!",
    ],
    toolboxCategories: ["sensing", "motion", "control", "events"],
    estimatedMinutes: 5,
    tags: ["감지", "마우스", "동작"],
  },
  {
    id: "ds-24",
    title: "이름을 물어보기",
    description:
      "'묻고 기다리기' 블록으로 이름을 입력받고, '대답' 블록으로 인사하는 프로그램을 만드세요.",
    category: "sensing",
    difficulty: 2,
    xpReward: 40,
    coinReward: 8,
    requiredBlockTypes: [
      "ask_and_wait",
      "answer_value",
      "join_strings",
      "say_for_secs",
    ],
    goals: [
      {
        id: "g1",
        description: "'묻고 기다리기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'대답' 블록을 '말하기'에 넣으세요",
        check: "block_connected",
      },
    ],
    hints: [
      "'묻고 기다리기' 블록에 '이름이 뭐야?'라고 적으세요.",
      "'결합하기' 블록으로 '안녕, ' + '대답'을 합쳐보세요.",
      "합친 결과를 '말하기' 블록에 넣으면 맞춤 인사를 해요!",
    ],
    toolboxCategories: ["sensing", "looks", "operators", "events"],
    estimatedMinutes: 6,
    tags: ["감지", "입력", "문자열"],
  },
  {
    id: "ds-25",
    title: "타이머 활용하기",
    description:
      "타이머를 사용해 3초 안에 스프라이트를 클릭하는 반응 속도 테스트를 만들어 보세요.",
    category: "sensing",
    difficulty: 2,
    xpReward: 45,
    coinReward: 10,
    requiredBlockTypes: ["timer_value", "reset_timer", "when_sprite_clicked"],
    suggestedBlockTypes: [
      "when_flag_clicked",
      "say_for_secs",
      "if_then",
      "compare_lt",
      "random_from_to",
      "goto_xy",
    ],
    goals: [
      {
        id: "g1",
        description: "'타이머' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'타이머 초기화' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g3",
        description: "클릭 이벤트에 결과를 보여주세요",
        check: "block_connected",
      },
    ],
    hints: [
      "깃발 클릭 → 타이머 초기화 → 무작위 위치로 이동",
      "스프라이트 클릭 → '타이머 < 3'이면 '성공!' 말하기",
      "타이머 값을 '말하기' 블록에 넣으면 걸린 시간을 보여줘요!",
    ],
    toolboxCategories: [
      "sensing",
      "events",
      "looks",
      "control",
      "operators",
      "motion",
    ],
    estimatedMinutes: 8,
    tags: ["감지", "타이머", "게임"],
  },

  // ── 26-28: 연산과 변수 (Operators & Variables) ──────────────────────────
  {
    id: "ds-26",
    title: "사칙연산 계산기",
    description:
      "두 수를 입력받아 더하기, 빼기, 곱하기, 나누기 결과를 보여주는 계산기를 만드세요.",
    category: "operators",
    difficulty: 2,
    xpReward: 45,
    coinReward: 10,
    requiredBlockTypes: [
      "math_add",
      "math_subtract",
      "ask_and_wait",
      "answer_value",
      "say_for_secs",
    ],
    suggestedBlockTypes: [
      "math_multiply",
      "math_divide",
      "set_variable",
      "join_strings",
    ],
    goals: [
      {
        id: "g1",
        description: "덧셈, 뺄셈 블록을 각각 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'묻고 기다리기'로 숫자를 입력받으세요",
        check: "block_used",
      },
      {
        id: "g3",
        description: "결과를 말풍선으로 보여주세요",
        check: "block_connected",
      },
    ],
    hints: [
      "첫 번째 '묻기'로 숫자를 받아 변수에 저장하고, 두 번째 '묻기'로 또 받으세요.",
      "'더하기' 블록에 두 변수를 넣으면 합계가 나와요.",
      "'결합하기'로 '답은 ' + 계산결과를 합쳐서 보여주세요!",
    ],
    toolboxCategories: ["operators", "sensing", "looks", "variables", "events"],
    estimatedMinutes: 8,
    tags: ["연산", "입력", "계산기"],
  },
  {
    id: "ds-27",
    title: "점수 카운터 만들기",
    description:
      "변수를 사용해 점수판을 만드세요. 스프라이트를 클릭할 때마다 점수가 1씩 올라갑니다!",
    category: "variables",
    difficulty: 2,
    xpReward: 40,
    coinReward: 8,
    requiredBlockTypes: [
      "set_variable",
      "change_variable",
      "when_sprite_clicked",
    ],
    suggestedBlockTypes: ["when_flag_clicked", "say_for_secs", "variable_get"],
    goals: [
      {
        id: "g1",
        description: "'변수 정하기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'변수 바꾸기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g3",
        description: "스프라이트 클릭에 연결하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "먼저 '점수'라는 변수를 만드세요.",
      "깃발 클릭 → '점수를 0으로 정하기'로 초기화하세요.",
      "스프라이트 클릭 → '점수를 1만큼 바꾸기'!",
    ],
    toolboxCategories: ["variables", "events", "looks"],
    estimatedMinutes: 5,
    tags: ["변수", "카운터", "게임"],
  },
  {
    id: "ds-28",
    title: "랜덤 주사위 굴리기",
    description:
      "스페이스 키를 누르면 1~6 사이의 랜덤 숫자가 나오는 주사위를 만드세요.",
    category: "operators",
    difficulty: 2,
    xpReward: 40,
    coinReward: 8,
    requiredBlockTypes: [
      "random_from_to",
      "set_variable",
      "say_for_secs",
      "when_key_pressed",
    ],
    suggestedBlockTypes: ["switch_costume"],
    goals: [
      {
        id: "g1",
        description: "'랜덤 수' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "결과를 변수에 저장하세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "결과를 말풍선으로 보여주세요",
        check: "block_used",
      },
    ],
    hints: [
      "'1부터 6 사이의 랜덤 수' 블록을 만드세요.",
      "결과를 '주사위' 변수에 저장하면 나중에 활용할 수 있어요.",
      "주사위 눈 모양 코스튬이 있으면 코스튬 번호로도 바꿀 수 있어요!",
    ],
    toolboxCategories: ["operators", "variables", "looks", "events"],
    estimatedMinutes: 5,
    tags: ["연산", "랜덤", "변수"],
  },

  // ── 29-30: 펜 (Pen) ────────────────────────────────────────────────────
  {
    id: "ds-29",
    title: "펜으로 무지개 선 그리기",
    description:
      "펜을 내리고 이동하면 선이 그려져요! 색깔을 바꾸면서 무지개 선을 그려 보세요.",
    category: "pen",
    difficulty: 2,
    xpReward: 40,
    coinReward: 8,
    requiredBlockTypes: ["pen_down", "pen_up", "set_pen_color", "move_steps"],
    suggestedBlockTypes: [
      "pen_clear",
      "when_flag_clicked",
      "repeat_times",
      "turn_right",
      "set_pen_size",
    ],
    goals: [
      {
        id: "g1",
        description: "'펜 내리기'와 '펜 올리기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g2",
        description: "'펜 색깔 정하기' 블록을 사용하세요",
        check: "block_used",
      },
      {
        id: "g3",
        description: "3가지 이상의 색깔로 그리세요",
        check: "block_count",
      },
    ],
    hints: [
      "먼저 '모두 지우기'로 화면을 깨끗이 하세요.",
      "'펜 내리기' → 이동 → '펜 색깔 바꾸기' → 이동을 반복하세요.",
      "펜 굵기를 바꾸면 더 멋진 그림이 돼요!",
    ],
    toolboxCategories: ["pen", "motion", "events", "control"],
    estimatedMinutes: 7,
    tags: ["펜", "그리기", "색깔"],
  },
  {
    id: "ds-30",
    title: "펜으로 별 그리기",
    description:
      "반복 블록과 펜을 사용해 예쁜 별 모양을 그려 보세요! 5번 반복 + 144도 회전이면 별이 돼요.",
    category: "pen",
    difficulty: 2,
    xpReward: 45,
    coinReward: 10,
    requiredBlockTypes: [
      "pen_down",
      "move_steps",
      "turn_right",
      "repeat_times",
    ],
    suggestedBlockTypes: [
      "pen_clear",
      "when_flag_clicked",
      "set_pen_color",
      "set_pen_size",
      "pen_up",
    ],
    goals: [
      {
        id: "g1",
        description: "반복 블록 안에서 펜으로 그리세요",
        check: "block_connected",
      },
      {
        id: "g2",
        description: "'이동하기'와 '회전하기'를 반복에 넣으세요",
        check: "block_connected",
      },
    ],
    hints: [
      "반복 5번: '100걸음 이동하기' + '144도 오른쪽으로 돌기'",
      "144도 = 360 - (180 ÷ 5 × 4) 예요. 별의 마법 숫자!",
      "반복 횟수와 각도를 바꾸면 다른 별 모양이 나와요. 36도로 해보세요!",
    ],
    toolboxCategories: ["pen", "motion", "control", "events"],
    estimatedMinutes: 6,
    tags: ["펜", "그리기", "도형", "반복"],
  },
];

// ===========================================================================
// WEEKLY CHALLENGE SPECS (10)
// ===========================================================================
export const WEEKLY_SPECS: ChallengeSpec[] = [
  {
    id: "ws-1",
    title: "나만의 인사 카드",
    description:
      "생일 축하, 명절 인사, 감사 카드 등 나만의 인사 카드를 만들어 보세요! 배경, 말풍선, 효과, 소리를 모두 활용해서 멋진 카드를 완성하세요.",
    category: "mixed",
    difficulty: 2,
    xpReward: 150,
    coinReward: 35,
    requiredBlockTypes: [
      "when_flag_clicked",
      "say_for_secs",
      "switch_backdrop",
      "play_sound",
    ],
    suggestedBlockTypes: [
      "wait_secs",
      "glide_to_xy",
      "set_effect",
      "change_size_by",
      "next_costume",
      "repeat_times",
    ],
    goals: [
      {
        id: "g1",
        description: "배경을 설정하고 스프라이트가 인사말을 하게 하세요",
        check: "block_connected",
      },
      {
        id: "g2",
        description: "애니메이션 효과를 추가하세요 (크기, 색깔, 이동 등)",
        check: "block_used",
      },
      { id: "g3", description: "소리를 추가하세요", check: "block_used" },
    ],
    hints: [
      "예쁜 배경을 고르고, 캐릭터가 '생일 축하해!' 같은 말을 하게 해보세요.",
      "글라이드로 캐릭터가 등장하는 효과를 만들어 보세요.",
      "색 효과를 반복하면 깜빡이는 파티 효과가 돼요!",
    ],
    toolboxCategories: ["events", "looks", "sound", "motion", "control"],
    estimatedMinutes: 20,
    tags: ["프로젝트", "카드", "창작"],
  },
  {
    id: "ws-2",
    title: "동물 달리기 경주",
    description:
      "2~3마리의 동물이 출발선에서 결승선까지 달리는 경주 게임을 만드세요! 각 동물은 랜덤한 속도로 이동하고, 먼저 도착하면 '우승!' 메시지가 나와요.",
    category: "mixed",
    difficulty: 3,
    xpReward: 200,
    coinReward: 50,
    requiredBlockTypes: [
      "when_flag_clicked",
      "forever_loop",
      "move_steps",
      "random_from_to",
      "if_then",
      "compare_gt",
      "x_position",
      "say",
      "stop_script",
    ],
    suggestedBlockTypes: ["goto_xy", "broadcast_msg", "play_sound"],
    goals: [
      {
        id: "g1",
        description: "2마리 이상의 동물이 랜덤 속도로 달리게 하세요",
        check: "block_count",
      },
      {
        id: "g2",
        description: "결승선(x > 200)에 도착하면 우승 메시지를 표시하세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "깃발 클릭으로 경주를 시작하고, 출발 위치를 초기화하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "각 동물 스프라이트에서: 깃발 클릭 → x:-200, y:설정 → 무한반복(랜덤 1~10 이동)",
      "'x 좌표 > 200' 조건으로 결승선 도착을 체크하세요.",
      "'방송하기'로 우승을 알리고, 다른 스프라이트는 멈추게 해요!",
    ],
    estimatedMinutes: 25,
    tags: ["프로젝트", "게임", "랜덤", "경쟁"],
  },
  {
    id: "ws-3",
    title: "우주 탐험",
    description:
      "우주 배경에서 로켓을 키보드로 조종하고, 별을 모으면서 행성을 탐험하는 프로젝트를 만드세요! 별을 모을 때마다 점수가 올라가요.",
    category: "mixed",
    difficulty: 3,
    xpReward: 220,
    coinReward: 55,
    requiredBlockTypes: [
      "when_key_pressed",
      "change_x",
      "change_y",
      "set_variable",
      "change_variable",
      "if_then",
      "touching_target",
      "forever_loop",
    ],
    suggestedBlockTypes: [
      "when_flag_clicked",
      "goto_xy",
      "random_from_to",
      "play_sound",
      "hide_sprite",
      "create_clone_of",
      "glide_to_xy",
    ],
    goals: [
      {
        id: "g1",
        description: "키보드로 로켓을 4방향 조종하세요",
        check: "block_count",
      },
      {
        id: "g2",
        description: "별에 닿으면 점수를 올리세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "점수 변수를 만들고 화면에 표시하세요",
        check: "block_used",
      },
      {
        id: "g4",
        description: "소리나 효과를 추가하세요",
        check: "block_used",
      },
    ],
    hints: [
      "로켓 스프라이트에 방향키 4개 이벤트를 만들어 x, y 좌표를 바꾸세요.",
      "별 스프라이트에서: 무한반복 → '로켓에 닿았는가?' → 점수+1, 숨기기, 1초 후 무작위 위치로 나타나기",
      "우주 배경을 선택하고, 행성 스프라이트를 추가하면 더 멋져요!",
    ],
    estimatedMinutes: 30,
    tags: ["프로젝트", "게임", "키보드", "변수"],
  },
  {
    id: "ws-4",
    title: "음악 연주기",
    description:
      "화면의 악기 버튼을 클릭하거나 키보드를 눌러 음악을 연주할 수 있는 악기를 만드세요! 드럼, 피아노, 자유 악기 중 골라서 만들어 보세요.",
    category: "mixed",
    difficulty: 3,
    xpReward: 200,
    coinReward: 50,
    requiredBlockTypes: [
      "when_key_pressed",
      "play_note",
      "when_sprite_clicked",
      "play_sound",
      "set_volume",
    ],
    suggestedBlockTypes: [
      "when_flag_clicked",
      "say_for_secs",
      "change_size_by",
      "wait_secs",
      "set_effect",
      "change_volume",
      "repeat_times",
    ],
    goals: [
      {
        id: "g1",
        description: "5개 이상의 키/버튼에 다른 음을 연결하세요",
        check: "block_count",
      },
      {
        id: "g2",
        description:
          "버튼을 누르면 시각 효과도 추가하세요 (크기 변화, 색 변화 등)",
        check: "block_used",
      },
      {
        id: "g3",
        description: "볼륨 조절 기능을 추가하세요",
        check: "block_used",
      },
    ],
    hints: [
      "각 키(1~7)에 도레미파솔라시 음을 연결하세요. 도=60, 레=62, 미=64, 파=65, 솔=67, 라=69, 시=71",
      "악기 스프라이트를 클릭하면 크기가 살짝 커졌다 돌아오게 하면 누른 느낌이 나요.",
      "위/아래 화살표로 볼륨을 조절하고, 현재 볼륨을 표시해보세요!",
    ],
    estimatedMinutes: 25,
    tags: ["프로젝트", "음악", "소리", "인터랙션"],
  },
  {
    id: "ws-5",
    title: "미로 탈출 게임",
    description:
      "미로 배경 위에서 캐릭터를 키보드로 조종해 출구까지 도달하세요! 벽에 닿으면 시작점으로 돌아가고, 출구에 도착하면 클리어!",
    category: "mixed",
    difficulty: 4,
    xpReward: 280,
    coinReward: 65,
    requiredBlockTypes: [
      "when_key_pressed",
      "change_x",
      "change_y",
      "if_then",
      "touching_color",
      "goto_xy",
      "forever_loop",
      "say_for_secs",
      "stop_script",
    ],
    suggestedBlockTypes: [
      "when_flag_clicked",
      "set_variable",
      "change_variable",
      "timer_value",
      "reset_timer",
      "broadcast_msg",
      "play_sound",
    ],
    goals: [
      {
        id: "g1",
        description: "키보드로 캐릭터를 조종하세요",
        check: "block_count",
      },
      {
        id: "g2",
        description: "벽(검은색)에 닿으면 시작점으로 이동하세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "출구(초록색)에 닿으면 클리어 메시지를 보여주세요",
        check: "block_connected",
      },
      {
        id: "g4",
        description: "타이머로 걸린 시간을 표시하세요",
        check: "block_used",
      },
    ],
    hints: [
      "배경에 직접 미로를 그리세요. 벽은 검은색, 출구는 초록색으로!",
      "무한반복 안에서 '검은색에 닿았는가?'와 '초록색에 닿았는가?'를 계속 체크하세요.",
      "캐릭터를 아주 작게 만들면 미로 통과가 더 재미있어요!",
    ],
    estimatedMinutes: 35,
    tags: ["프로젝트", "게임", "미로", "조건문"],
  },
  {
    id: "ws-6",
    title: "캐릭터 꾸미기",
    description:
      "여러 스프라이트(모자, 옷, 안경 등)를 클릭해서 캐릭터를 꾸미는 프로그램을 만드세요! 아이템을 클릭하면 캐릭터에 적용되고, 완성하면 사진처럼 보여줘요.",
    category: "mixed",
    difficulty: 3,
    xpReward: 200,
    coinReward: 50,
    requiredBlockTypes: [
      "when_sprite_clicked",
      "show_sprite",
      "hide_sprite",
      "goto_xy",
      "switch_costume",
      "broadcast_msg",
    ],
    suggestedBlockTypes: [
      "when_flag_clicked",
      "when_receive_msg",
      "say_for_secs",
      "set_effect",
      "play_sound",
      "go_to_layer",
      "next_costume",
    ],
    goals: [
      {
        id: "g1",
        description: "3개 이상의 아이템 스프라이트를 만드세요",
        check: "block_count",
      },
      {
        id: "g2",
        description: "아이템 클릭 시 캐릭터에 표시/숨기기 하세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "'완성' 버튼으로 결과를 보여주세요",
        check: "block_used",
      },
    ],
    hints: [
      "각 아이템은 별도 스프라이트로 만들고, 클릭하면 캐릭터 위치로 이동 + 보이기!",
      "다시 클릭하면 원래 위치로 돌아가는 토글 기능도 좋아요.",
      "'방송하기'로 '완성' 메시지를 보내면, 모든 스프라이트가 반응해요!",
    ],
    estimatedMinutes: 25,
    tags: ["프로젝트", "창작", "인터랙션", "디자인"],
  },
  {
    id: "ws-7",
    title: "수학 퀴즈 게임",
    description:
      "랜덤으로 수학 문제를 내고, 답을 입력하면 맞았는지 알려주는 퀴즈 게임을 만드세요! 10문제를 풀고 최종 점수를 보여주세요.",
    category: "mixed",
    difficulty: 4,
    xpReward: 280,
    coinReward: 65,
    requiredBlockTypes: [
      "set_variable",
      "change_variable",
      "random_from_to",
      "math_add",
      "ask_and_wait",
      "answer_value",
      "if_then_else",
      "compare_eq",
      "repeat_times",
      "join_strings",
      "say_for_secs",
    ],
    suggestedBlockTypes: [
      "when_flag_clicked",
      "math_subtract",
      "math_multiply",
      "play_sound",
      "wait_secs",
    ],
    goals: [
      {
        id: "g1",
        description: "랜덤 수로 문제를 자동 생성하세요",
        check: "block_connected",
      },
      {
        id: "g2",
        description: "답을 입력받아 정답과 비교하세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "10문제 반복 후 최종 점수를 보여주세요",
        check: "block_connected",
      },
      {
        id: "g4",
        description: "맞으면/틀리면 다른 반응을 보여주세요",
        check: "block_used",
      },
    ],
    hints: [
      "변수 3개: '숫자1', '숫자2', '점수'. 각각 랜덤 1~20으로 설정하세요.",
      "'묻기' 블록에 '숫자1 + 숫자2 = ?' 형태로 문제를 보여주세요.",
      "'대답 = 숫자1 + 숫자2'이면 '정답!' + 점수+1, 아니면 '틀렸어요!'",
    ],
    estimatedMinutes: 30,
    tags: ["프로젝트", "게임", "수학", "퀴즈"],
  },
  {
    id: "ws-8",
    title: "펜으로 그림 그리기",
    description:
      "마우스로 자유롭게 그림을 그리는 그리기 도구를 만드세요! 색깔 선택, 펜 굵기 조절, 지우기 기능까지 추가해 보세요.",
    category: "pen",
    difficulty: 3,
    xpReward: 220,
    coinReward: 55,
    requiredBlockTypes: [
      "pen_down",
      "pen_up",
      "pen_clear",
      "set_pen_color",
      "set_pen_size",
      "goto_xy",
      "mouse_x_value",
      "mouse_y_value",
      "forever_loop",
      "if_then_else",
      "mouse_down_bool",
    ],
    suggestedBlockTypes: [
      "when_flag_clicked",
      "when_key_pressed",
      "say_for_secs",
      "hide_sprite",
    ],
    goals: [
      {
        id: "g1",
        description: "마우스를 누르면 그려지고, 떼면 안 그려지게 하세요",
        check: "block_connected",
      },
      {
        id: "g2",
        description: "키보드로 색깔을 바꾸는 기능을 추가하세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "'모두 지우기' 기능을 추가하세요",
        check: "block_used",
      },
    ],
    hints: [
      "무한반복: 마우스 좌표로 이동 → 마우스 클릭이면 펜 내리기, 아니면 펜 올리기",
      "숫자 키(1=빨강, 2=파랑, 3=초록)로 펜 색깔을 바꾸세요.",
      "스페이스 키 → '모두 지우기', 위/아래 키 → 펜 굵기 변경!",
    ],
    estimatedMinutes: 25,
    tags: ["프로젝트", "펜", "그리기", "도구"],
  },
  {
    id: "ws-9",
    title: "미니 RPG 만들기",
    description:
      "캐릭터가 맵을 돌아다니며 아이템을 모으고, 적을 만나면 가위바위보로 싸우는 미니 RPG를 만드세요!",
    category: "mixed",
    difficulty: 5,
    xpReward: 400,
    coinReward: 100,
    requiredBlockTypes: [
      "when_key_pressed",
      "change_x",
      "change_y",
      "set_variable",
      "change_variable",
      "if_then_else",
      "touching_target",
      "random_from_to",
      "compare_eq",
      "ask_and_wait",
      "answer_value",
      "broadcast_msg",
      "when_receive_msg",
      "forever_loop",
      "say_for_secs",
    ],
    suggestedBlockTypes: [
      "when_flag_clicked",
      "goto_xy",
      "hide_sprite",
      "show_sprite",
      "play_sound",
      "stop_script",
      "switch_backdrop",
      "create_clone_of",
      "repeat_times",
      "compare_gt",
      "compare_lt",
      "logic_and",
    ],
    goals: [
      {
        id: "g1",
        description: "키보드로 캐릭터를 조종하고 HP/점수 변수를 관리하세요",
        check: "block_connected",
      },
      {
        id: "g2",
        description:
          "아이템에 닿으면 점수가 오르고, 적에 닿으면 전투가 시작되게 하세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "전투 시스템(가위바위보 등)을 만드세요",
        check: "block_connected",
      },
      {
        id: "g4",
        description: "HP가 0이면 게임 오버를 표시하세요",
        check: "block_connected",
      },
    ],
    hints: [
      "변수: HP(5), 점수(0), 공격력(1). 깃발 클릭 시 모두 초기화!",
      "아이템 스프라이트: 무한반복 → 캐릭터에 닿으면 → 점수+1, 숨기기, 2초 후 랜덤 위치에 나타나기",
      "적 스프라이트에 닿으면 '전투' 방송 → '가위바위보' 묻기 → 랜덤 결과와 비교 → 이기면 점수+3, 지면 HP-1",
    ],
    estimatedMinutes: 45,
    tags: ["프로젝트", "게임", "RPG", "종합"],
  },
  {
    id: "ws-10",
    title: "인터랙티브 동화",
    description:
      "선택지가 있는 인터랙티브 동화를 만드세요! 이야기 중간에 주인공의 행동을 선택하면 다른 결말로 이어집니다. 3개 이상의 장면과 2개 이상의 결말을 만드세요.",
    category: "mixed",
    difficulty: 4,
    xpReward: 300,
    coinReward: 70,
    requiredBlockTypes: [
      "when_flag_clicked",
      "say_for_secs",
      "switch_backdrop",
      "ask_and_wait",
      "answer_value",
      "if_then_else",
      "compare_eq",
      "broadcast_msg",
      "when_receive_msg",
      "wait_secs",
    ],
    suggestedBlockTypes: [
      "play_sound",
      "glide_to_xy",
      "show_sprite",
      "hide_sprite",
      "set_effect",
      "when_backdrop_switch",
      "next_costume",
      "think_for_secs",
    ],
    goals: [
      {
        id: "g1",
        description: "3개 이상의 장면(배경)을 전환하세요",
        check: "block_count",
      },
      {
        id: "g2",
        description: "선택지(묻기)에 따라 이야기가 분기되게 하세요",
        check: "block_connected",
      },
      {
        id: "g3",
        description: "2개 이상의 다른 결말을 만드세요",
        check: "block_count",
      },
      {
        id: "g4",
        description: "캐릭터 대화와 효과를 추가하세요",
        check: "block_used",
      },
    ],
    hints: [
      "이야기 구조: 시작 장면 → 선택1(묻기 '숲으로 갈까요? 바다로 갈까요?') → 분기 → 각 결말",
      "각 장면마다 배경을 바꾸고, '방송하기'로 다음 장면을 시작하세요.",
      "캐릭터가 말하기 → 기다리기 → 배경 전환 순서로 자연스럽게 연결하세요!",
    ],
    estimatedMinutes: 40,
    tags: ["프로젝트", "스토리", "창작", "분기"],
  },
];

// ===========================================================================
// Combined export
// ===========================================================================
export const CHALLENGE_SPECS: ChallengeSpec[] = [
  ...DAILY_SPECS,
  ...WEEKLY_SPECS,
];

// ===========================================================================
// Backward-compatible legacy exports
// ===========================================================================
export const DAILY_CHALLENGES: DailyChallenge[] = DAILY_SPECS.map((s, i) => ({
  id: `dc-${i + 1}`,
  title: s.title,
  description: s.description,
  type: "create" as const,
  difficulty: Math.min(s.difficulty, 3) as 1 | 2 | 3,
  xpReward: s.xpReward,
  coinReward: s.coinReward,
  requirements: s.requiredBlockTypes,
}));

export const WEEKLY_CHALLENGES: WeeklyChallenge[] = WEEKLY_SPECS.map(
  (s, i) => ({
    id: `wc-${i + 1}`,
    title: s.title,
    description: s.description,
    type: "project" as const,
    difficulty: Math.max(s.difficulty, 3) as 3 | 4 | 5,
    xpReward: s.xpReward,
    coinReward: s.coinReward,
    requirements: s.requiredBlockTypes,
    durationDays: 7,
  }),
);
