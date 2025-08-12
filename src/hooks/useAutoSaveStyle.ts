import { useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { debounce } from "lodash";
import { apiClient } from "@/lib/api/api.client";
import type { Block } from "@/feature/admin/types";

export function useAutoSaveStyle(pageId: string) {
  const { watch } = useFormContext();
  const prevJsonRef = useRef<string>("");

  useEffect(() => {
    if (!pageId) return;

    const debouncedSave = debounce(async (value: Block[]) => {
      try {
        await apiClient.put(`/api/pages/${pageId}/style/draft`, {
          style_draft: value,
        });
      } catch (error) {
        console.error("Error during auto-save:", error);
      }
    }, 2000);

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
  }, [watch, pageId]);
}
