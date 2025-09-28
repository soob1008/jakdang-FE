"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { fetchAPI } from "@/shared/lib/api/api.server";
import { toast } from "sonner";

type LoginFormValues = {
  email: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: "onChange",
  });

  const [isSent, setIsSent] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetchAPI<{ message: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
      });

      if (response.message) {
        setIsSent(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("로그인 링크 전송에 실패했어요.");
      }
    }
  };

  return (
    <>
      <form className="mt-14" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Input
            label="이메일"
            id="email"
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "유효한 이메일 형식이 아닙니다.",
              },
            })}
            placeholder="이메일을 입력하세요."
            className={clsx(
              errors.email ? "border-red-500" : "border-gray-300",
              "transition-colors",
              "focus:ring-1 focus:ring-primary focus:border-primary"
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          size="xl"
          className="w-full mt-6"
          disabled={!isValid}
        >
          로그인 링크 보내기
        </Button>
      </form>

      <AlertDialog open={isSent} onOpenChange={setIsSent}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>메일을 확인해주세요.</AlertDialogTitle>
            <AlertDialogDescription>
              로그인 링크를 이메일로 전송했어요.
              <br />
              이메일을 열고 버튼을 클릭하면 로그인됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsSent(false)}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
