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
    description:
      "방향키로 우주선을 조종하고 스페이스바로 총알을 발사하세요! 외계인을 피하면서 점수를 올리세요.",
    code: `sprite.emoji = "🚀";
runtime.bgColor = "#0a0a2e";
sprite.goto(0, -140);
sprite.setSize(120);
sprite.variables.set('점수', 0);
sprite.variables.set('체력', 3);
sprite.say('방향키 이동, 스페이스 발사!', 2);
{ const _end = performance.now() + 2000; while (performance.now() < _end) { yield; } }

// Spawn initial stars
for (let i = 0; i < 30; i++) {
  runtime.gameObjects.push({
    id: 'star' + i, emoji: '✦', size: 20 + Math.random() * 20,
    x: Math.random() * 440 - 220, y: Math.random() * 340 - 170
  });
}

let bullets = [];
let enemies = [];
let lastShot = 0;
let frame = 0;

while (true) {
  frame++;
  // Move player
  if (runtime.stage.isKeyPressed('ArrowLeft')) sprite.changeX(-7);
  if (runtime.stage.isKeyPressed('ArrowRight')) sprite.changeX(7);
  if (runtime.stage.isKeyPressed('ArrowUp')) sprite.changeY(5);
  if (runtime.stage.isKeyPressed('ArrowDown')) sprite.changeY(-5);
  // Clamp
  if (sprite.x < -220) sprite.setX(-220);
  if (sprite.x > 220) sprite.setX(220);
  if (sprite.y < -170) sprite.setY(-170);
  if (sprite.y > 170) sprite.setY(170);

  // Shoot
  if (runtime.stage.isKeyPressed(' ') && performance.now() - lastShot > 250) {
    lastShot = performance.now();
    const bid = 'b' + frame;
    runtime.gameObjects.push({ id: bid, emoji: '⚡', x: sprite.x, y: sprite.y + 25, size: 60 });
    bullets.push(bid);
    runtime.soundEngine.playSound('click');
  }

  // Move bullets up
  for (const bid of bullets) {
    const b = runtime.gameObjects.find(o => o.id === bid);
    if (b) b.y += 12;
  }
  // Remove offscreen bullets
  bullets = bullets.filter(bid => {
    const b = runtime.gameObjects.find(o => o.id === bid);
    if (b && b.y > 200) { runtime.gameObjects.splice(runtime.gameObjects.indexOf(b), 1); return false; }
    return !!b;
  });

  // Spawn enemies
  if (frame % 20 === 0) {
    const eid = 'e' + frame;
    const emojiList = ['👾', '👽', '🛸'];
    runtime.gameObjects.push({
      id: eid, emoji: emojiList[Math.floor(Math.random() * 3)],
      x: Math.random() * 400 - 200, y: 190, size: 80
    });
    enemies.push(eid);
  }

  // Move enemies down
  for (const eid of enemies) {
    const e = runtime.gameObjects.find(o => o.id === eid);
    if (e) e.y -= 2.5;
  }

  // Check bullet-enemy collisions
  for (const bid of [...bullets]) {
    const b = runtime.gameObjects.find(o => o.id === bid);
    if (!b) continue;
    for (const eid of [...enemies]) {
      const e = runtime.gameObjects.find(o => o.id === eid);
      if (!e) continue;
      if (Math.abs(b.x - e.x) < 30 && Math.abs(b.y - e.y) < 30) {
        // Hit!
        runtime.gameObjects.splice(runtime.gameObjects.indexOf(b), 1);
        runtime.gameObjects.splice(runtime.gameObjects.indexOf(e), 1);
        bullets = bullets.filter(id => id !== bid);
        enemies = enemies.filter(id => id !== eid);
        sprite.variables.set('점수', (Number(sprite.variables.get('점수')) || 0) + 10);
        runtime.soundEngine.playSound('pop');
        // Explosion
        const xid = 'x' + frame + eid;
        runtime.gameObjects.push({ id: xid, emoji: '💥', x: e.x, y: e.y, size: 100 });
        setTimeout(() => {
          const xi = runtime.gameObjects.findIndex(o => o.id === xid);
          if (xi >= 0) runtime.gameObjects.splice(xi, 1);
        }, 300);
        break;
      }
    }
  }

  // Remove offscreen enemies + check player collision
  enemies = enemies.filter(eid => {
    const e = runtime.gameObjects.find(o => o.id === eid);
    if (!e) return false;
    if (e.y < -190) { runtime.gameObjects.splice(runtime.gameObjects.indexOf(e), 1); return false; }
    // Hit player?
    if (Math.abs(e.x - sprite.x) < 30 && Math.abs(e.y - sprite.y) < 30) {
      runtime.gameObjects.splice(runtime.gameObjects.indexOf(e), 1);
      sprite.variables.set('체력', (Number(sprite.variables.get('체력')) || 0) - 1);
      runtime.soundEngine.playSound('buzz');
      if (Number(sprite.variables.get('체력')) <= 0) {
        sprite.say('게임 오버! 점수: ' + sprite.variables.get('점수'));
      }
      return false;
    }
    return true;
  });

  // Scroll stars
  for (const s of runtime.gameObjects.filter(o => o.id.startsWith('star'))) {
    s.y -= 0.5;
    if (s.y < -180) s.y = 180;
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
    description: "스페이스바로 점프하며 코인을 모으세요! 구름 위를 달려보세요.",
    code: `sprite.emoji = "🐱";
