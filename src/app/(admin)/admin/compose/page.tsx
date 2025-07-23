"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import PagePreview from "@/feature/admin/PagePreview";
import PageEditor from "@/feature/admin/block/PageEditor";

const defaultBlocks = [
  {
    type: "text",
    name: "텍스트",
    data: {
      content: "",
      align: "left",
      bgColor: "#ffffff",
      fontSize: "base",
    },
  },
  {
    type: "image",
    name: "이미지",
    data: {
      url: "",
      alt: "",
    },
  },
  {
    type: "work",
    name: "작품",
    data: {
      workIds: [], // 선택된 작품 ID 배열
      layout: "grid", // 또는 "list"
    },
  },
  {
    type: "link",
    name: "링크",
    data: {
      links: [
        // { label: "", url: "" }
      ],
    },
  },
  {
    type: "sns",
    name: "SNS",
    data: {
      links: [
        // { label: "", url: "" }
      ],
    },
  },
  {
    type: "calendar",
    name: "일정",
    data: {
      items: [
        // { title: "", date: "", description: "" }
      ],
      displayMode: "list", // 또는 "calendar"
    },
  },
  {
    type: "challenge",
    name: "글쓰기 챌린지",
    data: {
      challengeId: null, // 연결된 챌린지 ID
      layout: "calendar", // 또는 "list", "grass"
    },
  },
  {
    type: "event",
    name: "이벤트",
    data: {
      title: "",
      date: "",
      location: "",
      description: "",
      registrationLink: "",
    },
  },
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
