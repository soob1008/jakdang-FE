"use client";

import { useState } from "react";
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
import { handleAction } from "@/lib/api/action";
import { apiClient } from "@/lib/api/api.client";
import { useRouter } from "next/navigation";

export default function AccountDelete() {
  const router = useRouter();
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);

  const handleDeleteAccount = async () => {
    await handleAction(() => apiClient.delete("/api/user"), {
      successMessage: "회원 탈퇴가 완료되었습니다.",
      errorMessage: "회원 탈퇴에 실패했습니다.",
      onSuccess: () => {
        setIsOpenDeleteAlert(false);
        router.push("/"); // Redirect to home page after deletion
      },
    });
  };

  return (
    <div className="space-y-6 p-4 m-auto lg:w-[900px] bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-bold mb-4">회원 탈퇴</h3>
      <p className="text-sm text-gray-600">
        회원 탈퇴를 하시면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴
        수 없습니다.
      </p>

      <AlertDialog open={isOpenDeleteAlert} onOpenChange={setIsOpenDeleteAlert}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive-outline" className="w-full mt-4">
            계정 삭제
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>회원 탈퇴를 하시겠습니까?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsOpenDeleteAlert(false);
              }}
            >
              취소
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount}>
              탈퇴
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
