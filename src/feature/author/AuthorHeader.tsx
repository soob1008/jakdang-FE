"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { User, LogIn, Link as LinkIcon, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Author } from "@/entities/author/model/types";
import { createClient } from "@/shared/lib/supabase/client";
import { getSessionUser } from "@/feature/page/server/getSessionUser";

export default function AuthorHeader() {
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<Author | null>(null);

  useEffect(() => {
    const fetchSessionUser = async () => {
      const sessionUser = await getSessionUser();
      setUser(sessionUser);
    };
    fetchSessionUser();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("링크가 복사되었습니다.");
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = document?.title || "페이지 공유";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        toast.success("공유했습니다.");
      } else {
        handleCopyLink();
        toast.info("이 브라우저는 공유를 지원하지 않아 링크를 복사했어요.");
      }
      setOpen(false);
    } catch (e: unknown) {
      if ((e as Error)?.name !== "AbortError") {
        toast.error("공유 중 문제가 발생했어요. 링크를 대신 복사합니다.");
        handleCopyLink();
      }
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("로그아웃 실패:", error.message);
      toast.error("로그아웃 중 오류가 발생했습니다.");
    } else {
      toast.success("로그아웃 되었습니다.");
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 bg-primary text-white hover:bg-primary/90 rounded-full"
        >
          <User className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>메뉴</DialogTitle>
          <DialogDescription>원하는 작업을 선택하세요.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          {user ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  router.push(`/admin/compose`);
                }}
              >
                <User className="mr-2 h-4 w-4" /> 마이페이지
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <User className="mr-2 h-4 w-4" /> 로그아웃
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              <LogIn className="mr-2 h-4 w-4" /> 로그인
            </Button>
          )}

          {/* 공유하기 */}
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" /> 공유하기
          </Button>

          {/* 링크 복사 */}
          <Button variant="outline" onClick={handleCopyLink}>
            <LinkIcon className="mr-2 h-4 w-4" /> 링크 복사
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
