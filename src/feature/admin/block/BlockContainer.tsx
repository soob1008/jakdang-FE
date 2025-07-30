"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PagePreview from "@/feature/admin/PagePreview";
import PageEditor from "@/feature/admin/block/PageEditor";
import { Page } from "@/feature/admin/types";

interface PageFormValues {
  page: Page;
}
interface BlockContainerProps {
  page?: Page;
}

export default function BlockContainer({ page }: BlockContainerProps) {
  const form = useForm<PageFormValues>({
    //resolver: zodResolver(),
    defaultValues: {
      page,
    },
  });
  const { watch } = form;

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  console.log("Current blocks:", watch("page"));

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
