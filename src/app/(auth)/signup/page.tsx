"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, Rocket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const displayName = username;
    const result = signup(username, displayName, password, role);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "회원가입에 실패했어요. 다시 시도해주세요.");
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
      <h1 className="text-2xl font-black text-center mb-2">회원가입</h1>
      <p className="text-sm text-center mb-8" style={{ color: "#94A3B8" }}>
        코딩 여행을 시작해볼까요?
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
        {/* Role selector */}
        <div
          className="flex gap-2 p-1 rounded-xl"
          style={{ background: "#F8FAFC" }}
        >
          {(["student", "teacher"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all"
              style={
                role === r
                  ? {
                      background: "#6366F1",
                      color: "#FFFFFF",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }
                  : { color: "#94A3B8" }
              }
            >
              {r === "student" ? "🎮 학생" : "📚 선생님"}
            </button>
          ))}
        </div>

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
              placeholder="멋진 닉네임을 정해주세요"
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
            이메일
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "#94A3B8" }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@codeblock.kr"
              autoComplete="email"
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
              placeholder="6자 이상 비밀번호"
              autoComplete="new-password"
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
              minLength={6}
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
          icon={<Rocket className="w-5 h-5" />}
        >
          시작하기
        </Button>
      </form>

      <p className="mt-6 text-center text-sm" style={{ color: "#94A3B8" }}>
        이미 계정이 있나요?{" "}
        <Link
          href="/login"
          className="font-bold hover:underline"
          style={{ color: "#6366F1" }}
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
