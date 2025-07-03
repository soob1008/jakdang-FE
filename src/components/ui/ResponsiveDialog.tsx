"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ReactNode } from "react";
import clsx from "clsx";

interface ResponsiveDialogProps {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit: () => void;
  submitText?: string;
}

export function ResponsiveDialog({
  trigger,
  title,
  description,
  children,
  onSubmit,
  submitText = "저장하기",
}: ResponsiveDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={clsx(
          "fixed z-50 flex flex-col bg-white",
          // 모바일: 전체 페이지
          "top-0 left-0 inset-0 p-0 border-0 rounded-none shadow-none translate-x-0 translate-y-0 max-w-full sm:hidden",
          // PC: 모달 중앙
          "sm:flex sm:inset-auto sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] sm:max-w-md sm:rounded-lg sm:border sm:bg-white sm:p-6"
        )}
      >
        {/* ✅ 모바일 상단 헤더 */}
        {/* 모바일 헤더 내부에만 닫기 버튼을 배치하고 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 sm:hidden">
          <div />
          <span className="text-base font-medium">{title}</span>
          <DialogClose asChild>
            <X className="w-5 h-5" />
          </DialogClose>
        </div>

        {/* ✅ PC 헤더 */}
        <DialogHeader className="hidden sm:flex flex-row justify-between">
          <div>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription className="mt-2 break-words">
                {description}
              </DialogDescription>
            )}
          </div>
          <DialogClose asChild>
            <X className="w-5 h-5" />
          </DialogClose>
        </DialogHeader>

        {/* ✅ 내용 */}
        <div className="flex-1 px-4 sm:px-0 py-6 sm:py-4 space-y-4 overflow-y-auto">
          {children}
        </div>

        {/* ✅ 하단 버튼 */}
        <DialogFooter className="px-4 sm:px-0 pb-6 sm:pb-0">
          <Button onClick={onSubmit} className="w-full sm:w-auto h-12 sm:h-9">
            {submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
