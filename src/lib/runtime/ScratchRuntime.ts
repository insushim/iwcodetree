/* eslint-disable @typescript-eslint/no-explicit-any */

// ---------------------------------------------------------------------------
// Sprite
// ---------------------------------------------------------------------------

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
  expiry: number; // performance.now() timestamp; 0 = forever
}

export interface PenState {
  down: boolean;
  color: string;
  size: number;
}

export class Sprite {
  name: string;
  x = 0;
  y = 0;
  direction = 90;
  size = 100;
  visible = true;
  costumeIndex = 0;
  backdropIndex = 0;
  speech: SpeechBubble | null = null;
  effects: SpriteEffect = {
    color: 0,
    brightness: 0,
    ghost: 0,
    fisheye: 0,
    whirl: 0,
    pixelate: 0,
    mosaic: 0,
  };
  pen: PenState = { down: false, color: "#0000ff", size: 1 };
  variables: Map<string, number | string> = new Map();
  answer = "";

  private _runtime: ScratchRuntime | null = null;
  private _penCanvas: OffscreenCanvas | HTMLCanvasElement | null = null;
  private _penCtx:
    | CanvasRenderingContext2D
    | OffscreenCanvasRenderingContext2D
    | null = null;

  constructor(name: string = "스프라이트1") {
    this.name = name;
  }

  /** Called by runtime after construction. */
  _bind(runtime: ScratchRuntime): void {
    this._runtime = runtime;
  }

  // ---- Motion ----

  move(steps: number): void {
    const rad = ((this.direction - 90) * Math.PI) / 180;
    const oldX = this.x;
    const oldY = this.y;
    this.x += steps * Math.cos(rad);
    this.y += steps * Math.sin(rad);
    this._penLine(oldX, oldY, this.x, this.y);
  }

  turnRight(deg: number): void {
    this.direction = (this.direction + deg) % 360;
  }

  turnLeft(deg: number): void {
    this.direction = (this.direction - deg + 360) % 360;
  }

  goto(x: number, y: number): void {
    const oldX = this.x;
    const oldY = this.y;
    this.x = x;
    this.y = y;
    this._penLine(oldX, oldY, x, y);
  }

  *glide(x: number, y: number, secs: number): Generator<void, void, unknown> {
    const startX = this.x;
    const startY = this.y;
    const start = performance.now();
    const ms = secs * 1000;
    while (true) {
      const t = Math.min((performance.now() - start) / ms, 1);
      this.goto(startX + (x - startX) * t, startY + (y - startY) * t);
      if (t >= 1) break;
      yield;
    }
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

  setDirection(deg: number): void {
    this.direction = ((deg % 360) + 360) % 360;
  }

  pointTowards(mx: number, my: number): void {
    const dx = mx - this.x;
    const dy = my - this.y;
    this.direction = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360) % 360;
  }

