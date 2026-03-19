"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Supabase auth
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl shadow-lg border border-[var(--border-light)] p-8">
      <h1 className="text-2xl font-black text-center mb-2">로그인</h1>
      <p className="text-sm text-[var(--text-3)] text-center mb-8">
        다시 만나서 반가워요!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="비밀번호를 입력하세요"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all text-sm"
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
          icon={<LogIn className="w-5 h-5" />}
        >
          로그인
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border-light)]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-[var(--bg-card)] text-[var(--text-3)] font-semibold">
              또는
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <button className="w-full py-3 px-4 rounded-xl border border-[var(--border)] hover:bg-[var(--border-light)] transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
            <span className="text-lg">G</span>
            Google로 로그인
          </button>
          <button className="w-full py-3 px-4 rounded-xl border border-[var(--border)] hover:bg-[var(--border-light)] transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
            <span className="text-lg">🍎</span>
            Apple로 로그인
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-[var(--text-3)]">
        아직 계정이 없나요?{" "}
        <Link
          href="/signup"
          className="text-[var(--primary)] font-bold hover:underline"
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
