import type { Metadata } from "next";
import "../globals.css";
// import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { ViewerProvider } from "@/feature/viewer/ViewerProvider";
// import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "작당 - 당신의 창작을 위한 공간",
  description: "작가를 위한 포트폴리오 생성 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ViewerProvider />
      {/* <Header /> */}
      <main>{children}</main>
      {/* <Footer /> */}
      <Toaster position="top-center" />
    </>
  );
}
