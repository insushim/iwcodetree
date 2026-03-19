"use client";

import Link from "next/link";
import { Blocks, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-xl">
          <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center">
            <Blocks className="w-5 h-5 text-white" />
          </div>
          <span className="gradient-text">CodeBlock</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/learn"
            className="text-[var(--text-2)] hover:text-[var(--text-1)] font-semibold transition-colors"
          >
            학습하기
          </Link>
          <Link
            href="/explore"
            className="text-[var(--text-2)] hover:text-[var(--text-1)] font-semibold transition-colors"
          >
            탐험하기
          </Link>
          <Link
            href="/challenges"
            className="text-[var(--text-2)] hover:text-[var(--text-1)] font-semibold transition-colors"
          >
            챌린지
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 text-[var(--text-2)] hover:text-[var(--text-1)] font-bold transition-colors"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold rounded-xl transition-all active:scale-[0.97]"
          >
            회원가입
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-[var(--border-light)]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--border-light)] bg-[var(--bg-card)]"
          >
            <div className="p-4 space-y-2">
              {[
                { href: "/learn", label: "학습하기" },
                { href: "/explore", label: "탐험하기" },
                { href: "/challenges", label: "챌린지" },
                { href: "/login", label: "로그인" },
                { href: "/signup", label: "회원가입" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 rounded-xl font-semibold hover:bg-[var(--border-light)] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
