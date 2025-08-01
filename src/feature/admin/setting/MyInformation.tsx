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

export default function MyInformation() {
  const [isOpen, setIsOpen] = useState(false);
  const [slug, setSlug] = useState("https://example.com");

  const handleUpdateSlug = (newSlug: string) => {
    // 여기에 슬러그 업데이트 로직을 추가하세요
    console.log("슬러그가 업데이트되었습니다:", newSlug);
    // 예: API 호출 등
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-bold mb-4">내 정보</h3>
      <div>
        <h4 className="text-sm text-gray-500">이메일</h4>
        <p className="mt-2 font-semibold">user@example.com</p>
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
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleUpdateSlug(slug);
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
          <span>@</span>
          soob108
        </p>
      </div>
    </div>
  );
}
