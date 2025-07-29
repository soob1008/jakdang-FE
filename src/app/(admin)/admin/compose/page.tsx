"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PagePreview from "@/feature/admin/PagePreview";
import PageEditor from "@/feature/admin/block/PageEditor";

const defaultBlocks = [
  {
    id: "1",
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
    id: "2",
    type: "image",
    name: "이미지",
    data: {
      url: "",
      alt: "",
    },
  },
  {
    id: "3",
    type: "work",
    name: "작품",
    data: {
      workIds: [], // 선택된 작품 ID 배열
      layout: "grid", // 또는 "list"
    },
  },
  {
    id: "4",
    type: "link",
    name: "링크",
    data: {
      links: [
        // { label: "", url: "" }
      ],
    },
  },
  {
    id: "5",
    type: "sns",
    name: "SNS",
    data: {
      links: [
        // { label: "", url: "" }
      ],
    },
  },
  {
    id: "6",
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
    id: "7",
    type: "challenge",
    name: "글쓰기 챌린지",
    data: {
      challengeId: null, // 연결된 챌린지 ID
      layout: "calendar", // 또는 "list", "grass"
    },
  },
  {
    id: "8",
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
  const form = useForm({
    //resolver: zodResolver(),
    defaultValues: {
      blocks: defaultBlocks,
    },
  });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  // const { fields } = useFieldArray({
  //   control: form.control,
  //   name: "blocks",
  // });

  // const mutation = useMutation({
  //   // mutationFn: async (data: any) => {
  //   //   const res = await fetch("/api/page", {
  //   //     method: "PATCH",
  //   //     headers: { "Content-Type": "application/json" },
  //   //     body: JSON.stringify(data),
  //   //   });
  //   //   if (!res.ok) throw new Error("저장 실패");
  //   // },
  //   // onSuccess: () => toast.success("페이지 저장 완료!"),
  //   // onError: () => toast.error("저장 중 오류가 발생했습니다."),
  // });

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 h-full">
        {/* 좌측 콘텐츠 */}
        <PageEditor />

        {/* 우측 프리뷰 */}
        <PagePreview />
      </div>
    </FormProvider>
  );
}
