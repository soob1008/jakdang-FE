"use client";

import { useState } from "react";
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
import { useDeleteUser } from "@/feature/auth/hooks/useDeleteUser";
import { toast } from "sonner";

export default function AccountDelete() {
  const { mutateAsync: deleteUser, isPending } = useDeleteUser();
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      setIsOpenDeleteAlert(false);
    } catch {
      toast.error("탈퇴 실패. 다시 시도해주세요.");
    }
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
            <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpenDeleteAlert(false)}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isPending}
            >
              {isPending ? "탈퇴 중..." : "탈퇴"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
