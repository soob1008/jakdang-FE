import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import type { Page, Block } from "@/entities/page/model/types";
import { useFormContext } from "react-hook-form";
import { useRef, useEffect } from "react";
import { debounce } from "lodash";
import { useMemo } from "react";

export default function useAutoSaveBlocks(pageId: string) {
  const { watch } = useFormContext();
  const prevJsonRef = useRef<string>("");

  const { mutate } = useMutation({
    mutationFn: (blocks: Block[]) =>
      apiClient.patch<Page>(`/pages/${pageId}/draft`, {
        blocks_draft: blocks,
      }),
  });

  const debouncedSave = useMemo(
    () =>
      debounce((blocks: Block[]) => {
        mutate(blocks);
      }, 2000),
    [mutate]
  );

  useEffect(() => {
    if (!pageId) return;

    const subscription = watch((value) => {
      const currentJson = JSON.stringify(value.blocks_draft || []);
      if (prevJsonRef.current !== currentJson) {
        prevJsonRef.current = currentJson;
        debouncedSave(value.blocks_draft || []);
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [watch, pageId, debouncedSave]);
}
