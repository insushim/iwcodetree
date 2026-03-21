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
    <aside
      className="w-[80px] flex flex-col items-center py-6 gap-3 flex-shrink-0 relative"
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(241, 245, 249, 0.8)",
      }}
    >
      {/* Left accent line for glass effect */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.3) 50%, transparent 100%)",
        }}
      />

      {navItems.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="group relative w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 text-xs font-semibold hover:scale-110 active:scale-95"
            style={
              active
                ? {
                    background:
                      "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                    color: "#FFFFFF",
                    boxShadow:
                      "0 8px 24px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)",
                  }
                : {
                    background: "rgba(248, 250, 252, 0.6)",
                    color: "#64748B",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                  }
            }
            title={item.label}
          >
            {active && (
              <>
                <div
                  className="absolute inset-0 rounded-2xl opacity-20"
                  style={{
                    background:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='40' cy='40' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  }}
                />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 0 8px rgba(255, 255, 255, 0.6)",
                  }}
                />
              </>
            )}

            <item.icon
              className="w-6 h-6 relative z-10"
              style={
                active
                  ? { filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))" }
                  : { transition: "all 0.3s ease" }
              }
            />
            <span
              className="text-[9px] leading-none relative z-10 font-bold tracking-wide"
              style={
                active ? { textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" } : {}
              }
            >
              {item.label}
            </span>

            {/* Hover glow effect */}
            {!active && (
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                }}
              />
            )}
          </Link>
        );
      })}
    </aside>
  );
}
