import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Block } from "@/feature/admin/types";
import { debounce } from "lodash";
import { apiClient } from "@/lib/api/api.client";

export function useAutoSaveBlock(pageId: string) {
  const { watch } = useFormContext();

  useEffect(() => {
    if (!pageId) return;
    // debounce 적용
    const debouncedSave = debounce(async (value: Block[]) => {
      try {
        await apiClient.put(`/api/pages/${pageId}/draft`, {
          blocks_draft: value,
        });
      } catch (error) {
        console.error("Error during auto-save:", error);
      }
    }, 2000);

    const subscription = watch((value) => {
      debouncedSave(value.blocks_draft || []);
    });

    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [watch, pageId]);
}
