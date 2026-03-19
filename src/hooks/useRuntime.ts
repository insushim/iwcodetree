"use client";

import { useRef, useCallback, useEffect } from "react";
import { useEditorStore } from "@/stores/editorStore";
import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  TARGET_FPS,
  FRAME_DURATION_MS,
} from "@/lib/utils/constants";
import { EventBus } from "@/lib/engine/event-bus";

export interface RuntimeSprite {
  id: string;
  x: number;
  y: number;
  size: number;
  direction: number;
  visible: boolean;
  costumeDataUrl: string;
}

export function useRuntime() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);
  const eventBusRef = useRef(new EventBus());
  const runtimeSpritesRef = useRef<RuntimeSprite[]>([]);

  const syncSprites = useCallback(() => {
    const sprites = useEditorStore.getState().sprites;
    runtimeSpritesRef.current = sprites.map((s) => ({
      id: s.id,
      x: s.x,
      y: s.y,
      size: s.size,
      direction: s.direction,
      visible: s.visible,
      costumeDataUrl: s.costumeDataUrl,
    }));
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const backdrop = useEditorStore.getState().currentBackdrop;
    ctx.fillStyle = backdrop;
    ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

    for (const sprite of runtimeSpritesRef.current) {
      if (!sprite.visible) continue;
      // Convert Scratch coords (center origin) to canvas coords (top-left origin)
      const cx = sprite.x + STAGE_WIDTH / 2;
      const cy = STAGE_HEIGHT / 2 - sprite.y;
      const scale = sprite.size / 100;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(((sprite.direction - 90) * Math.PI) / 180);
      ctx.scale(scale, scale);

      // Draw placeholder if no costume
      ctx.fillStyle = "#7c3aed";
      ctx.fillRect(-24, -24, 48, 48);
      ctx.fillStyle = "#fff";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("S", 0, 0);

      ctx.restore();
    }
  }, []);

  const tick = useCallback(
    (timestamp: number) => {
      if (timestamp - lastTickRef.current >= FRAME_DURATION_MS) {
        lastTickRef.current = timestamp;
        eventBusRef.current.emit("tick");
        render();
      }
      if (useEditorStore.getState().isRunning) {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    },
    [render],
  );

  const start = useCallback(() => {
    syncSprites();
    useEditorStore.getState().setRunning(true);
    eventBusRef.current.emit("greenFlag");
    lastTickRef.current = 0;
    animFrameRef.current = requestAnimationFrame(tick);
  }, [syncSprites, tick]);

  const stop = useCallback(() => {
    useEditorStore.getState().setRunning(false);
    cancelAnimationFrame(animFrameRef.current);
    eventBusRef.current.emit("stopAll");
  }, []);

  const step = useCallback(() => {
    syncSprites();
    eventBusRef.current.emit("tick");
    render();
  }, [syncSprites, render]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return {
    canvasRef,
    eventBus: eventBusRef.current,
    start,
    stop,
    step,
    targetFps: TARGET_FPS,
  };
}
