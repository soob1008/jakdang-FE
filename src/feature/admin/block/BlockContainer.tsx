"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PagePreview from "@/feature/admin/PagePreview";
import PageEditor from "@/feature/admin/block/PageEditor";
import { Page } from "@/feature/admin/types";
import { apiClient } from "@/lib/api/api.client";
import { useQuery } from "@tanstack/react-query";

export const STORAGE_KEY = "selected-block-id";

export default function BlockContainer() {
  const [hasMounted, setHasMounted] = useState(false);
  const { data } = useQuery({
    queryKey: ["admin-page"],
    queryFn: () => apiClient.get<{ page: Page }>("/api/pages"),
  });

  const form = useForm({
    mode: "onChange",
    defaultValues: data?.page ?? {},
  });

  const { watch, reset } = form;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!data) return;
    reset(data.page);
  }, [data, reset]);

  // if (isLoading) return <div>로딩 중...</div>;
  //  if (error || !data) return <div>에러 발생</div>;

  if (!hasMounted) return null;

  console.log("form Values", watch());

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
