"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Globe,
  Save,
  UserCog,
  Check,
} from "lucide-react";
import { useUserStore } from "@/stores/userStore";

export default function SettingsPage() {
  const { user, settings, updateSettings, setUser } = useUserStore();
  const [theme, setTheme] = useState(settings.theme);
  const [sound, setSound] = useState(settings.sound);
  const [language, setLanguage] = useState(settings.language);
  const [role, setRole] = useState(user?.role || "student");
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setRole(user?.role || "student");
    setDisplayName(user?.displayName || "");
  }, [user]);

  const handleSave = () => {
    updateSettings({ theme, sound, language });
    if (user) {
      setUser({ ...user, role, displayName });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black">설정</h1>
        <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
          나에게 맞는 환경을 설정하세요
        </p>
      </div>

      {/* Profile */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
      >
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <UserCog className="w-5 h-5" style={{ color: "#6366F1" }} />
          프로필
        </h3>
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-bold mb-1.5"
              style={{ color: "#475569" }}
            >
              표시 이름
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
            />
          </div>
          <div>
            <label
              className="block text-sm font-bold mb-1.5"
              style={{ color: "#475569" }}
            >
              역할
            </label>
            <div className="flex gap-2">
              {[
                {
                  key: "student" as const,
                  label: "🎮 학생",
                  desc: "미션을 풀고 코딩을 배워요",
                },
                {
                  key: "teacher" as const,
                  label: "📚 선생님",
                  desc: "학급을 관리하고 과제를 내요",
                },
              ].map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  className="flex-1 p-3 rounded-xl text-left transition-all"
                  style={
                    role === r.key
                      ? { background: "#EEF2FF", border: "2px solid #6366F1" }
                      : { background: "#F8FAFC", border: "2px solid #E2E8F0" }
                  }
                >
                  <div className="text-sm font-bold">{r.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>
                    {r.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Theme */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
      >
        <h3 className="font-bold mb-4">테마</h3>
        <div className="flex gap-3">
          {[
            { key: "light" as const, icon: Sun, label: "라이트" },
            { key: "dark" as const, icon: Moon, label: "다크" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              className="flex-1 p-4 rounded-xl flex flex-col items-center gap-2 transition-all"
              style={
                theme === t.key
                  ? { border: "2px solid #6366F1", background: "#EEF2FF" }
                  : { border: "2px solid #F1F5F9" }
              }
            >
              <t.icon className="w-6 h-6" />
              <span className="text-sm font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sound */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
      >
        <h3 className="font-bold mb-4">사운드</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {sound ? (
              <Volume2 className="w-5 h-5" style={{ color: "#6366F1" }} />
            ) : (
              <VolumeX className="w-5 h-5" style={{ color: "#94A3B8" }} />
            )}
            <div>
              <div className="font-bold text-sm">효과음</div>
              <div className="text-xs" style={{ color: "#94A3B8" }}>
                블록 연결, 완료 등의 소리
              </div>
            </div>
          </div>
          <button
            onClick={() => setSound(!sound)}
            className="w-12 h-7 rounded-full transition-colors relative"
            style={{ background: sound ? "#6366F1" : "#E2E8F0" }}
          >
            <div
              className="absolute top-1 w-5 h-5 rounded-full bg-white transition-transform"
              style={{
                left: sound ? 24 : 4,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            />
          </button>
        </div>
      </div>

      {/* Language */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
      >
        <h3 className="font-bold mb-4">언어</h3>
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5" style={{ color: "#6366F1" }} />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "ko" | "en")}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold outline-none"
            style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <Button
        icon={
          saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />
        }
        fullWidth
        size="lg"
        onClick={handleSave}
      >
        {saved ? "저장 완료!" : "저장하기"}
      </Button>
    </div>
  );
}
