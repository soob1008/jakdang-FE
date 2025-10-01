"use client";

import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PagePreview from "@/feature/admin/PagePreview";
import PageDesignEditor from "@/feature/admin/design/PageDesignEditor";
import { Page } from "@/entities/page/model/types";
import useUser from "@/feature/auth/hooks/useUser";
import usePage from "@/feature/page/hooks/usePage";

export default function AdminDesignPage() {
  const { data: user } = useUser();
  const { data: page } = usePage();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      id: "",
      user_id: "",
      display_name: "",
      blocks_draft: [] as Page["blocks_draft"],
      style_draft: {},
      style_published: {},
      profile: {
        is_active: true,
        avatar_url: "",
        headline: "",
        display_name: user?.display_name ?? "",
        text_color: "",
      },
    },
  });

  const { reset } = form;

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
        text_color: "#111111",
      },
    });
  }, [page, user, reset]);

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 h-full">
        <div className="order-2 lg:order-1">
          <PageDesignEditor />
        </div>
        <div className="order-1 lg:order-2">
          <PagePreview />
        </div>
      </div>
    </FormProvider>
  );
}
