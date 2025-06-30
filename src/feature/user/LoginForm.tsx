"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { loginWithMagicLink } from "@/feature/user/api";

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

  const onSubmit = (data: LoginFormValues) => {
    console.log("이메일 제출됨:", data.email);
    loginWithMagicLink(data.email);
  };

  return (
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
  );
}