runtime.bgColor = "#87CEEB";
sprite.goto(-150, -80);
sprite.setSize(100);
sprite.variables.set('코인', 0);
sprite.variables.set('높이', 0);

// Ground
runtime.gameObjects.push({ id: 'ground', emoji: '', x: 0, y: -160, size: 100 });

// Create platforms
const platforms = [];
for (let i = 0; i < 6; i++) {
  const pid = 'plat' + i;
  runtime.gameObjects.push({
    id: pid, emoji: '☁️', x: -180 + i * 80, y: -100 + Math.random() * 50, size: 100
  });
  platforms.push(pid);
}

// Create coins
for (let i = 0; i < 5; i++) {
  const cid = 'coin' + i;
  runtime.gameObjects.push({
    id: cid, emoji: '⭐', x: -140 + i * 80, y: -40 + Math.random() * 80, size: 60
  });
}

// Sun & clouds decoration
runtime.gameObjects.push({ id: 'sun', emoji: '☀️', x: 180, y: 150, size: 120 });
runtime.gameObjects.push({ id: 'deco1', emoji: '🌤️', x: -150, y: 140, size: 80 });

let vy = 0;
let onGround = false;
sprite.say('스페이스바로 점프! ⭐을 모아요!', 2);
{ const _end = performance.now() + 2000; while (performance.now() < _end) { yield; } }

