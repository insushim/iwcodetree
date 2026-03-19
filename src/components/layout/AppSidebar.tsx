"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Compass,
  Swords,
  UserCircle,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "대시보드" },
  { href: "/learn", icon: Map, label: "학습" },
  { href: "/explore", icon: Compass, label: "탐험" },
  { href: "/challenges", icon: Swords, label: "챌린지" },
  { href: "/profile", icon: UserCircle, label: "프로필" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[72px] bg-[var(--bg-sidebar)] border-r border-[var(--border-light)] flex flex-col items-center py-4 gap-2 flex-shrink-0">
      {navItems.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all text-xs font-semibold ${
              active
                ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                : "text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-[var(--border-light)]"
            }`}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] leading-none">{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
