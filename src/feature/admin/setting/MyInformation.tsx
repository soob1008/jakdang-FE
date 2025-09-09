"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/ui/alert-dialog";
import { Author } from "@/feature/user/type";
import { handleAction } from "@/shared/lib/api/action";
import { apiClient } from "@/shared/lib/api/api.client";
import { Settings } from "lucide-react";
import { revalidateUserInfo } from "../action";

interface MyInformationProps {
  user: Author;
}

export default function MyInformation({ user }: MyInformationProps) {
  const [isOpenSlugAlert, setIsOpenSlugAlert] = useState(false);
  const [isOpenNameAlert, setIsOpenNameAlert] = useState(false);
  const [slug, setSlug] = useState(user.slug || "");
  const [name, setName] = useState(user.display_name || "");

  const handleUpdateSlug = async (newSlug: string) => {
    await handleAction(
      () => apiClient.patch(`/api/user/slug`, { slug: newSlug }),
      {
        successMessage: "주소가 성공적으로 업데이트되었습니다.",
        errorMessage: "주소 업데이트에 실패했습니다.",
        onSuccess: async () => {
          await revalidateUserInfo();
        },
      }
    );
  };

  const handleUpdateDisplayName = async (newName: string) => {
    await handleAction(
      () =>
        apiClient.patch(`/api/user/display-name`, { display_name: newName }),
      {
        successMessage: "필명이 성공적으로 업데이트되었습니다.",
        errorMessage: "필명 업데이트에 실패했습니다.",
        onSuccess: async () => {
          await revalidateUserInfo();
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
      {/* 필명 */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm text-gray-500">필명</h4>

          <AlertDialog open={isOpenNameAlert} onOpenChange={setIsOpenNameAlert}>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label="필명 설정"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>필명 설정</AlertDialogTitle>
              </AlertDialogHeader>

              <div className="py-2">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="필명을 작성해주세요."
                />
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setIsOpenNameAlert(false);
                    setName(user.display_name || "");
                  }}
                >
                  취소
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await handleUpdateDisplayName(name);
                    setIsOpenNameAlert(false);
                  }}
                >
                  저장
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {user.display_name ? (
          <span className="font-semibold">{user.display_name}</span>
        ) : (
          <span className="text-sm text-gray-500">
            아직 필명이 없어요. 지금 설정해보세요!
          </span>
        )}
      </div>
      {/* 주소 */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm text-gray-500">주소</h4>

          <AlertDialog open={isOpenSlugAlert} onOpenChange={setIsOpenSlugAlert}>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label="주소 설정"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>주소 설정</AlertDialogTitle>
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
                    setIsOpenSlugAlert(false);
                    setSlug(user.slug || "");
                  }}
                >
                  취소
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await handleUpdateSlug(slug);
                    setIsOpenSlugAlert(false);
                  }}
                >
                  저장
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className="mt-2 font-semibold">
          {user.slug
            ? `https://jakdang.site/@${user.slug}`
            : "사용자 주소가 없습니다."}
        </p>
      </div>
    </div>
  );
}
