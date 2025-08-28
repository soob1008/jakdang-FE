import type { Metadata } from "next";
import "@/app/globals.css";
import localFont from "next/font/local";
import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";
import { GA_TRACKING_ID } from "@/lib/ga/gtag";
import Script from "next/script";
import GoogleAnalyticsTracker from "@/feature/analytics/GoogleAnalytics";
import { Suspense } from "react";

const Pretendard = localFont({
  src: [
    {
      path: "fonts/Pretendard-Regular.woff",
      weight: "400",
      style: "normal",
    },
    { path: "fonts/Pretendard-Medium.woff", weight: "500", style: "normal" },
    {
      path: "fonts/Pretendard-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    { path: "fonts/Pretendard-Bold.woff", weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "작당 - 작가를 위한 페이지 빌더",
  description: "작가들이 자신만의 페이지를 쉽게 만들 수 있는 웹 빌더 서비스",
  keywords: [
    "작가",
    "포트폴리오",
    "페이지 빌더",
    "웹 빌더",
    "창작",
    "작품",
    "글쓰기",
  ],
  openGraph: {
    title: "작당 - 작가를 위한 페이지 빌더",
    description: "작가들이 자신만의 페이지를 쉽게 만들 수 있는 웹 빌더 서비스",
    url: "https://jakdang.site",
    siteName: "작당",
    images: [
      {
        url: "https://jakdang.site/og-jakdang.jpg",
        width: 1200,
        height: 630,
        alt: "작당 - 작가를 위한 페이지 빌더",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "작당 - 작가를 위한 페이지 빌더",
    description: "작가들이 자신만의 페이지를 쉽게 만들 수 있는 웹 빌더 서비스",
    images: ["https://jakdang.site/og-jakdang.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_KEY || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${Pretendard.className}`}>
        <Providers>
          <main>{children}</main>
          {/* <Footer /> */}
          <Toaster position="top-center" />
        </Providers>
        <Suspense fallback={null}>
          <GoogleAnalyticsTracker />
        </Suspense>
        {/* GA4 스크립트 */}
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: false,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
