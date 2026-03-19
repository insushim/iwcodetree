import type { Sprite } from "./sprite";

export interface AABB {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export function getSpriteAABB(sprite: Sprite): AABB {
  const halfW = (sprite.currentCostume.width * sprite.size) / 200;
  const halfH = (sprite.currentCostume.height * sprite.size) / 200;
  return {
    left: sprite.x - halfW,
    right: sprite.x + halfW,
    top: sprite.y + halfH,
    bottom: sprite.y - halfH,
  };
}

export function aabbOverlap(a: AABB, b: AABB): boolean {
  return (
    a.left < b.right && a.right > b.left && a.bottom < b.top && a.top > b.bottom
  );
}

export function spritesTouching(a: Sprite, b: Sprite): boolean {
  if (!a.visible || !b.visible) return false;
  return aabbOverlap(getSpriteAABB(a), getSpriteAABB(b));
}

export function spriteAtEdge(sprite: Sprite): { x: boolean; y: boolean } {
  const box = getSpriteAABB(sprite);
  return {
    x: box.left < -240 || box.right > 240,
    y: box.bottom < -180 || box.top > 180,
  };
}

export function spriteContainsPoint(
  sprite: Sprite,
  px: number,
  py: number,
): boolean {
  const box = getSpriteAABB(sprite);
  return px >= box.left && px <= box.right && py >= box.bottom && py <= box.top;
}

export function touchingColor(
  _sprite: Sprite,
  _color: string,
  _ctx: CanvasRenderingContext2D,
): boolean {
  // Simplified: full pixel-level color detection would require rendering
  // each sprite individually and checking pixels. Return false as placeholder
  // that doesn't break execution.
  return false;
}
