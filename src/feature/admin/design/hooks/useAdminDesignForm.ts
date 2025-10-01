"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import type { Author, Profile } from "@/entities/author/model/types";
import type { Page, PageStyle } from "@/entities/page/model/types";
import useUser from "@/feature/auth/hooks/useUser";
import usePage from "@/feature/page/hooks/usePage";

export type DesignFormValues = {
  id: string;
  user_id: string;
  display_name: string;
  blocks_draft: Page["blocks_draft"];
  style_draft: Partial<PageStyle>;
  style_published: Partial<PageStyle>;
  profile: Profile;
};

const DEFAULT_PROFILE: Profile = {
  is_active: true,
  avatar_url: "",
  headline: "",
  display_name: "",
  text_color: "#111111",
};

function createDefaultValues(user?: Author | null, page?: Page | null): DesignFormValues {
  return {
    id: page?.id ?? "",
    user_id: user?.id ?? "",
    display_name: user?.display_name ?? "",
    blocks_draft: page?.blocks_draft ?? [],
    style_draft: page?.style_draft ?? {},
    style_published: page?.style_published ?? {},
    profile: user?.profile_draft ?? {
      ...DEFAULT_PROFILE,
      display_name: user?.display_name ?? DEFAULT_PROFILE.display_name,
    },
  };
}

export function useAdminDesignForm() {
  const { data: user } = useUser();
  const { data: page } = usePage();

  const defaultValues = useMemo(() => createDefaultValues(user, page), [user, page]);

  const form = useForm<DesignFormValues>({
    mode: "onChange",
    defaultValues,
  });

  const { reset } = form;

  useEffect(() => {
    if (!user || !page) return;
    reset(createDefaultValues(user, page));
  }, [user, page, reset]);

  return { form };
}
