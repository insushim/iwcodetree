"use client";

import { useState, useEffect } from "react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ background: "#F8FAFC" }}
      >
        <div className="text-center">
          <div
            className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
            style={{ background: "#6366F1" }}
          >
            <span className="text-white text-lg font-bold">C</span>
          </div>
          <p className="text-sm font-semibold" style={{ color: "#94A3B8" }}>
            로딩 중...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: "#F8FAFC" }}>
      <AppNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
