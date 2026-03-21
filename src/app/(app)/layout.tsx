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
        className="h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        {/* Animated background elements */}
        <div
          className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20"
          style={{
            background: "rgba(255, 255, 255, 0.3)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-32 h-32 rounded-full opacity-15"
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            animation: "pulse 3s ease-in-out infinite 1s",
          }}
        />

        <div className="text-center relative z-10">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center relative"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span
              className="text-2xl font-black"
              style={{
                background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              C
            </span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: "#FFFFFF",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            <p className="text-white font-semibold">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen flex flex-col relative"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      {/* Subtle animated background pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      <AppNavbar />
      <div className="flex flex-1 overflow-hidden relative">
        <AppSidebar />
        <main
          className="flex-1 overflow-y-auto p-8"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
