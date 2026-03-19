"use client";

import { Trophy, Medal } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--border-light)] flex items-center gap-2">
        <Trophy className="w-5 h-5 text-[var(--accent)]" />
        <h3 className="font-bold">리더보드</h3>
      </div>
      <div className="divide-y divide-[var(--border-light)]">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--bg-main)] transition-colors"
          >
            <div className="w-8 text-center">
              {entry.rank <= 3 ? (
                <Medal
                  className={`w-5 h-5 mx-auto ${
                    entry.rank === 1
                      ? "text-[var(--accent)]"
                      : entry.rank === 2
                        ? "text-gray-400"
                        : "text-amber-700"
                  }`}
                />
              ) : (
                <span className="text-sm font-bold text-[var(--text-3)]">
                  {entry.rank}
                </span>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white text-xs font-bold">
              {entry.avatar}
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">{entry.name}</div>
              <div className="text-xs text-[var(--text-3)]">
                Lv.{entry.level}
              </div>
            </div>
            <div className="text-sm font-bold text-[var(--primary)]">
              {entry.xp.toLocaleString()} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
