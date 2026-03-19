"use client";

import Link from "next/link";
import { Blocks, Search, Bell, Settings } from "lucide-react";
import { XPBar } from "@/components/gamification/XPBar";
import { LevelBadge } from "@/components/gamification/LevelBadge";

export function AppNavbar() {
  return (
    <header className="h-14 border-b border-[var(--border-light)] bg-[var(--bg-card)] flex items-center px-4 gap-4 flex-shrink-0">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 font-black text-lg mr-2"
      >
        <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
          <Blocks className="w-4 h-4 text-white" />
        </div>
        <span className="gradient-text hidden sm:inline">CodeBlock</span>
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-3)]" />
          <input
            type="text"
            placeholder="프로젝트 검색..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border-light)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] text-sm"
          />
        </div>
      </div>

      {/* XP + Level */}
      <div className="hidden md:flex items-center gap-3">
        <LevelBadge level={7} />
        <XPBar current={340} max={500} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--danger)]" />
        </button>
        <Link
          href="/settings"
          className="p-2 rounded-lg hover:bg-[var(--border-light)] text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors"
        >
          <Settings className="w-5 h-5" />
        </Link>
        <Link href="/profile">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white text-xs font-bold ml-1">
            JW
          </div>
        </Link>
      </div>
    </header>
  );
}