  bounceOnEdge(): void {
    const hw = (48 * this.size) / 200;
    const hh = (48 * this.size) / 200;
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

  // ---- Looks ----

  say(text: string, secs?: number): void {
    if (!text && text !== "") {
      this.speech = null;
      return;
    }
    this.speech = {
      text: String(text),
      type: "say",
      expiry: secs ? performance.now() + secs * 1000 : 0,
    };
  }

  think(text: string, secs?: number): void {
    if (!text && text !== "") {
      this.speech = null;
      return;
    }
    this.speech = {
      text: String(text),
      type: "think",
      expiry: secs ? performance.now() + secs * 1000 : 0,
    };
  }

  setSize(s: number): void {
    this.size = Math.max(5, s);
  }

  changeSize(ds: number): void {
    this.setSize(this.size + ds);
  }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  setEffect(name: string, val: number): void {
    if (name in this.effects) {
      (this.effects as any)[name] = val;
    }
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

  // ---- Sensing ----

  *askAndWait(question: string): Generator<void, void, unknown> {
    const rt = this._runtime;
    if (!rt) return;
    rt.askActive = true;
    rt.askQuestion = question;
    rt.askResolve = null;
    // wait for answer
    const p = new Promise<string>((resolve) => {
      rt.askResolve = resolve;
    });
    // yield every frame until resolved
    let answered = false;
    let result = "";
    p.then((v) => {
      answered = true;
      result = v;
    });
    while (!answered) {
      yield;
    }
    this.answer = result;
    rt.stage.answer = result;
  }

  // ---- Pen helpers (private) ----

  private _penLine(x1: number, y1: number, x2: number, y2: number): void {
    if (!this.pen.down || !this._runtime) return;
    this._runtime._drawPenLine(x1, y1, x2, y2, this.pen.color, this.pen.size);
  }
}

// ---------------------------------------------------------------------------
// StageState — lightweight stage info accessible as `runtime.stage`
// ---------------------------------------------------------------------------

export interface StageState {
  mouseX: number;
  mouseY: number;
  mouseDown: boolean;
  keysPressed: Set<string>;
  answer: string;
  backdropIndex: number;
  isKeyPressed(key: string): boolean;
}

// ---------------------------------------------------------------------------
// Thread
// ---------------------------------------------------------------------------

interface Thread {
  id: number;
  gen: Generator<void, void, unknown>;
  done: boolean;
}

// ---------------------------------------------------------------------------
// ScratchRuntime
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Sound Engine
// ---------------------------------------------------------------------------

export class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private volume = 100;

  private getCtx(): AudioContext {
    if (!this.audioCtx) this.audioCtx = new AudioContext();
    return this.audioCtx;
  }

  playSound(name: string): void {
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = (this.volume / 100) * 0.3;
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Simple synth sounds based on name
    const presets: Record<
      string,
      { freq: number; type: OscillatorType; dur: number }
    > = {
      meow: { freq: 800, type: "sawtooth", dur: 0.3 },
      pop: { freq: 400, type: "sine", dur: 0.1 },
      ding: { freq: 1200, type: "sine", dur: 0.4 },
      boing: { freq: 300, type: "triangle", dur: 0.3 },
      buzz: { freq: 150, type: "square", dur: 0.2 },
      click: { freq: 1000, type: "square", dur: 0.05 },
      drum: { freq: 100, type: "triangle", dur: 0.15 },
    };
    const p = presets[name] || presets.pop;
    osc.type = p.type;
    osc.frequency.setValueAtTime(p.freq, ctx.currentTime);
    if (name === "meow") {
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + p.dur);
    }
    if (name === "boing") {
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + p.dur);
    }
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + p.dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + p.dur + 0.05);
  }

  playNote(midiNote: number, durationSecs: number): void {
    const ctx = this.getCtx();
    const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = (this.volume / 100) * 0.25;
    osc.type = "triangle";
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + durationSecs,
    );
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + durationSecs + 0.05);
  }

  setVolume(v: number): void {
    this.volume = Math.max(0, Math.min(100, v));
  }

  changeVolume(dv: number): void {
    this.setVolume(this.volume + dv);
  }

  getVolume(): number {
    return this.volume;
  }

  stopAll(): void {
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
  }
}

export type RenderCallback = () => void;

export class ScratchRuntime {
  sprite: Sprite;
  stage: StageState;
  soundEngine: SoundEngine;

  // ask UI state (read by ScratchStage component)
  askActive = false;
  askQuestion = "";
  askResolve: ((answer: string) => void) | null = null;

  // pen offscreen canvas
  penCanvas: HTMLCanvasElement;
  private penCtx: CanvasRenderingContext2D;

  // internals
  private threads: Thread[] = [];
  private nextId = 0;
  private running = false;
  private rafId = 0;
  private lastFrame = 0;
  private readonly FRAME_MS = 1000 / 30; // ~30 fps
  private renderCb: RenderCallback | null = null;

  // event handlers registered from workspace
  private keyHandlers: Map<string, string[]> = new Map(); // key -> code[]
  private clickHandlers: string[] = [];
  private messageHandlers: Map<string, string[]> = new Map();

  constructor() {
    this.sprite = new Sprite();
    this.sprite._bind(this);
    this.soundEngine = new SoundEngine();

    this.penCanvas = document.createElement("canvas");
    this.penCanvas.width = 480;
    this.penCanvas.height = 360;
    this.penCtx = this.penCanvas.getContext("2d")!;

    const keysPressed = new Set<string>();
    this.stage = {
      mouseX: 0,
      mouseY: 0,
      mouseDown: false,
      keysPressed,
      answer: "",
      backdropIndex: 0,
      isKeyPressed: (key: string) => keysPressed.has(key),
    };
  }

  /** Set a callback invoked each frame after stepping threads. */
  onRender(cb: RenderCallback): void {
    this.renderCb = cb;
  }

