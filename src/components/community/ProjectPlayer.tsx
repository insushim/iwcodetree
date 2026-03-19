"use client";

import { StageCanvas } from "@/components/editor/StageCanvas";
import { StageOverlay } from "@/components/editor/StageOverlay";
import { Play, Square, Flag } from "lucide-react";
import { useState } from "react";

interface ProjectPlayerProps {
  projectId: string;
}

export function ProjectPlayer({ projectId }: ProjectPlayerProps) {
  const [running, setRunning] = useState(false);

  return (
    <div className="relative">
      <div className="relative bg-white rounded-xl overflow-hidden border border-[var(--border-light)] shadow-sm">
        <StageCanvas width={480} height={360} />
        <StageOverlay />
      </div>
      <div className="flex items-center justify-center gap-2 mt-3">
        {!running ? (
          <button
            onClick={() => setRunning(true)}
            className="p-3 rounded-full bg-[var(--secondary)] text-white hover:brightness-110 shadow-md transition-all active:scale-95"
          >
            <Play className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={() => setRunning(false)}
            className="p-3 rounded-full bg-[var(--danger)] text-white hover:brightness-110 shadow-md transition-all active:scale-95"
          >
            <Square className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
