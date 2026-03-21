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
      className="h-16 flex items-center px-6 gap-4 flex-shrink-0 relative z-10"
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(241, 245, 249, 0.8)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Link
        href="/dashboard"
        className="flex items-center gap-3 font-black text-xl mr-4 group"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{
            background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
            boxShadow: "0 4px 16px rgba(99, 102, 241, 0.4)",
          }}
        >
          <Blocks
            className="w-5 h-5 text-white"
            style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))" }}
          />
        </div>
        <span
          className="hidden sm:inline bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-extrabold tracking-tight"
          style={{ textShadow: "0 1px 2px rgba(99, 102, 241, 0.1)" }}
        >
          CodeBlock
        </span>
      </Link>

      <div className="flex-1 max-w-lg">
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300"
            style={{ color: "#94A3B8" }}
          />
          <input
            type="text"
            placeholder="프로젝트 검색..."
            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 group-focus-within:scale-[1.02]"
            style={{
              background: "rgba(248, 250, 252, 0.8)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
            onFocus={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.95)";
              e.target.style.border = "1px solid rgba(99, 102, 241, 0.3)";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(99, 102, 241, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08)";
            }}
            onBlur={(e) => {
              e.target.style.background = "rgba(248, 250, 252, 0.8)";
              e.target.style.border = "1px solid rgba(226, 232, 240, 0.8)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
            }}
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <div
          className="px-4 py-2 rounded-xl flex items-center gap-2"
          style={{
            background:
              "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
          }}
        >
          <LevelBadge level={level} />
        </div>
        <div
          className="px-3 py-1 rounded-lg"
          style={{
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
          }}
        >
          <XPBar current={xpInLevel} max={xpForLevel || 1} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-3 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group relative"
          style={{
            background: "rgba(248, 250, 252, 0.8)",
            color: "#64748B",
            border: "1px solid rgba(226, 232, 240, 0.8)",
          }}
        >
          <Bell className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          <div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
            style={{
              background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
              boxShadow: "0 0 6px rgba(239, 68, 68, 0.6)",
            }}
          />
        </button>

        <Link
          href="/settings"
          className="p-3 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
          style={{
            background: "rgba(248, 250, 252, 0.8)",
            color: "#64748B",
            border: "1px solid rgba(226, 232, 240, 0.8)",
          }}
        >
          <Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
        </Link>

        <Link href="/profile" className="group ml-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden"
            style={{
              background: user?.avatarBgColor
                ? `linear-gradient(135deg, ${user.avatarBgColor} 0%, ${user.avatarBgColor}DD 100%)`
                : "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
              boxShadow: "0 4px 16px rgba(99, 102, 241, 0.3)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3Ccircle cx='25' cy='25' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            />
            <span
              className="relative z-10"
              style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              {user?.avatarEmoji || initials}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
