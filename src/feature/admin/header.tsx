import { Button } from "@/components/ui/button";

export default function AdminHeader() {
  return (
    <header className="pt-14 pb-4 px-10 flex items-center justify-between border-b">
      {/* 왼쪽: 페이지 타이틀 */}
      <div className="text-xl font-semibold font-gong">내 공간 관리</div>

      {/* 오른쪽: 이메일 + 기능 버튼 */}
      <div className="flex items-center gap-4">
        {/* 이메일 표시 */}
        <p className="text-xs font-medium text-muted-foreground">
          1008sb354@gmail.com
        </p>

        {/* 버튼 */}
        <Button variant="secondary" size="sm">
          페이지 이동
        </Button>
      </div>
    </header>
  );
}
