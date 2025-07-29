import type { Metadata } from "next";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AdminHeader from "@/feature/admin/header";

export const metadata: Metadata = {
  title: "작당 - 당신의 공간을 꾸며보세요.",
  description: "작가를 위한 포트폴리오 생성 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <div className="relative">
        <AppSidebar />
        <SidebarTrigger className="absolute top-1 right-[-34px]" />
      </div>
      <div className="flex flex-col gap-4 w-full bg-muted dark:bg-background">
        <AdminHeader />
        <div className=" flex-1">{children}</div>
      </div>
    </SidebarProvider>
  );
}
