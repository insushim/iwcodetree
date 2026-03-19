import Link from "next/link";
import { Blocks } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-main)] relative overflow-hidden px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--primary)]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--secondary)]/5 blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 font-black text-2xl mb-8"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center">
            <Blocks className="w-6 h-6 text-white" />
          </div>
          <span className="gradient-text">CodeBlock</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
