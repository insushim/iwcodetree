import { PenLayer } from "./pen-layer";
import type { Runtime } from "./runtime";

export interface Costume {
  name: string;
  width: number;
  height: number;
  image: HTMLCanvasElement;
}

export interface SpriteEffect {
  color: number;
  brightness: number;
  ghost: number;
  fisheye: number;
  whirl: number;
  pixelate: number;
  mosaic: number;
}

export interface SpeechBubble {
  text: string;
  type: "say" | "think";
  timer?: number;
}

export interface PenState {
  down: boolean;
  color: string;
  size: number;
}

function createDefaultCostume(name: string, color: string): Costume {
  const w = 48,
    h = 48;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(w / 2 - 6, h / 2 - 4, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w / 2 + 6, h / 2 - 4, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#333";
  ctx.beginPath();
  ctx.arc(w / 2 - 5, h / 2 - 4, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w / 2 + 7, h / 2 - 4, 2, 0, Math.PI * 2);
  ctx.fill();
  return { name, width: w, height: h, image: canvas };
}

export class Sprite {
  name: string;
  x: number = 0;
  y: number = 0;
  direction: number = 90;
  size: number = 100;
  visible: boolean = true;
  costumes: Costume[];
  costumeIndex: number = 0;
  effects: SpriteEffect = {
    color: 0,
    brightness: 0,
    ghost: 0,
    fisheye: 0,
    whirl: 0,
    pixelate: 0,
    mosaic: 0,
  };
  speech: SpeechBubble | null = null;
  pen: PenState = { down: false, color: "#0000ff", size: 1 };
  layer: number = 0;
  isClone: boolean = false;
  variables: Map<string, number | string> = new Map();

  private runtime: Runtime | null = null;
  private initialState: {
    x: number;
    y: number;
    direction: number;
    size: number;
    visible: boolean;
    costumeIndex: number;
  } | null = null;

  constructor(name: string, costumes?: Costume[]) {
    this.name = name;
    this.costumes =
      costumes && costumes.length > 0
        ? costumes
        : [createDefaultCostume(name, "#4C97FF")];
  }

  get currentCostume(): Costume {
    return this.costumes[this.costumeIndex];
  }

  setRuntime(runtime: Runtime): void {
    this.runtime = runtime;
  }

  move(steps: number): void {
    const rad = ((this.direction - 90) * Math.PI) / 180;
    const oldX = this.x,
      oldY = this.y;
    this.x += steps * Math.cos(rad);
    this.y += steps * Math.sin(rad);
    if (this.pen.down && this.runtime) {
      this.runtime.penLayer.drawLine(
        oldX,
        oldY,
        this.x,
        this.y,
        this.pen.color,
        this.pen.size,
      );
    }
  }

  turnRight(degrees: number): void {
    this.direction = (this.direction + degrees) % 360;
  }

  turnLeft(degrees: number): void {
    this.direction = (this.direction - degrees + 360) % 360;
  }

  goto(x: number, y: number): void {
    const oldX = this.x,
      oldY = this.y;
    this.x = x;
    this.y = y;
    if (this.pen.down && this.runtime) {
      this.runtime.penLayer.drawLine(
        oldX,
        oldY,
        this.x,
        this.y,
        this.pen.color,
        this.pen.size,
      );
    }
  }

  *glide(
    x: number,
    y: number,
    duration: number,
  ): Generator<void, void, number> {
    const startX = this.x,
      startY = this.y;
    const startTime = performance.now();
    const ms = duration * 1000;
    while (true) {
      const elapsed = performance.now() - startTime;
      const t = Math.min(elapsed / ms, 1);
      this.goto(startX + (x - startX) * t, startY + (y - startY) * t);
      if (t >= 1) break;
      yield;
    }
  }

  setDirection(deg: number): void {
    this.direction = ((deg % 360) + 360) % 360;
  }

  pointTowards(targetX: number, targetY: number): void {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    this.direction = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360) % 360;
  }

  changeX(dx: number): void {
    this.goto(this.x + dx, this.y);
  }

  changeY(dy: number): void {
    this.goto(this.x, this.y + dy);
  }

  setX(x: number): void {
    this.goto(x, this.y);
  }

  setY(y: number): void {
    this.goto(this.x, y);
  }

  bounceOnEdge(): void {
    const hw = (this.currentCostume.width * this.size) / 200;
    const hh = (this.currentCostume.height * this.size) / 200;
    let bounced = false;
    if (this.x + hw > 240) {
      this.x = 240 - hw;
      bounced = true;
    }
    if (this.x - hw < -240) {
      this.x = -240 + hw;
      bounced = true;
    }
    if (this.y + hh > 180) {
      this.y = 180 - hh;
      bounced = true;
    }
    if (this.y - hh < -180) {
      this.y = -180 + hh;
      bounced = true;
    }
    if (bounced) {
      this.direction = (360 - this.direction + 360) % 360;
    }
  }

  say(text: string): void {
    this.speech = text ? { text, type: "say" } : null;
  }

  think(text: string): void {
    this.speech = text ? { text, type: "think" } : null;
  }

  setCostume(nameOrIndex: string | number): void {
    if (typeof nameOrIndex === "number") {
      this.costumeIndex =
        (((nameOrIndex - 1) % this.costumes.length) + this.costumes.length) %
        this.costumes.length;
    } else {
      const idx = this.costumes.findIndex((c) => c.name === nameOrIndex);
      if (idx >= 0) this.costumeIndex = idx;
    }
  }

  nextCostume(): void {
    this.costumeIndex = (this.costumeIndex + 1) % this.costumes.length;
  }

  setSize(size: number): void {
    this.size = Math.max(5, size);
  }

  changeSize(delta: number): void {
    this.setSize(this.size + delta);
  }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  setEffect(effect: keyof SpriteEffect, value: number): void {
    this.effects[effect] = value;
  }

  clearEffects(): void {
    this.effects = {
      color: 0,
      brightness: 0,
      ghost: 0,
      fisheye: 0,
      whirl: 0,
      pixelate: 0,
      mosaic: 0,
    };
  }

  goToFront(): void {
    if (this.runtime) {
      const maxLayer = Math.max(...this.runtime.sprites.map((s) => s.layer));
      this.layer = maxLayer + 1;
    }
  }

  goToBack(): void {
    if (this.runtime) {
      const minLayer = Math.min(...this.runtime.sprites.map((s) => s.layer));
      this.layer = minLayer - 1;
    }
  }

  isTouching(target: string): boolean {
    if (!this.runtime) return false;
    if (target === "_edge_") {
      const hw = (this.currentCostume.width * this.size) / 200;
      const hh = (this.currentCostume.height * this.size) / 200;
      return Math.abs(this.x) + hw > 240 || Math.abs(this.y) + hh > 180;
    }
    if (target === "_mouse_") {
      const mx = this.runtime.stage?.mouseX ?? 0;
      const my = this.runtime.stage?.mouseY ?? 0;
      const hw = (this.currentCostume.width * this.size) / 200;
      const hh = (this.currentCostume.height * this.size) / 200;
      return Math.abs(mx - this.x) < hw && Math.abs(my - this.y) < hh;
    }
    const other = this.runtime.sprites.find(
      (s) => s.name === target && s !== this,
    );
    if (!other) return false;
    const { spritesTouching } = require("./collision");
    return spritesTouching(this, other);
  }

  distanceTo(targetX: number, targetY: number): number {
    return Math.sqrt((this.x - targetX) ** 2 + (this.y - targetY) ** 2);
  }

  clone(): Sprite {
    const c = new Sprite(this.name, [...this.costumes]);
    c.x = this.x;
    c.y = this.y;
    c.direction = this.direction;
    c.size = this.size;
    c.visible = this.visible;
    c.costumeIndex = this.costumeIndex;
    c.effects = { ...this.effects };
    c.pen = { ...this.pen };
    c.layer = this.layer;
    c.isClone = true;
    c.variables = new Map(this.variables);
    c.runtime = this.runtime;
    return c;
  }

  deleteClone(): void {
    if (this.isClone && this.runtime) {
      this.runtime.deleteClone(this);
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.visible) return;
    const costume = this.currentCostume;
    const scale = this.size / 100;
    const cx = this.x + 240;
    const cy = 180 - this.y;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(((this.direction - 90) * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.globalAlpha = 1 - this.effects.ghost / 100;
    ctx.drawImage(costume.image, -costume.width / 2, -costume.height / 2);
    ctx.restore();

    if (this.speech) {
      this.drawSpeechBubble(ctx, cx, cy, scale, costume);
    }
  }

  private drawSpeechBubble(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    scale: number,
    costume: Costume,
  ): void {
    if (!this.speech) return;
    const text = this.speech.text;
    ctx.save();
    ctx.font = "14px sans-serif";
    const metrics = ctx.measureText(text);
    const pw = Math.max(metrics.width + 16, 40);
    const ph = 28;
    const px = cx - pw / 2;
    const py = cy - (costume.height * scale) / 2 - ph - 10;

    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 1;
    if (this.speech.type === "say") {
      ctx.beginPath();
      ctx.roundRect(px, py, pw, ph, 8);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.roundRect(px, py, pw, ph, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(cx - 4, py + ph + 4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx - 8, py + ph + 10, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, px + pw / 2, py + ph / 2);
    ctx.restore();
  }

  saveInitialState(): void {
    this.initialState = {
      x: this.x,
      y: this.y,
      direction: this.direction,
      size: this.size,
      visible: this.visible,
      costumeIndex: this.costumeIndex,
    };
  }

  restoreInitialState(): void {
    if (!this.initialState) return;
    this.x = this.initialState.x;
    this.y = this.initialState.y;
    this.direction = this.initialState.direction;
    this.size = this.initialState.size;
    this.visible = this.initialState.visible;
    this.costumeIndex = this.initialState.costumeIndex;
    this.clearEffects();
    this.speech = null;
    this.pen = { down: false, color: "#0000ff", size: 1 };
  }
}
