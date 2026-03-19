"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Square,
  Save,
  Share2,
  Code,
  Undo,
  Redo,
  Blocks,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EditorToolbarProps {
  projectId: string;
  running: boolean;
  onRun: () => void;
  onStop: () => void;
  showCode: boolean;
  onToggleCode: () => void;
}

export function EditorToolbar({
  projectId,
  running,
  onRun,
  onStop,
  showCode,
  onToggleCode,
}: EditorToolbarProps) {
  return (
    <div className="h-12 border-b border-[var(--border-light)] bg-[var(--bg-card)] flex items-center px-3 gap-2 flex-shrink-0">
      <Link
        href="/dashboard"
        className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <div className="flex items-center gap-1 mr-2">
        <div className="w-6 h-6 rounded bg-[var(--primary)] flex items-center justify-center">
          <Blocks className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-[var(--text-2)] max-w-[160px] truncate">
          프로젝트 #{projectId}
        </span>
      </div>

      <div className="h-6 w-px bg-[var(--border-light)]" />

      {/* Undo/Redo */}
      <button className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)] transition-colors">
        <Undo className="w-4 h-4" />
      </button>
      <button className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)] transition-colors">
        <Redo className="w-4 h-4" />
      </button>

      <div className="h-6 w-px bg-[var(--border-light)]" />

      {/* Run/Stop */}
      {!running ? (
        <Button
          size="sm"
          variant="secondary"
          icon={<Play className="w-4 h-4" />}
          onClick={onRun}
        >
          실행
        </Button>
      ) : (
        <Button
          size="sm"
          variant="danger"
          icon={<Square className="w-4 h-4" />}
          onClick={onStop}
        >
          정지
        </Button>
      )}

      <div className="flex-1" />

      {/* Code toggle */}
      <button
        onClick={onToggleCode}
        className={`p-2 rounded-lg transition-colors ${
          showCode
            ? "bg-[var(--primary)]/10 text-[var(--primary)]"
            : "hover:bg-[var(--border-light)] text-[var(--text-3)]"
        }`}
        title="코드 보기"
      >
        <Code className="w-5 h-5" />
      </button>

      <Button size="sm" variant="ghost" icon={<Save className="w-4 h-4" />}>
        저장
      </Button>
      <Button size="sm" variant="ghost" icon={<Share2 className="w-4 h-4" />}>
        공유
      </Button>
    </div>
  );
}
