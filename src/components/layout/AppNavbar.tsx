"use client";

import Link from "next/link";
import { Blocks, Search, Bell, Settings } from "lucide-react";
import { XPBar } from "@/components/gamification/XPBar";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { useUserStore } from "@/stores/userStore";

const XP_THRESHOLDS = [
  0, 50, 200, 450, 800, 1250, 1800, 2450, 3200, 4050, 5000,
];

export function AppNavbar() {
  const { user, level, xp } = useUserStore();
  const currentThreshold = XP_THRESHOLDS[level - 1] || 0;
  const nextThreshold =
    XP_THRESHOLDS[level] || XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  const xpInLevel = xp - currentThreshold;
  const xpForLevel = nextThreshold - currentThreshold;
  const initials = user?.displayName
    ? user.displayName.slice(0, 2)
    : user?.username?.slice(0, 2) || "??";

  return (
    <header
      className="h-14 flex items-center px-4 gap-4 flex-shrink-0"
      style={{ borderBottom: "1px solid #F1F5F9", background: "#FFFFFF" }}
    >
      <Link
        href="/dashboard"
        className="flex items-center gap-2 font-black text-lg mr-2"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "#6366F1" }}
        >
          <Blocks className="w-4 h-4 text-white" />
        </div>
        <span className="gradient-text hidden sm:inline">CodeBlock</span>
      </Link>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "#94A3B8" }}
          />
          <input
            type="text"
            placeholder="프로젝트 검색..."
            className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none"
            style={{ border: "1px solid #F1F5F9", background: "#F8FAFC" }}
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <LevelBadge level={level} />
        <XPBar current={xpInLevel} max={xpForLevel || 1} />
      </div>

      <div className="flex items-center gap-1">
        <button
          className="p-2 rounded-lg transition-colors relative"
          style={{ color: "#94A3B8" }}
        >
          <Bell className="w-5 h-5" />
        </button>
        <Link
          href="/settings"
          className="p-2 rounded-lg transition-colors"
          style={{ color: "#94A3B8" }}
        >
          <Settings className="w-5 h-5" />
        </Link>
        <Link href="/profile">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ml-1"
            style={{ background: user?.avatarBgColor || "#6366F1" }}
          >
            {user?.avatarEmoji || initials}
          </div>
        </Link>
      </div>
    </header>
  );
}
