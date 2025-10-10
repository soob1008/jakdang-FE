"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PagePreview from "@/feature/admin/PagePreview";
import PageEditor from "@/feature/admin/block/PageEditor";
import { Page } from "@/entities/page/model/types";
import usePage from "@/feature/page/hooks/usePage";
import useUser from "@/feature/auth/hooks/useUser";

export const STORAGE_KEY = "selected-block-id";

export default function BlockContainer() {
  const { data: page, isLoading } = usePage();
  const { data: user } = useUser();
  const [hasMounted, setHasMounted] = useState(false);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      id: "",
      user_id: "",
      display_name: "",
      style_draft: {},
      style_published: {},
      blocks_draft: [] as Page["blocks_draft"],
      profile: {
        is_active: true,
        avatar_url: "",
        headline: "",
        display_name: user?.display_name ?? "",
      },
    },
  });

  const { reset } = form;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!page || !user) return;

    reset({
      id: page.id ?? "",
      user_id: user.id ?? "",
      display_name: user.display_name ?? "",
      style_draft: page.style_draft ?? {},
      style_published: page.style_published ?? {},
      blocks_draft: page.blocks_draft ?? [],
      profile: user.profile_draft ?? {
        is_active: true,
        avatar_url: "",
        headline: "",
        display_name: user.display_name ?? "",
      },
    });
  }, [page, user, reset]);

  if (isLoading) return <div>로딩 중...</div>;
  //  if (error || !data) return <div>에러 발생</div>;

  if (!hasMounted) return null;

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 h-full">
        <div className="order-2 lg:order-1">
          <PageEditor />
        </div>
        <div className="order-1 lg:order-2">
          <PagePreview />
        </div>
      </div>
    </FormProvider>
  );
}
