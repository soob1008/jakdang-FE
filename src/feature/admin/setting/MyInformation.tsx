"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Author } from "@/feature/user/type";
import { handleAction } from "@/lib/api/action";
import { apiClient } from "@/lib/api/api.client";

interface MyInformationProps {
  user: Author;
}

export default function MyInformation({ user }: MyInformationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [slug, setSlug] = useState(user.slug || "");

  const handleUpdateSlug = async (newSlug: string) => {
    await handleAction(
      () => apiClient.patch(`/api/user/slug`, { slug: newSlug }),
      {
        successMessage: "주소가 성공적으로 업데이트되었습니다.",
        errorMessage: "주소 업데이트에 실패했습니다.",
        onSuccess: () => {
          setSlug(newSlug);
        },
      }
    );
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-bold mb-4">내 정보</h3>
      <div>
        <h4 className="text-sm text-gray-500">이메일</h4>
        <p className="mt-2 font-semibold">{user.email}</p>
      </div>
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm text-gray-500">주소</h4>

          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                주소 수정
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>주소를 수정하시겠습니까?</AlertDialogTitle>
              </AlertDialogHeader>

              <div className="py-2">
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setIsOpen(false);
                    setSlug(user.slug || "");
                  }}
                >
                  취소
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await handleUpdateSlug(slug);
                    setIsOpen(false);
                  }}
                >
                  저장
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className="mt-2 font-semibold">
          {slug ? `https://jakdang.site/@${slug}` : "사용자 주소가 없습니다."}
        </p>
      </div>
    </div>
  );
}
