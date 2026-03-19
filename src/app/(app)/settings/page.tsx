"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sun, Moon, Volume2, VolumeX, Globe, Save } from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sound, setSound] = useState(true);
  const [language, setLanguage] = useState("ko");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black">설정</h1>
        <p className="text-sm text-[var(--text-3)] mt-1">
          나에게 맞는 환경을 설정하세요
        </p>
      </div>

      {/* Theme */}
      <Card header="테마">
        <div className="flex gap-3">
          {[
            { key: "light" as const, icon: Sun, label: "라이트" },
            { key: "dark" as const, icon: Moon, label: "다크" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                theme === t.key
                  ? "border-[var(--primary)] bg-[var(--primary)]/5"
                  : "border-[var(--border-light)] hover:border-[var(--border)]"
              }`}
            >
              <t.icon className="w-6 h-6" />
              <span className="text-sm font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Sound */}
      <Card header="사운드">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {sound ? (
              <Volume2 className="w-5 h-5 text-[var(--primary)]" />
            ) : (
              <VolumeX className="w-5 h-5 text-[var(--text-3)]" />
            )}
            <div>
              <div className="font-bold text-sm">효과음</div>
              <div className="text-xs text-[var(--text-3)]">
                블록 연결, 완료 등의 소리
              </div>
            </div>
          </div>
          <button
            onClick={() => setSound(!sound)}
            className={`w-12 h-7 rounded-full transition-colors relative ${sound ? "bg-[var(--primary)]" : "bg-[var(--border)]"}`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${sound ? "left-6" : "left-1"}`}
            />
          </button>
        </div>
      </Card>

      {/* Language */}
      <Card header="언어">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-[var(--primary)]" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </div>
      </Card>

      <Button icon={<Save className="w-4 h-4" />} fullWidth size="lg">
        저장하기
      </Button>
    </div>
  );
}
