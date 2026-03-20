"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Share2,
  Flag,
  Eye,
  Play,
  Square,
} from "lucide-react";
import { COMMUNITY_PROJECTS } from "@/lib/data/communityProjects";
import type { ScratchRuntime as ScratchRuntimeType } from "@/lib/runtime/ScratchRuntime";

export default function PlayClient() {
  const params = useParams();
  const projectId = params.id as string;

  const project = COMMUNITY_PROJECTS.find((p) => p.id === projectId);
  const runtimeRef = useRef<ScratchRuntimeType | null>(null);
  const [running, setRunning] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Dynamic imports for client-only modules
  const ScratchStageRef = useRef<
    typeof import("@/components/editor/ScratchStage").ScratchStage | null
  >(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [{ ScratchRuntime }, { ScratchStage }] = await Promise.all([
        import("@/lib/runtime/ScratchRuntime"),
        import("@/components/editor/ScratchStage"),
      ]);
      if (cancelled) return;
      runtimeRef.current = new ScratchRuntime();
      ScratchStageRef.current = ScratchStage;
      setMounted(true);
    })();
    return () => {
      cancelled = true;
      runtimeRef.current?.stop();
    };
  }, []);

  // Auto-play when mounted
  useEffect(() => {
    if (mounted && project && runtimeRef.current && !running) {
      runtimeRef.current.start(project.code);
      setRunning(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const handlePlay = () => {
    if (!project || !runtimeRef.current) return;
    runtimeRef.current.start(project.code);
    setRunning(true);
  };

  const handleStop = () => {
    runtimeRef.current?.stop();
    setRunning(false);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] flex flex-col items-center justify-center p-4">
        <p className="text-lg font-bold text-[var(--text-2)]">
          프로젝트를 찾을 수 없습니다
        </p>
        <Link
          href="/explore"
          className="mt-4 flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          탐험하기로 돌아가기
        </Link>
      </div>
    );
  }

  const StageComponent = ScratchStageRef.current;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[720px] flex items-center justify-between mb-4">
        <Link
          href="/explore"
          className="flex items-center gap-2 text-sm font-bold text-[var(--text-2)] hover:text-[var(--text-1)]"
        >
          <ArrowLeft className="w-4 h-4" />
          돌아가기
        </Link>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)]">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)]">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)]">
            <Flag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div
        className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-[var(--border-light)]"
        style={{ width: 700, height: 525 }}
      >
        {mounted && StageComponent && (
          <StageComponent
            width={700}
            height={525}
            runtime={runtimeRef.current}
          />
        )}
      </div>

      {/* Play / Stop controls */}
      <div className="w-full max-w-[720px] flex items-center gap-2 mt-3">
        {!running ? (
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-colors"
          >
            <Play className="w-4 h-4" />
            실행
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors"
          >
            <Square className="w-4 h-4" />
            정지
          </button>
        )}
      </div>

      {/* Project info */}
      <div className="w-full max-w-[720px] mt-4 bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] p-4">
        <h1 className="text-lg font-bold">
          {project.thumbnail} {project.name}
        </h1>
        <p className="text-sm text-[var(--text-3)] mt-1">
          작성자: {project.author}
        </p>
        <p className="text-sm text-[var(--text-2)] mt-2">
          {project.description}
        </p>
        <div className="flex items-center gap-4 mt-3 text-sm text-[var(--text-3)]">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" /> {project.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" /> {project.likes}
          </span>
        </div>
      </div>
    </div>
  );
}
