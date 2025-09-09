"use client";

import { usePathname } from "next/navigation";
import { LogOut, ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import Link from "next/link";
import clsx from "clsx"; // tailwind class 병합용 라이브러리 (optional)
import { createClient } from "@/shared/lib/supabase/client";
import { useRouter } from "next/navigation";
import { MENUS } from "@/feature/admin/const";

// 메뉴 구조

interface AppSidebarProps {
  email: string;
}

export function AppSidebar({ email }: AppSidebarProps) {
  const pathname = usePathname();
  const supabase = createClient();
  const router = useRouter();

  return (
    <Sidebar className="bg-white h-full border-none shadow-[4px_6px_10px_-2px_rgba(0,0,0,0.04)]">
      <SidebarContent className="py-6 px-2">
        {/* 로고 */}
        <SidebarGroupLabel className="flex justify-center mt-8 mb-10 font-bold font-myungjo text-2xl text-primary">
          작당
        </SidebarGroupLabel>
        {/* 반복되는 그룹 */}
        {MENUS.map((menu) => (
          <SidebarGroup key={menu.label}>
            <SidebarGroupLabel>{menu.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {menu.items.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <SidebarMenuItem
                      key={item.label}
                      className={clsx(
                        "px-2 py-1.5 rounded-2xl transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary hover:text-secondary-foreground"
                      )}
                    >
                      <SidebarMenuButton
                        asChild
                        className="hover:bg-transparent hover:text-inherit active:bg-transparent"
                      >
                        <Link href={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* TODO: 로그아웃 처리 */}
      <SidebarFooter className="border-t p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/30 transition">
              <div className="flex items-center gap-2">
                {/* <Avatar className="h-6 w-6">
                  <AvatarFallback>
                    {email?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar> */}
                <span className="text-sm font-medium text-muted-foreground">
                  {email}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem>
              <button
                type="button"
                className="flex w-full items-center gap-2"
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/auth/login");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