  // ------------------------------------------------------------------
  // Starting / stopping
  // ------------------------------------------------------------------

  /**
   * Parse top-level event hat blocks from a Blockly workspace,
   * extract the generated JS for each, and start the runtime.
   *
   * If `workspace` is null, `code` is treated as a single
   * flag-clicked script (useful for testing).
   */
  start(code: string, workspace?: any): void {
    this.stopInternal(false);
    this.resetSprite();
    this.threads = [];
    this.keyHandlers.clear();
    this.clickHandlers = [];
    this.messageHandlers.clear();
    this.penCtx.clearRect(0, 0, 480, 360);

    if (workspace) {
      this.parseWorkspace(workspace);
    } else if (code.trim()) {
      // Simple mode: treat entire code as flag-clicked
      this.spawnThread(code);
    }

    this.running = true;
    this.lastFrame = performance.now();
    this.tick();
  }

  stop(): void {
    this.stopInternal(true);
  }

  private stopInternal(resetSprite: boolean): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
    this.threads = [];
    this.askActive = false;
    if (resetSprite) {
      this.resetSprite();
      this.penCtx.clearRect(0, 0, 480, 360);
      this.renderCb?.();
    }
  }

  private resetSprite(): void {
    this.sprite.x = 0;
    this.sprite.y = 0;
    this.sprite.direction = 90;
    this.sprite.size = 100;
    this.sprite.visible = true;
    this.sprite.speech = null;
    this.sprite.clearEffects();
    this.sprite.pen = { down: false, color: "#0000ff", size: 1 };
  }

  isRunning(): boolean {
    return this.running;
  }

  // ------------------------------------------------------------------
  // Workspace parsing
  // ------------------------------------------------------------------

  private parseWorkspace(workspace: any): void {
    // Dynamic imports would be needed for Blockly types, but we can use
    // the helper functions from our generator module.  Since this module
    // must work without importing Blockly directly (it's heavy), we
    // call generic workspace APIs.
    const topBlocks: any[] = workspace.getTopBlocks(true);

    for (const block of topBlocks) {
      const eventInfo = this.getEventInfo(block);
      if (!eventInfo) continue;

      // Generate code for the body (blocks connected below the hat)
      const bodyBlock = block.getNextBlock();
      if (!bodyBlock) continue;
      const bodyCode = this.generateChainCode(bodyBlock, workspace);
      if (!bodyCode.trim()) continue;

      switch (eventInfo.event) {
        case "flag_clicked":
          this.spawnThread(bodyCode);
          break;
        case "key_pressed": {
          const key = eventInfo.param ?? "";
          if (!this.keyHandlers.has(key)) this.keyHandlers.set(key, []);
          this.keyHandlers.get(key)!.push(bodyCode);
          break;
        }
        case "sprite_clicked":
          this.clickHandlers.push(bodyCode);
          break;
        default:
          if (eventInfo.event.startsWith("message_")) {
            const msg = eventInfo.event;
            if (!this.messageHandlers.has(msg))
              this.messageHandlers.set(msg, []);
            this.messageHandlers.get(msg)!.push(bodyCode);
          }
          break;
      }
    }
  }

  private getEventInfo(block: any): { event: string; param?: string } | null {
    switch (block.type) {
      case "when_flag_clicked":
        return { event: "flag_clicked" };
      case "when_key_pressed":
        return { event: "key_pressed", param: block.getFieldValue("KEY") };
      case "when_sprite_clicked":
        return { event: "sprite_clicked" };
      case "when_backdrop_switch":
        return {
          event: "backdrop_switch",
          param: block.getFieldValue("BACKDROP"),
        };
      case "when_receive_msg":
        return { event: "message_" + block.getFieldValue("MSG") };
      case "when_clone_start":
        return { event: "clone_start" };
      default:
        return null;
    }
  }

  private generateChainCode(startBlock: any, workspace: any): string {
    // We use blockly's javascript generator to produce code for a chain.
    // The generator is typically loaded globally when the workspace exists.
    try {
      const { javascriptGenerator } = require("blockly/javascript");
      let code = "";
      let current = startBlock;
      while (current) {
        const result = javascriptGenerator.blockToCode(current);
        if (typeof result === "string") {
          code += result;
        } else if (Array.isArray(result)) {
          code += result[0];
        }
        current = current.getNextBlock();
      }
      return code;
    } catch {
      return "";
    }
  }

  // ------------------------------------------------------------------
  // Thread management
  // ------------------------------------------------------------------

  private spawnThread(code: string): void {
    try {
      const fn = new Function(
        "sprite",
        "runtime",
        `return function*() {\n${code}\n};`,
      );
      const gen: Generator<void, void, unknown> = fn(this.sprite, this)();
      this.threads.push({ id: this.nextId++, gen, done: false });
    } catch (e) {
      console.error("[ScratchRuntime] Failed to compile code:", e);
    }
  }

  // ------------------------------------------------------------------
  // Frame loop
  // ------------------------------------------------------------------

  private tick = (): void => {
    if (!this.running) return;
    const now = performance.now();
    if (now - this.lastFrame >= this.FRAME_MS) {
      this.lastFrame = now;
      this.stepThreads();
      this.expireSpeech();
      this.renderCb?.();
    }
    this.rafId = requestAnimationFrame(this.tick);
  };

  private stepThreads(): void {
    for (const t of this.threads) {
      if (t.done) continue;
      try {
        const result = t.gen.next();
        if (result.done) t.done = true;
      } catch (e) {
        console.error(`[ScratchRuntime] Thread ${t.id} error:`, e);
        t.done = true;
      }
    }
    this.threads = this.threads.filter((t) => !t.done);
  }

  private expireSpeech(): void {
    const sp = this.sprite.speech;
    if (sp && sp.expiry > 0 && performance.now() >= sp.expiry) {
      this.sprite.speech = null;
    }
  }

  // ------------------------------------------------------------------
  // Events triggered from stage interactions
  // ------------------------------------------------------------------

  handleKeyDown(key: string): void {
    this.stage.keysPressed.add(key);
    if (!this.running) return;
    const handlers = this.keyHandlers.get(key);
    if (handlers) {
      for (const code of handlers) this.spawnThread(code);
    }
    // "any" key
    const anyHandlers = this.keyHandlers.get("any");
    if (anyHandlers) {
      for (const code of anyHandlers) this.spawnThread(code);
    }
  }

  handleKeyUp(key: string): void {
    this.stage.keysPressed.delete(key);
  }

  handleSpriteClick(): void {
    if (!this.running) return;
    for (const code of this.clickHandlers) {
      this.spawnThread(code);
    }
  }

  submitAnswer(answer: string): void {
    this.askActive = false;
    this.stage.answer = answer;
    this.askResolve?.(answer);
    this.askResolve = null;
  }

  // ------------------------------------------------------------------
  // Broadcast (called from generated code)
  // ------------------------------------------------------------------

  broadcast(msg: string): void {
    const key = "message_" + msg;
    const handlers = this.messageHandlers.get(key);
    if (handlers) {
      for (const code of handlers) this.spawnThread(code);
    }
  }

  *broadcastAndWait(msg: string): Generator<void, void, unknown> {
    const key = "message_" + msg;
    const handlers = this.messageHandlers.get(key);
    if (!handlers || handlers.length === 0) return;

    // spawn threads and track them
    const spawned: Thread[] = [];
    for (const code of handlers) {
      try {
        const fn = new Function(
          "sprite",
          "runtime",
          `return function*() {\n${code}\n};`,
        );
        const gen: Generator<void, void, unknown> = fn(this.sprite, this)();
        const thread: Thread = { id: this.nextId++, gen, done: false };
        this.threads.push(thread);
        spawned.push(thread);
      } catch (e) {
        console.error("[ScratchRuntime] broadcastAndWait compile error:", e);
      }
    }
    // wait until all spawned threads finish
    while (spawned.some((t) => !t.done)) {
      yield;
    }
  }

  // ------------------------------------------------------------------
  // Pen drawing (called by Sprite)
  // ------------------------------------------------------------------

  _drawPenLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    size: number,
  ): void {
    const cx1 = x1 + 240;
    const cy1 = 180 - y1;
    const cx2 = x2 + 240;
    const cy2 = 180 - y2;
    this.penCtx.strokeStyle = color;
    this.penCtx.lineWidth = size;
    this.penCtx.lineCap = "round";
    this.penCtx.beginPath();
    this.penCtx.moveTo(cx1, cy1);
    this.penCtx.lineTo(cx2, cy2);
    this.penCtx.stroke();
  }
}
