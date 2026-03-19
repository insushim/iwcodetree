import { Sprite } from "./sprite";
import { Stage } from "./stage";
import { Scheduler } from "./scheduler";
import { Renderer } from "./renderer";
import { PenLayer } from "./pen-layer";
import { EventBus } from "./event-bus";
import { SoundEngine } from "./sound-engine";
import { spriteContainsPoint } from "./collision";

export class Runtime {
  sprites: Sprite[] = [];
  stage: Stage | null = null;
  scheduler: Scheduler = new Scheduler();
  renderer: Renderer | null = null;
  penLayer: PenLayer = new PenLayer();
  eventBus: EventBus = new EventBus();
  soundEngine: SoundEngine = new SoundEngine();
  private running: boolean = false;
  private rafId: number = 0;
  private answer: string = "";
  private timer: number = 0;
  private timerStart: number = 0;

  init(canvas: HTMLCanvasElement): void {
    this.stage = new Stage(canvas);
    this.renderer = new Renderer(this.stage, this.penLayer);

    this.stage.setOnKeyPress((key) => {
      this.eventBus.emit("key_pressed", key);
    });

    this.stage.setOnSpriteClick((x, y) => {
      for (const sprite of [...this.sprites].reverse()) {
        if (sprite.visible && spriteContainsPoint(sprite, x, y)) {
          this.eventBus.emit("sprite_clicked", sprite.name);
          break;
        }
      }
    });

    this.stage.setOnBackdropSwitch((name) => {
      this.eventBus.emit("backdrop_switch", name);
    });
  }

  addSprite(sprite: Sprite): void {
    sprite.setRuntime(this);
    sprite.layer = this.sprites.length;
    sprite.saveInitialState();
    this.sprites.push(sprite);
  }

  removeSprite(sprite: Sprite): void {
    this.scheduler.removeThreadsForSprite(sprite.name);
    this.sprites = this.sprites.filter((s) => s !== sprite);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.timerStart = performance.now();
    this.sprites.forEach((s) => s.saveInitialState());
    this.eventBus.emit("flag_clicked");
    this.tick();
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
    this.scheduler.clear();
    this.sprites.forEach((s) => s.restoreInitialState());
    // Remove clones
    this.sprites = this.sprites.filter((s) => !s.isClone);
    this.penLayer.clear();
    this.soundEngine.stopAll();
    if (this.renderer) {
      this.renderer.render(this.sprites);
    }
  }

  private tick = (): void => {
    if (!this.running) return;
    this.scheduler.step();
    if (this.renderer) {
      this.renderer.render(this.sprites);
    }
    this.rafId = requestAnimationFrame(this.tick);
  };

  fireEvent(event: string, ...args: unknown[]): void {
    this.eventBus.emit(event, ...args);
  }

  broadcast(message: string): void {
    this.eventBus.emit("message_" + message);
  }

  *broadcastAndWait(message: string): Generator<void, void, unknown> {
    let done = false;
    const threads: ReturnType<typeof this.scheduler.addThread>[] = [];
    // Emit and collect threads that respond
    this.eventBus.emit("message_" + message);
    // Wait one frame to let handlers register threads
    yield;
    // Wait until those threads finish (simplified: wait a frame)
    while (threads.some((t) => !t.done)) {
      yield;
    }
    done = true;
  }

  createClone(spriteName: string): void {
    const original = this.sprites.find(
      (s) => s.name === spriteName && !s.isClone,
    );
    if (!original) return;
    const clone = original.clone();
    clone.setRuntime(this);
    this.sprites.push(clone);
    this.eventBus.emit("clone_start", clone.name, clone);
  }

  deleteClone(sprite: Sprite): void {
    if (!sprite.isClone) return;
    this.removeSprite(sprite);
  }

  runCode(code: string, sprite: Sprite): void {
    try {
      const genFunc = new Function(
        "sprite",
        "runtime",
        `
        return function*() {
          ${code}
        };
      `,
      );
      const gen = genFunc(sprite, this)();
      this.scheduler.addThread(gen, sprite.name);
    } catch (e) {
      console.error("Code execution error:", e);
    }
  }

  getAnswer(): string {
    return this.stage?.answer ?? "";
  }

  async askAndWait(question: string): Promise<string> {
    return new Promise((resolve) => {
      const answer = prompt(question) ?? "";
      if (this.stage) this.stage.answer = answer;
      resolve(answer);
    });
  }

  getTimer(): number {
    return (performance.now() - this.timerStart) / 1000;
  }

  resetTimer(): void {
    this.timerStart = performance.now();
  }

  isRunning(): boolean {
    return this.running;
  }
}
