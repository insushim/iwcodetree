import Link from "next/link";
import { Blocks } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-light)] bg-[var(--bg-card)] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-black text-lg mb-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                <Blocks className="w-4 h-4 text-white" />
              </div>
              <span className="gradient-text">CodeBlock</span>
            </Link>
            <p className="text-sm text-[var(--text-3)] max-w-xs">
              블록 하나로 시작하는 코딩 세상. 누구나 쉽고 재미있게 프로그래밍을
              배울 수 있어요.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="font-bold text-sm mb-3">학습</h4>
              <div className="space-y-2 text-sm text-[var(--text-2)]">
                <Link
                  href="/learn"
                  className="block hover:text-[var(--text-1)]"
                >
                  미션
                </Link>
                <Link
                  href="/challenges"
                  className="block hover:text-[var(--text-1)]"
                >
                  챌린지
                </Link>
                <Link
                  href="/explore"
                  className="block hover:text-[var(--text-1)]"
                >
                  탐험
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">서비스</h4>
              <div className="space-y-2 text-sm text-[var(--text-2)]">
                <Link
                  href="/teacher"
                  className="block hover:text-[var(--text-1)]"
                >
                  교사용
                </Link>
                <Link
                  href="/signup"
                  className="block hover:text-[var(--text-1)]"
                >
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--border-light)] text-center text-xs text-[var(--text-3)]">
          &copy; 2026 CodeBlock. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