while (true) {
  // Gravity
  vy -= 0.8;
  sprite.changeY(vy);

  // Ground collision
  if (sprite.y <= -120) {
    sprite.setY(-120);
    vy = 0;
    onGround = true;
  }

  // Platform collision (landing on top)
  onGround = sprite.y <= -120;
  for (const pid of platforms) {
    const p = runtime.gameObjects.find(o => o.id === pid);
    if (!p) continue;
    if (vy <= 0 && Math.abs(sprite.x - p.x) < 35 && sprite.y >= p.y - 5 && sprite.y <= p.y + 15) {
      sprite.setY(p.y + 10);
      vy = 0;
      onGround = true;
    }
  }

  // Jump
  if (runtime.stage.isKeyPressed(' ') && onGround) {
    vy = 12;
    onGround = false;
    runtime.soundEngine.playSound('boing');
  }

  // Move
  if (runtime.stage.isKeyPressed('ArrowLeft')) sprite.changeX(-5);
  if (runtime.stage.isKeyPressed('ArrowRight')) sprite.changeX(5);
  if (sprite.x < -230) sprite.setX(-230);
  if (sprite.x > 230) sprite.setX(230);

  // Coin collection
  for (let i = 0; i < 5; i++) {
    const c = runtime.gameObjects.find(o => o.id === 'coin' + i);
    if (c && c.visible !== false && Math.abs(sprite.x - c.x) < 25 && Math.abs(sprite.y - c.y) < 25) {
      c.visible = false;
      sprite.variables.set('코인', (Number(sprite.variables.get('코인')) || 0) + 1);
      runtime.soundEngine.playSound('ding');
      if (Number(sprite.variables.get('코인')) >= 5) {
        sprite.say('모든 코인 수집! 🎉');
        runtime.soundEngine.playSound('ding');
      }
    }
  }

  sprite.variables.set('높이', Math.max(0, Math.round(sprite.y + 120)));
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
    description: "벽을 피해서 ⭐ 별까지 이동하세요! 벽에 닿으면 처음으로!",
    code: `sprite.emoji = "🏃";
runtime.bgColor = "#2d2d44";
sprite.goto(-200, -140);
sprite.setSize(80);
sprite.variables.set('도전', 1);
sprite.variables.set('시간', 0);

// Build maze walls
const walls = [
  [-120,-140,20,280], [-60,-140,20,200], [0,-80,20,220], [60,-140,20,180],
  [120,-140,20,260], [-180,-20,140,20], [-60,60,140,20], [60,-60,100,20],
  [120,80,120,20], [-180,120,200,20],
];
for (let i = 0; i < walls.length; i++) {
  const [wx, wy, ww, wh] = walls[i];
  // Draw wall segments as brick emojis
  const cols = Math.ceil(ww / 25);
  const rows = Math.ceil(wh / 25);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      runtime.gameObjects.push({
        id: 'w' + i + '_' + r + '_' + c, emoji: '🧱',
        x: wx + c * 25, y: wy + r * 25, size: 55
      });
    }
  }
}

// Goal
runtime.gameObjects.push({ id: 'goal', emoji: '⭐', x: 200, y: 140, size: 100 });

// Timer
let startTime = performance.now();

sprite.say('⭐까지 이동하세요! 🧱 조심!', 2);
{ const _end = performance.now() + 2000; while (performance.now() < _end) { yield; } }
startTime = performance.now();

while (true) {
  const speed = 3;
  const oldX = sprite.x, oldY = sprite.y;
  if (runtime.stage.isKeyPressed('ArrowUp')) sprite.changeY(speed);
  if (runtime.stage.isKeyPressed('ArrowDown')) sprite.changeY(-speed);
  if (runtime.stage.isKeyPressed('ArrowLeft')) sprite.changeX(-speed);
  if (runtime.stage.isKeyPressed('ArrowRight')) sprite.changeX(speed);

  // Wall collision - check against wall rects
  for (const [wx, wy, ww, wh] of walls) {
    if (sprite.x > wx - 12 && sprite.x < wx + ww + 12 &&
        sprite.y > wy - 12 && sprite.y < wy + wh + 12) {
      sprite.goto(-200, -140);
      runtime.soundEngine.playSound('buzz');
      startTime = performance.now();
      break;
    }
  }

  // Goal check
  if (Math.abs(sprite.x - 200) < 20 && Math.abs(sprite.y - 140) < 20) {
    const elapsed = Math.round((performance.now() - startTime) / 1000);
    sprite.say('클리어! ' + elapsed + '초! 🎉', 3);
    runtime.soundEngine.playSound('ding');
    { const _end = performance.now() + 3000; while (performance.now() < _end) { yield; } }
    sprite.goto(-200, -140);
    sprite.variables.set('도전', (Number(sprite.variables.get('도전')) || 0) + 1);
    startTime = performance.now();
  }

  // Bounds
  if (sprite.x < -230) sprite.setX(-230);
  if (sprite.x > 230) sprite.setX(230);
  if (sprite.y < -170) sprite.setY(-170);
  if (sprite.y > 170) sprite.setY(170);

  sprite.variables.set('시간', Math.round((performance.now() - startTime) / 1000));
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
    description: "스페이스바로 장애물을 점프하세요! 점점 빨라집니다!",
    code: `sprite.emoji = "🦖";
runtime.bgColor = "#87CEEB";
sprite.goto(-150, -100);
sprite.setSize(110);
sprite.variables.set('점수', 0);

// Ground decoration
for (let i = 0; i < 15; i++) {
  runtime.gameObjects.push({
    id: 'grass' + i, emoji: '🌿', x: -230 + i * 35, y: -140, size: 50
  });
}
// Sun
runtime.gameObjects.push({ id: 'sun', emoji: '🌞', x: 190, y: 150, size: 100 });

let vy = 0;
let onGround = true;
let obstacles = [];
let frame = 0;
let speed = 4;

sprite.say('스페이스바로 점프!', 2);
{ const _end = performance.now() + 2000; while (performance.now() < _end) { yield; } }

while (true) {
  frame++;
  // Speed increases
  speed = 4 + Math.floor(frame / 300) * 0.5;

  // Gravity
  vy -= 0.9;
  sprite.changeY(vy);
  if (sprite.y <= -100) {
    sprite.setY(-100);
    vy = 0;
    onGround = true;
  }

  // Jump
  if (runtime.stage.isKeyPressed(' ') && onGround) {
    vy = 14;
    onGround = false;
    runtime.soundEngine.playSound('boing');
  }

  // Spawn obstacles
  if (frame % Math.max(30, 60 - Math.floor(frame / 200)) === 0) {
    const oid = 'obs' + frame;
    const types = ['🌵', '🪨', '🌲'];
    runtime.gameObjects.push({
      id: oid, emoji: types[Math.floor(Math.random() * 3)],
      x: 260, y: -100, size: 80 + Math.random() * 40
    });
    obstacles.push(oid);
  }

  // Move obstacles left
  for (const oid of obstacles) {
    const o = runtime.gameObjects.find(ob => ob.id === oid);
    if (o) o.x -= speed;
  }

  // Remove offscreen + check collision
  let hit = false;
  obstacles = obstacles.filter(oid => {
    const o = runtime.gameObjects.find(ob => ob.id === oid);
    if (!o) return false;
    if (o.x < -260) { runtime.gameObjects.splice(runtime.gameObjects.indexOf(o), 1); return false; }
    // Collision
    if (Math.abs(o.x - sprite.x) < 25 && Math.abs(o.y - sprite.y) < 25) {
      hit = true;
    }
    return true;
  });

  if (hit) {
    sprite.say('으악! 점수: ' + sprite.variables.get('점수'), 2);
    runtime.soundEngine.playSound('buzz');
    { const _end = performance.now() + 2000; while (performance.now() < _end) { yield; } }
    // Reset
    for (const oid of obstacles) {
      const o = runtime.gameObjects.find(ob => ob.id === oid);
      if (o) runtime.gameObjects.splice(runtime.gameObjects.indexOf(o), 1);
    }
    obstacles = [];
    frame = 0;
    speed = 4;
    sprite.variables.set('점수', 0);
    sprite.say('다시 시작!', 1);
    { const _end = performance.now() + 1000; while (performance.now() < _end) { yield; } }
  }

  // Score
  if (frame % 10 === 0) {
    sprite.variables.set('점수', (Number(sprite.variables.get('점수')) || 0) + 1);
  }

  // Move grass for scrolling effect
  for (const g of runtime.gameObjects.filter(o => o.id.startsWith('grass'))) {
    g.x -= speed * 0.5;
    if (g.x < -250) g.x = 250;
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
    description: "마우스로 물고기를 조종하며 먹이를 모으고 상어를 피하세요!",
    code: `sprite.emoji = "🐠";
runtime.bgColor = "#1a5276";
sprite.setSize(100);
sprite.variables.set('먹이', 0);

// Bubbles decoration
for (let i = 0; i < 8; i++) {
  runtime.gameObjects.push({
    id: 'bub' + i, emoji: '🫧', x: Math.random() * 400 - 200,
    y: Math.random() * 300 - 150, size: 30 + Math.random() * 40
  });
}

// Seaweed
for (let i = 0; i < 5; i++) {
  runtime.gameObjects.push({
    id: 'weed' + i, emoji: '🌿', x: -200 + i * 100, y: -160, size: 80
  });
}

// Food items
let foods = [];
for (let i = 0; i < 4; i++) {
  const fid = 'food' + i;
  runtime.gameObjects.push({
    id: fid, emoji: '🍤', x: Math.random() * 360 - 180, y: Math.random() * 260 - 130, size: 50
  });
  foods.push(fid);
}

// Shark enemy
runtime.gameObjects.push({ id: 'shark', emoji: '🦈', x: 200, y: 0, size: 120 });
let sharkDir = -1;

sprite.say('마우스로 이동! 🍤 먹이를 모아요!', 2);
{ const _end = performance.now() + 2000; while (performance.now() < _end) { yield; } }

while (true) {
  // Follow mouse smoothly
  sprite.changeX((runtime.stage.mouseX - sprite.x) * 0.1);
  sprite.changeY((runtime.stage.mouseY - sprite.y) * 0.1);
  if (runtime.stage.mouseX < sprite.x) sprite.setDirection(-90);
  else sprite.setDirection(90);

  // Shark patrol
  const shark = runtime.gameObjects.find(o => o.id === 'shark');
  if (shark) {
    shark.x += sharkDir * 2;
    if (shark.x < -220 || shark.x > 220) sharkDir *= -1;
    // Chase slightly toward player
    shark.y += (sprite.y - shark.y) * 0.01;

    // Collision with shark
    if (Math.abs(sprite.x - shark.x) < 35 && Math.abs(sprite.y - shark.y) < 35) {
      sprite.say('상어에게 잡혔어요! 😱', 2);
      runtime.soundEngine.playSound('buzz');
      sprite.goto(0, 0);
      sprite.variables.set('먹이', 0);
      // Respawn food
      for (const fid of foods) {
        const f = runtime.gameObjects.find(o => o.id === fid);
        if (f) { f.visible = true; f.x = Math.random() * 360 - 180; f.y = Math.random() * 260 - 130; }
      }
      { const _end = performance.now() + 2000; while (performance.now() < _end) { yield; } }
    }
  }

  // Collect food
  for (const fid of foods) {
    const f = runtime.gameObjects.find(o => o.id === fid);
    if (f && f.visible !== false && Math.abs(sprite.x - f.x) < 20 && Math.abs(sprite.y - f.y) < 20) {
      f.visible = false;
      sprite.variables.set('먹이', (Number(sprite.variables.get('먹이')) || 0) + 1);
      runtime.soundEngine.playSound('pop');
      if (Number(sprite.variables.get('먹이')) >= 4) {
        sprite.say('모든 먹이를 모았어요! 🎉', 3);
        runtime.soundEngine.playSound('ding');
        { const _end = performance.now() + 3000; while (performance.now() < _end) { yield; } }
        sprite.variables.set('먹이', 0);
        for (const fid2 of foods) {
          const f2 = runtime.gameObjects.find(o => o.id === fid2);
          if (f2) { f2.visible = true; f2.x = Math.random() * 360 - 180; f2.y = Math.random() * 260 - 130; }
        }
      }
    }
  }

  // Animate bubbles
  for (const b of runtime.gameObjects.filter(o => o.id.startsWith('bub'))) {
    b.y += 0.5;
    if (b.y > 180) { b.y = -180; b.x = Math.random() * 400 - 200; }
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
    description:
      "키보드 a~j 키로 도레미파솔라시를 연주하세요! 비주얼 이펙트도 나와요!",
    code: `sprite.emoji = "🎵";
runtime.bgColor = "#1a1a2e";
sprite.setSize(130);
sprite.goto(0, 30);
sprite.variables.set('음표수', 0);

// Piano keys visual
const keyNames = ['도','레','미','파','솔','라','시'];
const keyLetters = ['a','s','d','f','g','h','j'];
for (let i = 0; i < 7; i++) {
  runtime.gameObjects.push({
    id: 'key' + i, emoji: '⬜', x: -120 + i * 40, y: -120, size: 80
  });
  runtime.gameObjects.push({
    id: 'label' + i, emoji: keyNames[i], x: -120 + i * 40, y: -145, size: 40
  });
}

// Decorative notes
for (let i = 0; i < 5; i++) {
  runtime.gameObjects.push({
    id: 'deco' + i, emoji: '🎶',
    x: Math.random() * 400 - 200, y: Math.random() * 100 + 50, size: 40
  });
}

const notes = { a: 60, s: 62, d: 64, f: 65, g: 67, h: 69, j: 71 };
const colors = ['🔴','🟠','🟡','🟢','🔵','🟣','⚪'];
let lastKey = '';
let particles = [];
let frame = 0;

sprite.say('키보드 a~j로 연주하세요! 🎹', 2);
{ const _end = performance.now() + 2000; while (performance.now() < _end) { yield; } }

while (true) {
  frame++;
  let keyIdx = -1;
  for (let i = 0; i < keyLetters.length; i++) {
    const k = keyLetters[i];
    if (runtime.stage.isKeyPressed(k) && lastKey !== k) {
      lastKey = k;
      keyIdx = i;
      runtime.soundEngine.playNote(notes[k], 0.5);
      sprite.say(keyNames[i] + ' 🎵');
      sprite.variables.set('음표수', (Number(sprite.variables.get('음표수')) || 0) + 1);

      // Highlight key
      const keyObj = runtime.gameObjects.find(o => o.id === 'key' + i);
      if (keyObj) keyObj.emoji = colors[i];
      setTimeout(() => { if (keyObj) keyObj.emoji = '⬜'; }, 300);

      // Spawn particle
      const pid = 'p' + frame;
      runtime.gameObjects.push({
        id: pid, emoji: ['🎵','🎶','✨','💫'][Math.floor(Math.random() * 4)],
        x: -120 + i * 40, y: -80, size: 50
      });
      particles.push({ id: pid, life: 30 });

      // Pulse sprite
      sprite.changeSize(15);
      break;
    }
  }

  // Reset key tracking
  let anyPressed = false;
  for (const k of keyLetters) {
    if (runtime.stage.isKeyPressed(k)) anyPressed = true;
  }
  if (!anyPressed) lastKey = '';

  // Animate particles (float up & fade)
  particles = particles.filter(p => {
    p.life--;
    const obj = runtime.gameObjects.find(o => o.id === p.id);
    if (obj) {
      obj.y += 2;
      obj.x += (Math.random() - 0.5) * 3;
      if (obj.size) obj.size = Math.max(10, obj.size - 1);
    }
    if (p.life <= 0 && obj) {
      runtime.gameObjects.splice(runtime.gameObjects.indexOf(obj), 1);
      return false;
    }
    return true;
  });

  // Gradually return sprite size
  if (sprite.size > 130) sprite.changeSize(-2);

  // Animate deco notes
  for (const d of runtime.gameObjects.filter(o => o.id.startsWith('deco'))) {
    d.y += 0.3;
    d.x += Math.sin(frame * 0.05 + parseFloat(d.id.replace('deco', '')) * 2) * 0.5;
    if (d.y > 180) { d.y = -180; d.x = Math.random() * 400 - 200; }
  }

  yield;
}`,
  },
];
