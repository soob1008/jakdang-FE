import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Block } from "@/feature/admin/types";
import { debounce } from "lodash";

export function useAutoSaveBlock(pageId: string) {
  const { watch } = useFormContext();

  useEffect(() => {
    if (!pageId) return;
    // debounce 적용
    const debouncedSave = debounce(async (value: Block[]) => {
      try {
        await fetch(`/api/pages/${pageId}/draft`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
      } catch (error) {
        console.error("Error during auto-save:", error);
      }
    }, 3000);

    const subscription = watch((value) => {
      debouncedSave(value.blocks);
    });

    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [watch, pageId]);
}
