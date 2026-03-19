"use client";

import { motion } from "framer-motion";
import {
  Blocks,
  Rocket,
  Trophy,
  Users,
  Star,
  Zap,
  ChevronRight,
  Play,
  Sparkles,
  Target,
  GraduationCap,
  Code2,
  Gamepad2,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { Footer } from "@/components/layout/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const features = [
  {
    icon: Blocks,
    title: "블록 코딩",
    desc: "드래그 앤 드롭으로 쉽게! 텍스트 코딩 없이도 프로그래밍의 핵심 개념을 배워요.",
    color: "#4C97FF",
    bg: "#EBF3FF",
    borderColor: "#B8D4FF",
  },
  {
    icon: Target,
    title: "36개 학습 미션",
    desc: "단계별 미션을 클리어하며 자연스럽게 코딩 실력이 올라가요.",
    color: "#10B981",
    bg: "#ECFDF5",
    borderColor: "#A7F3D0",
  },
  {
    icon: Trophy,
    title: "게이미피케이션",
    desc: "XP, 레벨업, 뱃지, 스트릭! 게임처럼 즐기면서 성장해요.",
    color: "#F59E0B",
    bg: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  {
    icon: Users,
    title: "커뮤니티",
    desc: "다른 친구들의 프로젝트를 구경하고, 리믹스하고, 함께 배워요.",
    color: "#9966FF",
    bg: "#F5F0FF",
    borderColor: "#D4BBFF",
  },
];

const stages = [
  {
    name: "첫걸음",
    desc: "블록 끌기, 이동, 말하기",
    icon: "🌱",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    name: "반복의 힘",
    desc: "반복문, 패턴 만들기",
    icon: "🔄",
    color: "#3B82F6",
    bg: "#EFF6FF",
  },
  {
    name: "조건의 세계",
    desc: "if/else, 비교 연산",
    icon: "🤔",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    name: "변수의 비밀",
    desc: "변수, 점수, 카운터",
    icon: "📦",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    name: "게임 만들기",
    desc: "클론, 충돌, 게임 로직",
    icon: "🎮",
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    name: "마스터",
    desc: "자유 프로젝트, 종합",
    icon: "👑",
    color: "#D97706",
    bg: "#FFFBEB",
  },
];

const testimonials = [
  {
    name: "김지우",
    age: 10,
    avatar: "🧒",
    text: "블록을 끌어다 놓기만 하면 캐릭터가 움직여요! 코딩이 이렇게 재밌는 줄 몰랐어요.",
    bg: "#EEF2FF",
  },
  {
    name: "박서준",
    age: 12,
    avatar: "👦",
    text: "미션을 깨면 별이 올라가는 게 너무 좋아요. 벌써 레벨 7이 됐어요!",
    bg: "#ECFDF5",
  },
  {
    name: "이하늘",
    age: 9,
    avatar: "👧",
    text: "친구가 만든 게임을 리믹스해서 더 재미있게 만들었어요. 다 같이 하니까 더 재밌어요!",
    bg: "#FFFBEB",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <LandingNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Floating blocks */}
        <motion.div
          className="absolute top-40 left-[10%] w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center text-white text-2xl font-bold hidden lg:flex"
          style={{ background: "#4C97FF" }}
          animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ↻
        </motion.div>
        <motion.div
          className="absolute top-60 right-[12%] w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center text-2xl hidden lg:flex"
          style={{ background: "#FFD500" }}
          animate={{ y: [0, -15, 0], rotate: [0, -8, 8, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          🚩
        </motion.div>
        <motion.div
          className="absolute top-80 left-[20%] w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center text-white text-lg font-bold hidden lg:flex"
          style={{ background: "#FFAB19" }}
          animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          if
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-[18%] w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center text-white text-lg hidden lg:flex"
          style={{ background: "#9966FF" }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          💬
        </motion.div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm mb-8"
              style={{ background: "#EEF2FF", color: "#6366F1" }}
            >
              <Sparkles className="w-4 h-4" />
              누구나 코딩할 수 있어요
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            style={{ color: "#0F172A" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            블록 하나로 시작하는
            <br />
            <span className="gradient-text">코딩 세상</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#475569" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            드래그 앤 드롭으로 나만의 게임과 애니메이션을 만들어보세요.
            <br />
            36개 미션을 클리어하면 어느새 코딩 마스터!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-[0.97]"
              style={{ background: "#6366F1" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#4F46E5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#6366F1")
              }
            >
              <Rocket className="w-5 h-5" />
              시작하기
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg rounded-2xl shadow-sm transition-all hover:-translate-y-0.5"
              style={{
                background: "#FFFFFF",
                color: "#0F172A",
                border: "1px solid #E2E8F0",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#F8FAFC")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#FFFFFF")
              }
            >
              <Play className="w-5 h-5" />
              구경하기
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-12 mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { label: "학습 미션", value: "36+" },
              { label: "블록 종류", value: "100+" },
              { label: "학생 수", value: "1,200+" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black gradient-text">
                  {s.value}
                </div>
                <div
                  className="text-sm font-semibold mt-1"
                  style={{ color: "#94A3B8" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2
              className="text-4xl font-black mb-4"
              style={{ color: "#0F172A" }}
            >
              왜 <span className="gradient-text">CodeBlock</span>인가요?
            </h2>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "#475569" }}
            >
              아이들의 눈높이에 맞춘 블록 코딩 교육 플랫폼
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="p-6 rounded-2xl transition-all hover:-translate-y-2 hover:shadow-xl cursor-default"
                style={{
                  background: f.bg,
                  border: `2px solid ${f.borderColor}`,
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                  style={{ background: f.color }}
                >
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#0F172A" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#475569" }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-24 px-4" style={{ background: "#F8FAFC" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2
              className="text-4xl font-black mb-4"
              style={{ color: "#0F172A" }}
            >
              <span className="gradient-text">학습 로드맵</span>
            </h2>
            <p className="text-lg" style={{ color: "#475569" }}>
              6단계를 거쳐 코딩 마스터가 되어보세요
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.name}
                className="relative p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-default"
                style={{
                  background: "#FFFFFF",
                  border: `2px solid ${stage.color}20`,
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: stage.bg }}
                  >
                    {stage.icon}
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm"
                    style={{ background: stage.color }}
                  >
                    {i + 1}
                  </div>
                </div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: "#0F172A" }}
                >
                  Stage {i + 1}: {stage.name}
                </h3>
                <p className="text-sm mb-2" style={{ color: "#475569" }}>
                  {stage.desc}
                </p>
                <div
                  className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
                  style={{ background: stage.bg, color: stage.color }}
                >
                  <Star className="w-3 h-3" />
                  6개 미션
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2
              className="text-4xl font-black mb-4"
              style={{ color: "#0F172A" }}
            >
              친구들의 <span className="gradient-text">이야기</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="p-6 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ background: t.bg, border: "2px solid transparent" }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      background: "#FFFFFF",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: "#0F172A" }}>
                      {t.name}
                    </div>
                    <div className="text-xs" style={{ color: "#94A3B8" }}>
                      {t.age}세
                    </div>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "#334155" }}
                >
                  &quot;{t.text}&quot;
                </p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4"
                      style={{ fill: "#F59E0B", color: "#F59E0B" }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4" style={{ background: "#F8FAFC" }}>
        <motion.div
          className="max-w-3xl mx-auto text-center p-12 rounded-3xl text-white relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #4338CA 100%)",
            boxShadow: "0 20px 60px rgba(99, 102, 241, 0.35)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-4 left-8 text-6xl">🧩</div>
            <div className="absolute bottom-8 right-12 text-5xl">🎮</div>
            <div className="absolute top-12 right-20 text-4xl">⭐</div>
            <div className="absolute bottom-12 left-20 text-3xl">🚀</div>
          </div>
          <div className="relative">
            <h2 className="text-4xl font-black mb-4">
              지금 바로 코딩을 시작해볼까요?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              무료로 시작하고, 나만의 게임을 만들어보세요!
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 active:scale-[0.97]"
              style={{ background: "#FFFFFF", color: "#4F46E5" }}
            >
              <Zap className="w-5 h-5" />
              무료로 시작하기
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
