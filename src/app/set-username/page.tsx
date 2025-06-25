"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

type FormValues = {
  username: string;
};

export default function SetUserNamePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const username = watch("username");

  const onSubmit = (data: FormValues) => {
    console.log("닉네임 제출됨:", data.username);
    // TODO: 중복 확인 및 저장 로직
  };

  const hasError = Boolean(errors.username);
  const isEmpty = !username || username.trim() === "";

  return (
    <section aria-labelledby="username-heading">
      <header>
        <h2 id="username-heading" className="text-2xl lg:text-3xl font-bold">
          닉네임 설정
        </h2>
        <p className="mt-2 text-sm lg:text-base text-gray-500 leading-relaxed">
          작당에서 사용할 고유한 닉네임을 입력해주세요.
          <br />
          닉네임은 공개 주소(<code>@닉네임</code>)로 사용되며, 한 번 설정하면
          변경이 어려워요.
          <br className="hidden sm:block" />
          <span className="mt-1 block">
            닉네임은 나의 고유 주소이고, 프로필에 표시되는{" "}
            <strong>필명은 이후 자유롭게 설정</strong>할 수 있어요.
          </span>
        </p>
      </header>

      <form className="mt-14" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            id="username"
            placeholder="예: jakdang, jakdang_123"
            {...register("username", {
              required: "필명을 입력해주세요.",
              pattern: {
                value: /^[a-zA-Z0-9_]{3,20}$/,
                message: "3~20자의 영문, 숫자, 언더스코어만 사용 가능합니다.",
              },
            })}
            className={clsx(
              hasError && isEmpty ? "border-red-500" : "border-gray-300",
              "transition-colors",
              "focus:ring-1 focus:ring-primary focus:border-primary"
            )}
          />
          {hasError && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username?.message}
            </p>
          )}
        </div>

        <Button type="submit" size="xl" className="w-full mt-6">
          필명 설정하기
        </Button>
      </form>
    </section>
  );
}
