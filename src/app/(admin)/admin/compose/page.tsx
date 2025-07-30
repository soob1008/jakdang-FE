"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PagePreview from "@/feature/admin/PagePreview";
import PageEditor from "@/feature/admin/block/PageEditor";
import { handleAction } from "@/lib/api/action";
import { Block } from "@/feature/admin/types";

interface PageFormValues {
  page: {
    id: string;
    blocks_draft: Block[]; // Define your block type here
  };
}

export default function AdminBlockPage() {
  const form = useForm<PageFormValues>({
    //resolver: zodResolver(),
    defaultValues: {
      page: {
        id: "",
        blocks_draft: [],
      },
    },
  });
  const { reset, watch } = form;

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const fetchPage = async () =>
      await fetch(`/api/pages`, {
        next: { tags: ["page"] },
      }).then((res) => res.json());

    handleAction(fetchPage, {
      errorMessage: "페이지를 불러오는 데 실패했습니다.",
      onSuccess: (data) => {
        reset({
          page: data.page,
        });
      },
    });
  }, [reset, watch]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  console.log("Current blocks:", watch("page").id);

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
