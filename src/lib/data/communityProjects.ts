export interface CommunityProject {
  id: string;
  name: string;
  author: string;
  likes: number;
  views: number;
  thumbnail: string;
  description: string;
  code: string;
}

export const COMMUNITY_PROJECTS: CommunityProject[] = [
  {
    id: "c1",
    name: "우주 슈팅 게임",
    author: "코딩왕",
    likes: 42,
    views: 128,
    thumbnail: "🚀",
    description: "방향키로 우주선을 조종하세요! 랜덤으로 점수가 올라갑니다.",
    code: `sprite.emoji = "🚀";
sprite.goto(0, -120);
sprite.setSize(150);
sprite.say('방향키로 움직여보세요!', 2);
{ const _end = performance.now() + 2000; while (performance.now() < _end) { yield; } }
sprite.variables.set('점수', 0);
while (true) {
  if (runtime.stage.isKeyPressed('ArrowLeft')) { sprite.changeX(-8); }
  if (runtime.stage.isKeyPressed('ArrowRight')) { sprite.changeX(8); }
  if (runtime.stage.isKeyPressed('ArrowUp')) { sprite.changeY(8); }
  if (runtime.stage.isKeyPressed('ArrowDown')) { sprite.changeY(-8); }
  sprite.bounceOnEdge();
  if (Math.random() < 0.02) {
    sprite.variables.set('점수', (Number(sprite.variables.get('점수')) || 0) + 10);
    runtime.soundEngine.playSound('ding');
  }
  yield;
}`,
  },
  {
    id: "c2",
    name: "고양이 점프 어드벤처",
    author: "냥냥이",
    likes: 35,
    views: 96,
    thumbnail: "🐱",
    description:
      "스페이스바로 점프! 좌우 방향키로 이동하며 최대 높이를 도전하세요.",
    code: `sprite.emoji = "🐱";
sprite.goto(0, -100);
sprite.setSize(120);
let vy = 0;
let onGround = true;
sprite.variables.set('높이', 0);
sprite.say('스페이스바로 점프!', 2);
{ const _end = performance.now() + 2000; while (performance.now() < _end) { yield; } }
while (true) {
  if (runtime.stage.isKeyPressed(' ') && onGround) {
    vy = 15;
    onGround = false;
    runtime.soundEngine.playSound('boing');
  }
  vy -= 1;
  sprite.changeY(vy);
  if (sprite.y <= -100) {
    sprite.setY(-100);
    vy = 0;
    onGround = true;
  }
  sprite.variables.set('높이', Math.max(0, Math.round(sprite.y + 100)));
  if (runtime.stage.isKeyPressed('ArrowLeft')) sprite.changeX(-5);
  if (runtime.stage.isKeyPressed('ArrowRight')) sprite.changeX(5);
  sprite.bounceOnEdge();
  yield;
}`,
  },
  {
    id: "c3",
    name: "미로 탈출 게임",
    author: "퍼즐마스터",
    likes: 28,
    views: 84,
    thumbnail: "🏃",
    description: "방향키로 이동하여 오른쪽 위의 별까지 도착하세요!",
    code: `sprite.emoji = "🏃";
sprite.goto(-180, -120);
sprite.setSize(100);
sprite.variables.set('이동횟수', 0);
sprite.say('방향키로 오른쪽 위 별까지 이동하세요!', 3);
{ const _end = performance.now() + 3000; while (performance.now() < _end) { yield; } }
while (true) {
  let moved = false;
  if (runtime.stage.isKeyPressed('ArrowUp')) { sprite.changeY(4); moved = true; }
  if (runtime.stage.isKeyPressed('ArrowDown')) { sprite.changeY(-4); moved = true; }
  if (runtime.stage.isKeyPressed('ArrowLeft')) { sprite.changeX(-4); moved = true; }
  if (runtime.stage.isKeyPressed('ArrowRight')) { sprite.changeX(4); moved = true; }
  if (moved) {
    sprite.variables.set('이동횟수', (Number(sprite.variables.get('이동횟수')) || 0) + 1);
  }
  if (sprite.x > 160 && sprite.y > 100) {
    sprite.say('도착! 🎉', 3);
    runtime.soundEngine.playSound('ding');
    { const _end = performance.now() + 3000; while (performance.now() < _end) { yield; } }
    sprite.goto(-180, -120);
    sprite.variables.set('이동횟수', 0);
  }
  sprite.bounceOnEdge();
  yield;
}`,
  },
  {
    id: "c4",
    name: "공룡 달리기",
    author: "디노팬",
    likes: 55,
    views: 200,
    thumbnail: "🦖",
    description: "공룡이 자동으로 달리며 색이 변합니다! 가끔 점프도 해요.",
    code: `sprite.emoji = "🦖";
sprite.setSize(130);
sprite.goto(-180, 0);
sprite.setDirection(90);
sprite.variables.set('거리', 0);
while (true) {
  sprite.move(4);
  sprite.bounceOnEdge();
  sprite.variables.set('거리', (Number(sprite.variables.get('거리')) || 0) + 4);
  sprite.setEffect('color', (Number(sprite.variables.get('거리')) || 0) / 5);
  if (Math.random() < 0.01) {
    runtime.soundEngine.playSound('drum');
    sprite.changeSize(5);
    { const _end = performance.now() + 200; while (performance.now() < _end) { yield; } }
    sprite.changeSize(-5);
  }
  yield;
}`,
  },
  {
    id: "c5",
    name: "바다 속 탐험",
    author: "물고기",
    likes: 19,
    views: 67,
    thumbnail: "🐠",
    description: "마우스를 움직여서 물고기를 조종하세요! 물방울도 나와요.",
    code: `sprite.emoji = "🐠";
sprite.setSize(120);
sprite.say('마우스를 움직여보세요!', 2);
{ const _end = performance.now() + 2000; while (performance.now() < _end) { yield; } }
sprite.variables.set('물고기속도', 5);
while (true) {
  const dx = runtime.stage.mouseX - sprite.x;
  const dy = runtime.stage.mouseY - sprite.y;
  sprite.changeX(dx * 0.08);
  sprite.changeY(dy * 0.08);
  if (dx < 0) sprite.setDirection(-90);
  else sprite.setDirection(90);
  if (Math.random() < 0.03) {
    sprite.say('🫧', 0.5);
    { const _end = performance.now() + 500; while (performance.now() < _end) { yield; } }
  }
  yield;
}`,
  },
  {
    id: "c6",
    name: "음악 만들기",
    author: "DJ쿨",
    likes: 31,
    views: 102,
    thumbnail: "🎵",
    description: "키보드 a~j 키로 도레미파솔라시를 연주하세요!",
    code: `sprite.emoji = "🎵";
sprite.setSize(150);
sprite.say('키보드로 음악을 연주하세요! (a~g)', 3);
{ const _end = performance.now() + 3000; while (performance.now() < _end) { yield; } }
sprite.variables.set('음표수', 0);
const notes = { a: 60, s: 62, d: 64, f: 65, g: 67, h: 69, j: 71 };
const noteNames = { a: '도', s: '레', d: '미', f: '파', g: '솔', h: '라', j: '시' };
const lastKey = { v: '' };
while (true) {
  for (const [key, midi] of Object.entries(notes)) {
    if (runtime.stage.isKeyPressed(key) && lastKey.v !== key) {
      lastKey.v = key;
      runtime.soundEngine.playNote(midi, 0.4);
      sprite.say(noteNames[key] + ' 🎵');
      sprite.variables.set('음표수', (Number(sprite.variables.get('음표수')) || 0) + 1);
      sprite.setEffect('color', midi * 3);
      sprite.changeSize(10);
      { const _end = performance.now() + 100; while (performance.now() < _end) { yield; } }
      sprite.changeSize(-10);
    }
  }
  let anyPressed = false;
  for (const key of Object.keys(notes)) {
    if (runtime.stage.isKeyPressed(key)) anyPressed = true;
  }
  if (!anyPressed) lastKey.v = '';
  yield;
}`,
  },
];
