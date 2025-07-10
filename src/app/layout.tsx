import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { ViewerProvider } from "@/feature/viewer/ViewerProvider";
import Footer from "@/components/layout/footer";

const Pretendard = localFont({
  src: [
    { path: "fonts/Pretendard-Regular.woff", weight: "400", style: "normal" },
    { path: "fonts/Pretendard-Medium.woff", weight: "500", style: "normal" },
    { path: "fonts/Pretendard-SemiBold.woff", weight: "600", style: "normal" },
    { path: "fonts/Pretendard-Bold.woff", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "작당 - 당신의 창작을 위한 공간",
  description: "작가를 위한 포트폴리오 생성 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${Pretendard.className} bg-background`}>
        <Providers>
          <ViewerProvider />
          <Header />
          <main className="min-h-screen pt-14 px-4 lg:px-6">
            <div className="max-w-3xl mx-auto w-full">{children}</div>
          </main>
          <Footer />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
