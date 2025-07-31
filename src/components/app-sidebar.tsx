"use client";

import { usePathname } from "next/navigation";
import { Settings, LogOut, Blocks, Brush, Medal, Tickets } from "lucide-react";
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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import clsx from "clsx"; // tailwind class 병합용 라이브러리 (optional)

// 메뉴 구조
const MENUS = [
  {
    label: "나의 공간",
    items: [
      {
        label: "구성하기",
        href: "/admin/compose",
        icon: Blocks,
      },
      {
        label: "꾸미기",
        href: "/admin/design",
        icon: Brush,
      },
    ],
  },
  // {
  //   label: "활동",
  //   items: [
  //     {
  //       label: "챌린지 관리",
  //       href: "/admin/challenge",
  //       icon: Medal,
  //     },
  //     {
  //       label: "이벤트 관리",
  //       href: "/admin/event",
  //       icon: Tickets,
  //     },
  //   ],
  // },
  {
    label: "설정",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-white h-full border-none shadow-[4px_6px_10px_-2px_rgba(0,0,0,0.04)]">
      <SidebarContent className="py-6 px-2">
        {/* 로고 */}
        <SidebarGroupLabel className="flex justify-center mt-8 mb-10 font-bold font-gong text-2xl text-primary">
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
                        className="hover:bg-transparent hover:text-inherit"
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
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-muted/30 transition">
              <Avatar className="h-6 w-6">
                <AvatarFallback>SU</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">김수빈</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
