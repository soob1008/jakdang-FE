"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import PagePreview from "@/feature/admin/PagePreview";
import PageEditor from "@/feature/admin/block/PageEditor";

const defaultBlocks = [
  {
    type: "text",
    name: "텍스트",
    data: { content: "", align: "left", bgColor: "#ffffff" },
  },
  { type: "image", name: "이미지", data: { url: "", alt: "" } },
];

export default function AdminBlockPage() {
  const form = useForm<any>({
    //resolver: zodResolver(),
    defaultValues: {
      blocks: defaultBlocks,
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "blocks",
  });

  const mutation = useMutation({
    // mutationFn: async (data: any) => {
    //   const res = await fetch("/api/page", {
    //     method: "PATCH",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });
    //   if (!res.ok) throw new Error("저장 실패");
    // },
    // onSuccess: () => toast.success("페이지 저장 완료!"),
    // onError: () => toast.error("저장 중 오류가 발생했습니다."),
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 h-full"
      >
        {/* 좌측 콘텐츠 */}
        <PageEditor initialData={{ blocks: fields }} />

        {/* 우측 프리뷰 */}
        <PagePreview />
      </form>
    </FormProvider>
  );
}
