export interface Backdrop {
  name: string;
  color: string;
  image?: HTMLImageElement | HTMLCanvasElement;
}

export class Stage {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number = 480;
  height: number = 360;
  backdrops: Backdrop[];
  backdropIndex: number = 0;
  mouseX: number = 0;
  mouseY: number = 0;
  mouseDown: boolean = false;
  keysPressed: Set<string> = new Set();
  answer: string = "";

  private onKeyPress?: (key: string) => void;
  private onSpriteClick?: (x: number, y: number) => void;
  private onBackdropSwitch?: (name: string) => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    canvas.width = this.width;
    canvas.height = this.height;
    this.backdrops = [{ name: "배경1", color: "#ffffff" }];
    this.bindEvents();
  }

  private bindEvents(): void {
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.width / rect.width;
      const scaleY = this.height / rect.height;
      this.mouseX = (e.clientX - rect.left) * scaleX - 240;
      this.mouseY = 180 - (e.clientY - rect.top) * scaleY;
    });

    this.canvas.addEventListener("mousedown", (e) => {
      this.mouseDown = true;
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.width / rect.width;
      const scaleY = this.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX - 240;
      const y = 180 - (e.clientY - rect.top) * scaleY;
      this.onSpriteClick?.(x, y);
    });

    this.canvas.addEventListener("mouseup", () => {
      this.mouseDown = false;
    });

    window.addEventListener("keydown", (e) => {
      this.keysPressed.add(e.key);
      this.onKeyPress?.(e.key);
    });

    window.addEventListener("keyup", (e) => {
      this.keysPressed.delete(e.key);
    });
  }

  setOnKeyPress(handler: (key: string) => void): void {
    this.onKeyPress = handler;
  }

  setOnSpriteClick(handler: (x: number, y: number) => void): void {
    this.onSpriteClick = handler;
  }

  setOnBackdropSwitch(handler: (name: string) => void): void {
    this.onBackdropSwitch = handler;
  }

  get currentBackdrop(): Backdrop {
    return this.backdrops[this.backdropIndex];
  }

  switchBackdrop(nameOrIndex: string | number): void {
    if (typeof nameOrIndex === "number") {
      this.backdropIndex =
        (((nameOrIndex - 1) % this.backdrops.length) + this.backdrops.length) %
        this.backdrops.length;
    } else {
      const idx = this.backdrops.findIndex((b) => b.name === nameOrIndex);
      if (idx >= 0) this.backdropIndex = idx;
    }
    this.onBackdropSwitch?.(this.currentBackdrop.name);
  }

  nextBackdrop(): void {
    this.backdropIndex = (this.backdropIndex + 1) % this.backdrops.length;
    this.onBackdropSwitch?.(this.currentBackdrop.name);
  }

  drawBackdrop(): void {
    const backdrop = this.currentBackdrop;
    if (backdrop.image) {
      this.ctx.drawImage(backdrop.image, 0, 0, this.width, this.height);
    } else {
      this.ctx.fillStyle = backdrop.color;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  isKeyPressed(key: string): boolean {
    return this.keysPressed.has(key);
  }

  toStageX(canvasX: number): number {
    return canvasX - 240;
  }

  toStageY(canvasY: number): number {
    return 180 - canvasY;
  }

  toCanvasX(stageX: number): number {
    return stageX + 240;
  }

  toCanvasY(stageY: number): number {
    return 180 - stageY;
  }

  destroy(): void {
    // Event listeners are on canvas/window; ideally would remove them
    // but keeping simple for now
  }
}
