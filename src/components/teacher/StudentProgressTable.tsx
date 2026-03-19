"use client";

import { ProgressBar } from "@/components/ui/ProgressBar";

const students = [
  { name: "김민수", level: 5, missions: 12, xp: 980, progress: 33 },
  { name: "이서연", level: 8, missions: 22, xp: 2100, progress: 61 },
  { name: "박준호", level: 6, missions: 15, xp: 1350, progress: 42 },
  { name: "최수아", level: 10, missions: 30, xp: 3200, progress: 83 },
  { name: "정현우", level: 7, missions: 18, xp: 1800, progress: 50 },
];

export function StudentProgressTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[var(--text-3)] border-b border-[var(--border-light)]">
            <th className="pb-3 font-bold">학생</th>
            <th className="pb-3 font-bold">레벨</th>
            <th className="pb-3 font-bold">미션</th>
            <th className="pb-3 font-bold">XP</th>
            <th className="pb-3 font-bold w-40">진행도</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-light)]">
          {students.map((s) => (
            <tr key={s.name} className="hover:bg-[var(--bg-main)]">
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-xs font-bold text-[var(--primary)]">
                    {s.name[0]}
                  </div>
                  <span className="font-semibold">{s.name}</span>
                </div>
              </td>
              <td className="py-3 font-bold">Lv.{s.level}</td>
              <td className="py-3">{s.missions}/36</td>
              <td className="py-3 font-bold text-[var(--primary)]">
                {s.xp.toLocaleString()}
              </td>
              <td className="py-3">
                <ProgressBar
                  value={s.progress}
                  size="sm"
                  color={
                    s.progress > 70
                      ? "secondary"
                      : s.progress > 40
                        ? "primary"
                        : "accent"
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
