import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "CodeBlock - 블록 하나로 시작하는 코딩 세상",
  description:
    "블록 코딩으로 프로그래밍의 기초를 배우고, 미션을 수행하며, 나만의 프로젝트를 만들어보세요!",
  keywords: ["코딩교육", "블록코딩", "어린이코딩", "프로그래밍교육"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
