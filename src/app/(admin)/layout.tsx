import type { Metadata } from "next";
import "@/app/globals.css";
import localFont from "next/font/local";
import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";
import { GA_TRACKING_ID } from "@/lib/ga/gtag";
import Script from "next/script";
import GoogleAnalyticsTracker from "@/feature/analytics/GoogleAnalytics";
import { Suspense } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const Pretendard = localFont({
  src: [
    {
      path: "../fonts/Pretendard-Regular.woff",
      weight: "400",
      style: "normal",
    },
    { path: "../fonts/Pretendard-Medium.woff", weight: "500", style: "normal" },
    {
      path: "../fonts/Pretendard-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    { path: "../fonts/Pretendard-Bold.woff", weight: "700", style: "normal" },
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
      <head>
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
      </head>
      <body className={`${Pretendard.className}`}>
        <Providers>
          <SidebarProvider>
            <div className="relative">
              <AppSidebar />
              <SidebarTrigger className="absolute top-1 right-[-34px]" />
            </div>
            <main className="flex h-screen gap-4 w-full bg-muted dark:bg-background ">
              <div className="flex-1 h-full overflow-y-auto ">{children}</div>
            </main>
          </SidebarProvider>
          {/* <Footer /> */}
          <Toaster position="top-center" />
        </Providers>
        <Suspense fallback={null}>
          <GoogleAnalyticsTracker />
        </Suspense>
      </body>
    </html>
  );
}
