"use client";

import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { MENUS } from "@/feature/admin/const";
import { usePathname } from "next/navigation";

interface AdminHeaderProps {
  email: string;
  slug?: string;
}

export default function AdminHeader({ email, slug }: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const menuLabel = getMenuLabelByPath(pathname);

  return (
    <header className="pt-10 px-4 pb-4 md:pt-14 md:px-10 flex items-center justify-between border-b">
      {/* 왼쪽: 페이지 타이틀 */}
      <div className="text-lg font-semibold font-myungjo">{menuLabel}</div>

      {/* 오른쪽: 이메일 + 기능 버튼 */}
      <div className="flex items-center gap-4">
        {/* 이메일 표시 */}
        <p className="text-xs font-medium text-muted-foreground">{email}</p>

        {/* 버튼 */}
        <Button
          variant="secondary"
          onClick={() => {
            router.push(`/@${slug}`);
          }}
        >
          내 공간 보러가기
        </Button>
      </div>
    </header>
  );
}

function getMenuLabelByPath(pathname: string): string | null {
  for (const group of MENUS) {
    for (const item of group.items) {
      if (item.href.startsWith(pathname)) {
        return `${group.label}`;
      }
    }
  }
  return null;
}
