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
import { ArrowLeft } from "lucide-react";
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
        className={clsx(
          "fixed z-50 flex flex-col bg-white",
          // 모바일: 전체 페이지
          "top-0 left-0 inset-0 p-0 border-0 rounded-none shadow-none translate-x-0 translate-y-0 max-w-full sm:hidden",
          // PC: 모달 중앙
          "sm:flex sm:inset-auto sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] sm:max-w-md sm:rounded-lg sm:border sm:bg-white sm:p-6"
        )}
      >
        {/* ✅ 모바일 상단 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 sm:hidden">
          <div />
          <span className="text-base font-medium">{title}</span>
          <div className="w-10" />
        </div>

        {/* ✅ PC 헤더 */}
        <DialogHeader className="hidden sm:block">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* ✅ 내용 */}
        <div className="flex-1 px-4 sm:px-0 py-6 sm:py-4 space-y-4 overflow-y-auto">
          {children}
        </div>

        {/* ✅ 하단 버튼 */}
        <DialogFooter className="px-4 sm:px-0 pb-6 sm:pb-0">
          <Button onClick={onSubmit} className="w-full sm:w-auto">
            {submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
