"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = login(username, password);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "로그인에 실패했어요.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        border: "1px solid #F1F5F9",
        padding: 32,
      }}
    >
      <h1 className="text-2xl font-black text-center mb-2">로그인</h1>
      <p className="text-sm text-center mb-8" style={{ color: "#94A3B8" }}>
        다시 만나서 반가워요!
      </p>

      {error && (
        <div
          className="mb-4 p-3 rounded-xl text-sm font-semibold"
          style={{
            background: "#FEF2F2",
            color: "#EF4444",
            border: "1px solid #FECACA",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-bold mb-1.5"
            style={{ color: "#475569" }}
          >
            닉네임
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "#94A3B8" }}
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="닉네임을 입력하세요"
              autoComplete="username"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all outline-none"
              style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6366F1";
                e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E2E8F0";
                e.target.style.boxShadow = "none";
              }}
              required
            />
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-bold mb-1.5"
            style={{ color: "#475569" }}
          >
            비밀번호
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "#94A3B8" }}
            />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
              className="w-full pl-10 pr-10 py-3 rounded-xl text-sm transition-all outline-none"
              style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6366F1";
                e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E2E8F0";
                e.target.style.boxShadow = "none";
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "#94A3B8" }}
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

      <p className="mt-6 text-center text-sm" style={{ color: "#94A3B8" }}>
        아직 계정이 없나요?{" "}
        <Link
          href="/signup"
          className="font-bold hover:underline"
          style={{ color: "#6366F1" }}
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
