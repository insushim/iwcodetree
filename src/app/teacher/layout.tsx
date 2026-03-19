import Link from "next/link";
import {
  Blocks,
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
} from "lucide-react";

const teacherNav = [
  { href: "/teacher", icon: LayoutDashboard, label: "대시보드" },
  { href: "/teacher/classes", icon: Users, label: "클래스" },
  { href: "/teacher/assignments", icon: ClipboardList, label: "과제" },
  { href: "/teacher/reports", icon: BarChart3, label: "리포트" },
];

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col bg-[var(--bg-main)]">
      {/* Top bar */}
      <header className="h-14 border-b border-[var(--border-light)] bg-[var(--bg-card)] flex items-center px-4 gap-6">
        <Link
          href="/teacher"
          className="flex items-center gap-2 font-black text-lg"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
            <Blocks className="w-4 h-4 text-white" />
          </div>
          <span className="gradient-text">CodeBlock</span>
          <span className="text-xs bg-[var(--secondary)]/10 text-[var(--secondary)] px-2 py-0.5 rounded-full font-bold">
            교사용
          </span>
        </Link>
        <nav className="flex gap-1 ml-6">
          {teacherNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--border-light)] transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <Link href="/dashboard">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white text-xs font-bold">
              T
            </div>
          </Link>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
