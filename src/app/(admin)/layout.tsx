import type { Metadata } from "next";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import AdminHeader from "@/feature/admin/header";
import { AppSidebar } from "@/shared/components/app-sidebar";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { fetchServer } from "@/shared/lib/api/api.server";
import { Author } from "@/entities/author/model/types";

export const metadata: Metadata = {
  title: "작당 - 당신의 공간을 꾸며보세요.",
  description: "작가를 위한 포트폴리오 생성 서비스",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const {
    user: userData,
  }: {
    user: Author;
  } = await fetchServer("/api/user", {
    next: { revalidate: 60 },
  });

  return (
    <SidebarProvider>
      <div className="relative">
        <AppSidebar email={userData.email ?? ""} />
        <SidebarTrigger className="absolute top-1 right-[-34px]" />
      </div>
      <div className="flex flex-col gap-4 w-full bg-gray-50 dark:bg-background">
        <AdminHeader email={userData.email ?? ""} slug={userData?.slug} />
        <div className=" flex-1">{children}</div>
      </div>
    </SidebarProvider>
  );
}
