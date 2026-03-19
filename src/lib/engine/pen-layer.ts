export class PenLayer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(width: number = 480, height: number = 360) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d")!;
  }

  drawLine(
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
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = size;
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(cx1, cy1);
    this.ctx.lineTo(cx2, cy2);
    this.ctx.stroke();
  }

  stamp(
    image: HTMLCanvasElement | HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    const cx = x + 240 - width / 2;
    const cy = 180 - y - height / 2;
    this.ctx.drawImage(image, cx, cy, width, height);
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}
