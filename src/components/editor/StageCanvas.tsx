"use client";

import { useEffect, useRef } from "react";

interface StageCanvasProps {
  width?: number;
  height?: number;
}

function drawScratchCat(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // === BODY ===
  // Belly (lighter orange oval)
  ctx.fillStyle = "#FFCC80";
  ctx.beginPath();
  ctx.ellipse(0, 28, 22, 26, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body outline
  ctx.strokeStyle = "#E08A1E";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, 28, 22, 26, 0, 0, Math.PI * 2);
  ctx.stroke();

  // White belly patch
  ctx.fillStyle = "#FFF3E0";
  ctx.beginPath();
  ctx.ellipse(0, 32, 13, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // === ARMS ===
  ctx.fillStyle = "#FFAB40";
  ctx.strokeStyle = "#E08A1E";
  ctx.lineWidth = 2;
  // Left arm
  ctx.beginPath();
  ctx.ellipse(-26, 24, 8, 14, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Right arm
  ctx.beginPath();
  ctx.ellipse(26, 24, 8, 14, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // === FEET ===
  ctx.fillStyle = "#FFAB40";
  // Left foot
  ctx.beginPath();
  ctx.ellipse(-10, 54, 12, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Right foot
  ctx.beginPath();
  ctx.ellipse(10, 54, 12, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // === HEAD ===
  // Ears (behind head)
  // Left ear
  ctx.fillStyle = "#FFAB40";
  ctx.beginPath();
  ctx.moveTo(-22, -18);
  ctx.lineTo(-30, -52);
  ctx.lineTo(-6, -28);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#E08A1E";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Left ear inner
  ctx.fillStyle = "#FF8A80";
  ctx.beginPath();
  ctx.moveTo(-20, -22);
  ctx.lineTo(-26, -44);
  ctx.lineTo(-10, -28);
  ctx.closePath();
  ctx.fill();

  // Right ear
  ctx.fillStyle = "#FFAB40";
  ctx.beginPath();
  ctx.moveTo(22, -18);
  ctx.lineTo(30, -52);
  ctx.lineTo(6, -28);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#E08A1E";
  ctx.stroke();

  // Right ear inner
  ctx.fillStyle = "#FF8A80";
  ctx.beginPath();
  ctx.moveTo(20, -22);
  ctx.lineTo(26, -44);
  ctx.lineTo(10, -28);
  ctx.closePath();
  ctx.fill();

  // Head circle
  const headGrad = ctx.createRadialGradient(-6, -14, 2, 0, -8, 32);
  headGrad.addColorStop(0, "#FFD54F");
  headGrad.addColorStop(0.6, "#FFAB40");
  headGrad.addColorStop(1, "#FF9100");
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.arc(0, -8, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#E08A1E";
  ctx.lineWidth = 2;
  ctx.stroke();

  // === EYES ===
  // White
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.ellipse(-11, -14, 10, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#424242";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.ellipse(11, -14, 10, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#424242";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Pupils
  ctx.fillStyle = "#212121";
  ctx.beginPath();
  ctx.arc(-9, -12, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(13, -12, 5, 0, Math.PI * 2);
  ctx.fill();

  // Eye shine
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(-7, -15, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(15, -15, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Small secondary shine
  ctx.beginPath();
  ctx.arc(-11, -10, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(11, -10, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // === NOSE ===
  ctx.fillStyle = "#E57373";
  ctx.beginPath();
  ctx.moveTo(0, -4);
  ctx.lineTo(-4, 1);
  ctx.lineTo(4, 1);
  ctx.closePath();
  ctx.fill();

  // === MOUTH ===
  ctx.strokeStyle = "#5D4037";
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 1);
  ctx.lineTo(0, 5);
  ctx.stroke();
  ctx.beginPath();
  ctx.quadraticCurveTo(-5, 9, -10, 5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.quadraticCurveTo(5, 9, 10, 5);
  ctx.stroke();

  // === WHISKERS ===
  ctx.strokeStyle = "#5D4037";
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  // Left
  ctx.beginPath();
  ctx.moveTo(-14, -2);
  ctx.lineTo(-34, -8);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-14, 2);
  ctx.lineTo(-34, 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-14, 5);
  ctx.lineTo(-32, 10);
  ctx.stroke();
  // Right
  ctx.beginPath();
  ctx.moveTo(14, -2);
  ctx.lineTo(34, -8);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(14, 2);
  ctx.lineTo(34, 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(14, 5);
  ctx.lineTo(32, 10);
  ctx.stroke();

  // === TAIL ===
  ctx.strokeStyle = "#FFAB40";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(18, 40);
  ctx.quadraticCurveTo(38, 30, 34, 10);
  ctx.quadraticCurveTo(30, -4, 38, -14);
  ctx.stroke();
  ctx.strokeStyle = "#E08A1E";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(18, 40);
  ctx.quadraticCurveTo(38, 30, 34, 10);
  ctx.quadraticCurveTo(30, -4, 38, -14);
  ctx.stroke();

  ctx.restore();
}

export function StageCanvas({ width = 480, height = 360 }: StageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    // Subtle grid
    ctx.strokeStyle = "#F1F5F9";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Center crosshair
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Shadow under cat
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.beginPath();
    ctx.ellipse(width / 2, height / 2 + 48, 30, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw Scratch-style cat
    const catScale = Math.min(width, height) / 200;
    drawScratchCat(ctx, width / 2, height / 2 - 8, catScale);
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ width, height }} className="block" />;
}
