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
} from "lucide-react";
import Link from "next/link";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { Footer } from "@/components/layout/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const features = [
  {
    icon: Blocks,
    title: "블록 코딩",
    desc: "드래그 앤 드롭으로 쉽게! 텍스트 코딩 없이도 프로그래밍의 핵심 개념을 배워요.",
    color: "var(--block-motion)",
    bg: "rgba(76,151,255,0.1)",
  },
  {
    icon: Target,
    title: "36개 학습 미션",
    desc: "단계별 미션을 클리어하며 자연스럽게 코딩 실력이 올라가요.",
    color: "var(--secondary)",
    bg: "rgba(16,185,129,0.1)",
  },
  {
    icon: Trophy,
    title: "게이미피케이션",
    desc: "XP, 레벨업, 뱃지, 스트릭! 게임처럼 즐기면서 성장해요.",
    color: "var(--accent)",
    bg: "rgba(245,158,11,0.1)",
  },
  {
    icon: Users,
    title: "커뮤니티",
    desc: "다른 친구들의 프로젝트를 구경하고, 리믹스하고, 함께 배워요.",
    color: "var(--block-looks)",
    bg: "rgba(153,102,255,0.1)",
  },
];

const stages = [
  { name: "시작의 숲", desc: "움직이기, 말하기 기초", icon: "🌱", missions: 6 },
  { name: "반복의 호수", desc: "반복문, 패턴 만들기", icon: "🔄", missions: 6 },
  { name: "조건의 산", desc: "if/else, 비교 연산", icon: "⛰️", missions: 6 },
  { name: "변수의 마을", desc: "변수, 점수, 카운터", icon: "📦", missions: 6 },
  { name: "함수의 성", desc: "나만의 블록, 추상화", icon: "🏰", missions: 6 },
  {
    name: "창작의 하늘",
    desc: "자유 프로젝트, 종합",
    icon: "🚀",
    missions: 6,
  },
];

const testimonials = [
  {
    name: "김지우",
    age: 10,
    avatar: "🧒",
    text: "블록을 끌어다 놓기만 하면 캐릭터가 움직여요! 코딩이 이렇게 재밌는 줄 몰랐어요.",
  },
  {
    name: "박서준",
    age: 12,
    avatar: "👦",
    text: "미션을 깨면 별이 올라가는 게 너무 좋아요. 벌써 레벨 15가 됐어요!",
  },
  {
    name: "이하늘",
    age: 9,
    avatar: "👧",
    text: "친구가 만든 게임을 리믹스해서 더 재미있게 만들었어요. 다 같이 하니까 더 재밌어요!",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[var(--accent)]/10 to-[var(--primary)]/10 blur-3xl" />
        </div>

        <motion.div
          className="absolute top-40 left-[10%] w-16 h-16 rounded-xl bg-[var(--block-motion)] shadow-lg flex items-center justify-center text-white text-2xl font-bold"
          animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ↻
        </motion.div>
        <motion.div
          className="absolute top-60 right-[12%] w-14 h-14 rounded-xl bg-[var(--block-events)] shadow-lg flex items-center justify-center text-2xl"
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
          className="absolute top-80 left-[20%] w-12 h-12 rounded-xl bg-[var(--block-control)] shadow-lg flex items-center justify-center text-white text-lg font-bold"
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
          className="absolute bottom-40 right-[18%] w-14 h-14 rounded-xl bg-[var(--block-looks)] shadow-lg flex items-center justify-center text-white text-lg"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              누구나 코딩할 수 있어요
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            블록 하나로 시작하는
            <br />
            <span className="gradient-text">코딩 세상</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-[var(--text-2)] mb-10 max-w-2xl mx-auto leading-relaxed"
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <Rocket className="w-5 h-5" />
              시작하기
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--bg-card)] hover:bg-[var(--border-light)] text-[var(--text-1)] font-bold text-lg rounded-2xl shadow-sm border border-[var(--border)] transition-all hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5" />
              구경하기
            </Link>
          </motion.div>

          <motion.div
            className="flex justify-center gap-12 mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { label: "학습 미션", value: "36+" },
              { label: "블록 종류", value: "80+" },
              { label: "학생 수", value: "1,200+" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black gradient-text">
                  {s.value}
                </div>
                <div className="text-sm text-[var(--text-3)] font-semibold mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-[var(--bg-card)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-4xl font-black mb-4">
              왜 <span className="gradient-text">CodeBlock</span>인가요?
            </h2>
            <p className="text-lg text-[var(--text-2)] max-w-xl mx-auto">
              아이들의 눈높이에 맞춘 블록 코딩 교육 플랫폼
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="p-6 rounded-2xl border border-[var(--border-light)] hover:border-[var(--border)] transition-all hover:-translate-y-1 hover:shadow-lg bg-[var(--bg-main)]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: f.bg }}
                >
                  <f.icon className="w-7 h-7" style={{ color: f.color }} />
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-[var(--text-2)] text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-4xl font-black mb-4">
              <span className="gradient-text">학습 로드맵</span>
            </h2>
            <p className="text-lg text-[var(--text-2)]">
              6단계를 거쳐 코딩 마스터가 되어보세요
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] rounded-full hidden md:block -translate-x-1/2" />
            <div className="space-y-8">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.name}
                  className={`flex items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <div
                    className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  >
                    <div className="inline-block p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-light)] shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-3xl mb-2">{stage.icon}</div>
                      <h3 className="text-xl font-bold mb-1">
                        Stage {i + 1}: {stage.name}
                      </h3>
                      <p className="text-[var(--text-2)] text-sm">
                        {stage.desc}
                      </p>
                      <div className="text-xs text-[var(--text-3)] mt-2 font-semibold">
                        {stage.missions}개 미션
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-[var(--primary)] text-white items-center justify-center font-black text-lg shadow-glow z-10 flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-[var(--bg-card)]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-4xl font-black mb-4">
              친구들의 <span className="gradient-text">이야기</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="p-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-light)] hover:border-[var(--border)] transition-all"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-[var(--text-3)]">
                      {t.age}세
                    </div>
                  </div>
                </div>
                <p className="text-[var(--text-2)] text-sm leading-relaxed">
                  &quot;{t.text}&quot;
                </p>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 text-6xl">🧩</div>
            <div className="absolute bottom-8 right-12 text-5xl">🎮</div>
            <div className="absolute top-12 right-20 text-4xl">⭐</div>
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--primary-dark)] font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 active:scale-[0.97]"
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
