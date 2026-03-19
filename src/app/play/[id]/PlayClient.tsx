"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart, Share2, Flag, Eye } from "lucide-react";
import { StageCanvas } from "@/components/editor/StageCanvas";
import { StageOverlay } from "@/components/editor/StageOverlay";

export default function PlayClient() {
  const params = useParams();
  const projectId = params.id as string;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[520px] flex items-center justify-between mb-4">
        <Link href="/explore" className="flex items-center gap-2 text-sm font-bold text-[var(--text-2)] hover:text-[var(--text-1)]">
          <ArrowLeft className="w-4 h-4" />
          돌아가기
        </Link>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)]"><Heart className="w-5 h-5" /></button>
          <button className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)]"><Share2 className="w-5 h-5" /></button>
          <button className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)]"><Flag className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-[var(--border-light)]">
        <StageCanvas width={480} height={360} />
        <StageOverlay />
      </div>
      <div className="w-full max-w-[520px] mt-4 bg-[var(--bg-card)] rounded-xl border border-[var(--border-light)] p-4">
        <h1 className="text-lg font-bold">프로젝트 #{projectId}</h1>
        <p className="text-sm text-[var(--text-3)] mt-1">작성자: 코딩왕</p>
        <div className="flex items-center gap-4 mt-3 text-sm text-[var(--text-3)]">
          <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> 128</span>
          <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> 42</span>
        </div>
      </div>
    </div>
  );
}
