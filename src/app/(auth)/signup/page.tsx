"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Supabase auth
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl shadow-lg border border-[var(--border-light)] p-8">
      <h1 className="text-2xl font-black text-center mb-2">회원가입</h1>
      <p className="text-sm text-[var(--text-3)] text-center mb-8">
        코딩 여행을 시작해볼까요?
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role selector */}
        <div className="flex gap-2 p-1 bg-[var(--bg-main)] rounded-xl">
          {(["student", "teacher"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                role === r
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "text-[var(--text-3)] hover:text-[var(--text-2)]"
              }`}
            >
              {r === "student" ? "🎮 학생" : "📚 선생님"}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-bold mb-1.5 text-[var(--text-2)]">
            닉네임
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-3)]" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="멋진 닉네임을 정해주세요"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1.5 text-[var(--text-2)]">
            이메일
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-3)]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@codeblock.kr"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1.5 text-[var(--text-2)]">
            비밀번호
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-3)]" />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상 비밀번호"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all text-sm"
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-1)]"
            >
              {showPw ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={loading}
          icon={<Rocket className="w-5 h-5" />}
        >
          시작하기
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text-3)]">
        이미 계정이 있나요?{" "}
        <Link
          href="/login"
          className="text-[var(--primary)] font-bold hover:underline"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
