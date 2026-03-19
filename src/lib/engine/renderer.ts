import type { Sprite } from "./sprite";
import type { Stage } from "./stage";
import type { PenLayer } from "./pen-layer";

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private stage: Stage;
  private penLayer: PenLayer;

  constructor(stage: Stage, penLayer: PenLayer) {
    this.ctx = stage.ctx;
    this.stage = stage;
    this.penLayer = penLayer;
  }

  render(sprites: Sprite[]): void {
    this.ctx.clearRect(0, 0, this.stage.width, this.stage.height);
    this.stage.drawBackdrop();
    this.ctx.drawImage(this.penLayer.getCanvas(), 0, 0);

    const sorted = [...sprites].sort((a, b) => a.layer - b.layer);
    for (const sprite of sorted) {
      sprite.draw(this.ctx);
    }
  }
}
