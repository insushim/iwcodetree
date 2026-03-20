"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { ScratchRuntime } from "@/lib/runtime/ScratchRuntime";

interface ScratchStageProps {
  width?: number;
  height?: number;
  runtime: ScratchRuntime | null;
}

const STAGE_W = 480;
const STAGE_H = 360;

export function ScratchStage({ width, height, runtime }: ScratchStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const [askVisible, setAskVisible] = useState(false);
  const [askQuestion, setAskQuestion] = useState("");
  const [askInput, setAskInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Resolve actual display dimensions
  const [dims, setDims] = useState({
    w: width ?? STAGE_W,
    h: height ?? STAGE_H,
  });

  useEffect(() => {
    if (width && height) {
      setDims({ w: width, h: height });
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = Math.round((w / STAGE_W) * STAGE_H);
        setDims({ w, h });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  // Coordinate helpers
  const toStageX = useCallback((clientX: number, rect: DOMRect) => {
    const scaleX = STAGE_W / rect.width;
    return (clientX - rect.left) * scaleX - STAGE_W / 2;
  }, []);
  const toStageY = useCallback((clientY: number, rect: DOMRect) => {
    const scaleY = STAGE_H / rect.height;
    return STAGE_H / 2 - (clientY - rect.top) * scaleY;
  }, []);

  // ---- Render loop ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !runtime) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dims.w * dpr;
    canvas.height = dims.h * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const scaleX = dims.w / STAGE_W;
    const scaleY = dims.h / STAGE_H;

    const draw = () => {
      ctx.save();
      ctx.scale(scaleX, scaleY);

      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, STAGE_W, STAGE_H);

      // Light grid
      ctx.strokeStyle = "#f0f0f0";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= STAGE_W; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, STAGE_H);
        ctx.stroke();
      }
      for (let y = 0; y <= STAGE_H; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(STAGE_W, y);
        ctx.stroke();
      }

      // Custom background
      if (runtime.bgColor) {
        ctx.fillStyle = runtime.bgColor;
        ctx.fillRect(0, 0, STAGE_W, STAGE_H);
      } else {
        // Center crosshair (dashed)
        ctx.strokeStyle = "#ccc";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(STAGE_W / 2, 0);
        ctx.lineTo(STAGE_W / 2, STAGE_H);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, STAGE_H / 2);
        ctx.lineTo(STAGE_W, STAGE_H / 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Pen trails
      ctx.drawImage(runtime.penCanvas, 0, 0);

      // Game objects (enemies, items, bullets, etc.)
      for (const obj of runtime.gameObjects) {
        if (obj.visible === false) continue;
        const ox = obj.x + STAGE_W / 2;
        const oy = STAGE_H / 2 - obj.y;
        const os = (obj.size || 100) / 100;
        ctx.save();
        ctx.translate(ox, oy);
        if (obj.direction) ctx.rotate(((obj.direction - 90) * Math.PI) / 180);
        ctx.scale(os, os);
        ctx.font = "36px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(obj.emoji, 0, 0);
        ctx.restore();
      }

      // Sprite
      const sp = runtime.sprite;
      if (sp.visible) {
        const cx = sp.x + STAGE_W / 2;
        const cy = STAGE_H / 2 - sp.y;
        const scale = sp.size / 100;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(((sp.direction - 90) * Math.PI) / 180);
        ctx.scale(scale, scale);
        ctx.globalAlpha = Math.max(0, 1 - sp.effects.ghost / 100);
        ctx.font = "36px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(sp.emoji, 0, 0);
        ctx.restore();

        // Speech bubble
        if (sp.speech) {
          drawSpeechBubble(ctx, cx, cy, scale, sp.speech.text, sp.speech.type);
        }
      }

      // Variable display
      if (sp.variables.size > 0) {
        ctx.save();
        ctx.font = "12px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        let vy = 8;
        sp.variables.forEach((val, key) => {
          const label = `${key}: ${val}`;
          const tw = ctx.measureText(label).width;
          ctx.fillStyle = "rgba(0,0,0,0.55)";
          ctx.beginPath();
          ctx.roundRect(6, vy - 2, tw + 10, 18, 4);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.fillText(label, 11, vy);
          vy += 22;
        });
        ctx.restore();
      }

      ctx.restore();

      // Ask UI state sync
      if (runtime.askActive !== askVisible) {
        setAskVisible(runtime.askActive);
        setAskQuestion(runtime.askQuestion);
        setAskInput("");
        if (runtime.askActive) {
          setTimeout(() => inputRef.current?.focus(), 0);
        }
      }
    };

    runtime.onRender(draw);
    // Initial draw
    draw();

    return () => {
      runtime.onRender(() => {});
      cancelAnimationFrame(rafRef.current);
    };
  }, [runtime, dims, askVisible]);

  // ---- Mouse events ----
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!runtime) return;
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      runtime.stage.mouseX = toStageX(e.clientX, rect);
      runtime.stage.mouseY = toStageY(e.clientY, rect);
    },
    [runtime, toStageX, toStageY],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!runtime) return;
      runtime.stage.mouseDown = true;
      // check sprite click (simple bounding box)
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const sx = toStageX(e.clientX, rect);
      const sy = toStageY(e.clientY, rect);
      const sp = runtime.sprite;
      if (sp.visible) {
        const hw = (24 * sp.size) / 100;
        const hh = (24 * sp.size) / 100;
        if (Math.abs(sx - sp.x) < hw && Math.abs(sy - sp.y) < hh) {
          runtime.handleSpriteClick();
        }
      }
    },
    [runtime, toStageX, toStageY],
  );

  const handleMouseUp = useCallback(() => {
    if (runtime) runtime.stage.mouseDown = false;
  }, [runtime]);

  // ---- Keyboard ----
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (!runtime) return;
      // Prevent arrow keys / space from scrolling the page
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
      ) {
        e.preventDefault();
      }
      runtime.handleKeyDown(e.key);
    },
    [runtime],
  );

  const handleKeyUp = useCallback(
    (e: ReactKeyboardEvent) => {
      if (!runtime) return;
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
      ) {
        e.preventDefault();
      }
      runtime.handleKeyUp(e.key);
    },
    [runtime],
  );

  // Auto-focus canvas when runtime starts
  useEffect(() => {
    if (runtime?.isRunning() && canvasRef.current) {
      canvasRef.current.focus();
    }
  });

  // ---- Ask submit ----
  const handleAskSubmit = useCallback(() => {
    if (!runtime) return;
    runtime.submitAnswer(askInput);
    setAskVisible(false);
    setAskInput("");
  }, [runtime, askInput]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: width ?? "100%",
        height: dims.h,
        overflow: "hidden",
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        background: "#fff",
      }}
    >
      <canvas
        ref={canvasRef}
        tabIndex={0}
        style={{
          width: dims.w,
          height: dims.h,
          outline: "none",
          cursor: "pointer",
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />

      {/* Ask input overlay */}
      {askVisible && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(255,255,255,0.95)",
            borderTop: "1px solid #e2e8f0",
            padding: "8px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {askQuestion && (
            <div
              style={{
                fontSize: 13,
                color: "#374151",
                fontWeight: 500,
              }}
            >
              {askQuestion}
            </div>
          )}
          <div style={{ display: "flex", gap: 6 }}>
            <input
              ref={inputRef}
              type="text"
              value={askInput}
              onChange={(e) => setAskInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                  handleAskSubmit();
                }
              }}
              style={{
                flex: 1,
                padding: "6px 10px",
                border: "1px solid #d1d5db",
                borderRadius: 6,
                fontSize: 14,
                outline: "none",
              }}
              autoFocus
            />
            <button
              onClick={handleAskSubmit}
              style={{
                padding: "6px 16px",
                background: "#4C97FF",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 14,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Speech bubble helper
// ---------------------------------------------------------------------------

function drawSpeechBubble(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  text: string,
  type: "say" | "think",
): void {
  ctx.save();
  ctx.font = "14px sans-serif";
  const metrics = ctx.measureText(text);
  const pw = Math.max(metrics.width + 16, 40);
  const ph = 28;
  const px = cx - pw / 2;
  const py = cy - 24 * scale - ph - 10;

  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 1;

  if (type === "say") {
    // Rounded rect + tail triangle
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, 8);
    ctx.fill();
    ctx.stroke();
    // Tail
    ctx.beginPath();
    ctx.moveTo(cx - 6, py + ph);
    ctx.lineTo(cx, py + ph + 8);
    ctx.lineTo(cx + 6, py + ph);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx - 6, py + ph);
    ctx.lineTo(cx, py + ph + 8);
    ctx.lineTo(cx + 6, py + ph);
    ctx.strokeStyle = "#888";
    ctx.stroke();
  } else {
    // Think bubble: rounded rect + thought dots
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx - 4, py + ph + 5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx - 8, py + ph + 12, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, px + pw / 2, py + ph / 2);
  ctx.restore();
}
