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
import { Author } from "@/entities/author/model/types";
import { getSessionUser } from "@/feature/page/server/getSessionUser";
import { useLogout } from "@/feature/auth/hooks/useLogout";
import { copyLink, shareLink } from "@/shared/lib/share";

export default function AuthorHeader() {
  const { mutate: logout } = useLogout();

  const router = useRouter();
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
    copyLink();
  };

  const handleShare = async () => {
    const result = await shareLink();
    if (result === "shared") {
      setOpen(false);
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
              <Button variant="outline" onClick={() => logout()}>
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
