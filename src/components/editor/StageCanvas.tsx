"use client";

import { useEffect, useRef } from "react";

interface StageCanvasProps {
  width?: number;
  height?: number;
}

export function StageCanvas({ width = 480, height = 360 }: StageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Default render: white background with grid
    const render = () => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // Grid lines
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
      ctx.strokeStyle = "#CBD5E1";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3D Cat Character
      const centerX = width / 2;
      const centerY = height / 2;

      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 35, 25, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Body (oval)
      const bodyGradient = ctx.createRadialGradient(
        centerX - 5,
        centerY + 10,
        0,
        centerX,
        centerY + 15,
        25,
      );
      bodyGradient.addColorStop(0, "#FFB366");
      bodyGradient.addColorStop(1, "#FF9933");
      ctx.fillStyle = bodyGradient;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 15, 18, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head (circle)
      const headGradient = ctx.createRadialGradient(
        centerX - 8,
        centerY - 15,
        0,
        centerX,
        centerY - 10,
        30,
      );
      headGradient.addColorStop(0, "#FFD699");
      headGradient.addColorStop(1, "#FFB366");
      ctx.fillStyle = headGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 10, 25, 0, Math.PI * 2);
      ctx.fill();

      // Left ear
      ctx.fillStyle = "#FF9933";
      ctx.beginPath();
      ctx.moveTo(centerX - 15, centerY - 25);
      ctx.lineTo(centerX - 8, centerY - 35);
      ctx.lineTo(centerX - 5, centerY - 20);
      ctx.closePath();
      ctx.fill();

      // Left ear inner
      ctx.fillStyle = "#FFB3D9";
      ctx.beginPath();
      ctx.moveTo(centerX - 12, centerY - 25);
      ctx.lineTo(centerX - 8, centerY - 30);
      ctx.lineTo(centerX - 8, centerY - 22);
      ctx.closePath();
      ctx.fill();

      // Right ear
      ctx.fillStyle = "#FF9933";
      ctx.beginPath();
      ctx.moveTo(centerX + 15, centerY - 25);
      ctx.lineTo(centerX + 8, centerY - 35);
      ctx.lineTo(centerX + 5, centerY - 20);
      ctx.closePath();
      ctx.fill();

      // Right ear inner
      ctx.fillStyle = "#FFB3D9";
      ctx.beginPath();
      ctx.moveTo(centerX + 12, centerY - 25);
      ctx.lineTo(centerX + 8, centerY - 30);
      ctx.lineTo(centerX + 8, centerY - 22);
      ctx.closePath();
      ctx.fill();

      // Left eye (white)
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.ellipse(centerX - 8, centerY - 15, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Left eye (pupil)
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(centerX - 8, centerY - 13, 4, 0, Math.PI * 2);
      ctx.fill();

      // Left eye (reflection)
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(centerX - 6, centerY - 15, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Right eye (white)
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.ellipse(centerX + 8, centerY - 15, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Right eye (pupil)
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(centerX + 8, centerY - 13, 4, 0, Math.PI * 2);
      ctx.fill();

      // Right eye (reflection)
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(centerX + 10, centerY - 15, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = "#FF6699";
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 8);
      ctx.lineTo(centerX - 3, centerY - 3);
      ctx.lineTo(centerX + 3, centerY - 3);
      ctx.closePath();
      ctx.fill();

      // Mouth
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 3);
      ctx.lineTo(centerX, centerY + 1);
      ctx.moveTo(centerX, centerY + 1);
      ctx.quadraticCurveTo(centerX - 4, centerY + 4, centerX - 8, centerY + 1);
      ctx.moveTo(centerX, centerY + 1);
      ctx.quadraticCurveTo(centerX + 4, centerY + 4, centerX + 8, centerY + 1);
      ctx.stroke();

      // Whiskers
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1.5;
      // Left whiskers
      ctx.beginPath();
      ctx.moveTo(centerX - 20, centerY - 8);
      ctx.lineTo(centerX - 12, centerY - 6);
      ctx.moveTo(centerX - 20, centerY - 4);
      ctx.lineTo(centerX - 12, centerY - 4);
      ctx.moveTo(centerX - 20, centerY);
      ctx.lineTo(centerX - 12, centerY - 2);
      // Right whiskers
      ctx.moveTo(centerX + 20, centerY - 8);
      ctx.lineTo(centerX + 12, centerY - 6);
      ctx.moveTo(centerX + 20, centerY - 4);
      ctx.lineTo(centerX + 12, centerY - 4);
      ctx.moveTo(centerX + 20, centerY);
      ctx.lineTo(centerX + 12, centerY - 2);
      ctx.stroke();

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ width, height }} className="block" />;
}
