"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleAction } from "@/shared/lib/api/action";
import { apiClient } from "@/shared/lib/api/api.client";

const schema = z.object({
  slug: z
    .string()
    .min(5, "5자 이상 입력해주세요.")
    .max(20, "20자 이하로 입력해주세요.")
    .regex(/^[a-z0-9]+$/, "영문 소문자 또는 숫자만 사용할 수 있어요."),
});

type FormValues = z.infer<typeof schema>;

export default function SetUserNamePage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const username = watch("slug");

  const onSubmit = async (data: FormValues) => {
    await handleAction(
      () => apiClient.patch("/users/me", { slug: data.slug }),
      {
        successMessage: "주소가 성공적으로 설정되었습니다.",
        errorMessage: "주소 설정에 실패했습니다. 다시 시도해주세요.",
        onError: (error: unknown) => {
          setError("slug", {
            type: "manual",
            message: (error as Error).message || "이미 사용 중인 주소입니다.",
          });
        },
        onSuccess: () => {
          router.push("/admin/compose");
        },
      }
    );
  };

  const hasError = Boolean(errors.slug);
  const isEmpty = !username || username.trim() === "";

  return (
    <section className="pt-8" aria-labelledby="username-heading">
      {/* {isLoading && <PageLoading />} */}
      <header>
        <h2 id="slug-heading" className="text-2xl lg:text-3xl font-bold">
          작가 주소 만들기
        </h2>
        <p className="mt-2 text-sm lg:text-base text-gray-500 leading-relaxed">
          작당에서 사용할 고유 주소를 만들어주세요.
          <br />이 주소는 <code>@사용자명</code> 형태로 프로필 링크에 사용돼요.
          <br className="hidden sm:block" />
          영어 소문자 또는 소문자 영어 + 숫자 조합만 사용할 수 있고, 다른
          작가와의 중복은 허용되지 않아요.
        </p>
      </header>

      <form className="mt-14" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            id="slug"
            placeholder="예: jakdang, jakdang123"
            {...register("slug", {
              required: "주소를 입력해주세요.",
              pattern: {
                value: /^[a-z0-9]{5,20}$/,
                message: "5~20자의 영문 소문자 또는 숫자만 사용할 수 있어요.",
              },
            })}
            className={clsx(
              hasError && isEmpty ? "border-red-500" : "border-gray-300",
              "transition-colors",
              "focus:ring-1 focus:ring-primary focus:border-primary"
            )}
          />
          {hasError && (
            <p className="mt-1 text-sm text-red-500">{errors.slug?.message}</p>
          )}
        </div>

        <Button
          type="submit"
          size="xl"
          className="w-full mt-6"
          disabled={!isValid}
        >
          주소 설정하기
        </Button>
      </form>
    </section>
  );
}
