import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import type { PageStyle } from "@/entities/page/model/types";
import { useFormContext } from "react-hook-form";
import { useRef, useEffect } from "react";
import { debounce } from "lodash";
import { useMemo } from "react";

export default function useAutoSaveDesign(pageId: string) {
  const { watch } = useFormContext();
  const prevJsonRef = useRef<string>("");

  const { mutate } = useMutation({
    mutationFn: (style: PageStyle) =>
      apiClient.patch<PageStyle>(`/pages/${pageId}/draft`, {
        style_draft: style,
      }),
  });

  const debouncedSave = useMemo(
    () =>
      debounce((style: PageStyle) => {
        mutate(style);
      }, 2000),
    [mutate]
  );

  useEffect(() => {
    if (!pageId) return;

    const subscription = watch((value) => {
      const currentJson = JSON.stringify(value.style_draft || []);
      if (prevJsonRef.current !== currentJson) {
        prevJsonRef.current = currentJson;
        debouncedSave(value.style_draft || []);
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [watch, pageId, debouncedSave]);
}
