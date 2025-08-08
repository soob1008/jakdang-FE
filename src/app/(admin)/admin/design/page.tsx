"use client";

import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PagePreview from "@/feature/admin/PagePreview";
import PageDesignEditor from "@/feature/admin/design/PageDesignEditor";
import { Page } from "@/feature/admin/types";
import { apiClient } from "@/lib/api/api.client";
import { useQuery } from "@tanstack/react-query";
import { Author } from "@/feature/user/type";

export default function AdminDesignPage() {
  const { data } = useQuery({
    queryKey: ["admin-page"],
    queryFn: () => apiClient.get<{ page: Page }>("/api/pages"),
  });
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiClient.get<{ user: Author }>("/api/user"),
  });

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      id: "",
      user_id: "",
      blocks_draft: [] as Page["blocks_draft"],
      profile: {
        is_active: true,
        avatar_url: "",
        headline: "",
        display_name: userData?.user.display_name ?? "",
      },
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (!data || !userData) return;

    reset({
      id: data.page.id ?? "",
      user_id: userData.user.id ?? "",
      blocks_draft: data.page.blocks_draft ?? [],
      profile: userData.user.profile_draft ?? {
        is_active: true,
        avatar_url: "",
        headline: "",
        display_name: userData.user.display_name ?? "",
      },
    });
  }, [data, userData, reset]);

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
