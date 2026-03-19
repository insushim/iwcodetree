import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "CodeBlock - 블록 하나로 시작하는 코딩 세상",
  description:
    "드래그 앤 드롭 블록 코딩으로 프로그래밍의 기초를 배우고, 36개 미션을 수행하며, 나만의 게임과 애니메이션을 만들어보세요! 초등학생을 위한 블록 코딩 교육 플랫폼.",
  keywords: [
    "코딩교육",
    "블록코딩",
    "어린이코딩",
    "프로그래밍교육",
    "CodeBlock",
    "코드블록",
    "스크래치",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "CodeBlock - 블록 하나로 시작하는 코딩 세상",
    description:
      "초등학생을 위한 블록 코딩 교육 플랫폼. 36개 미션, 100+ 블록, 게이미피케이션.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    siteName: "CodeBlock",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeBlock - 블록 하나로 시작하는 코딩 세상",
    description: "초등학생을 위한 블록 코딩 교육 플랫폼",
    images: ["/og-image.svg"],
  },
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
