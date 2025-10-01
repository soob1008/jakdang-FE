import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import type { Page, Block } from "@/entities/page/model/types";
import { useFormContext } from "react-hook-form";
import { useRef, useEffect } from "react";
import { debounce } from "lodash";

export default function useAutoSaveBlocks(pageId: string) {
  const { watch } = useFormContext();
  const prevJsonRef = useRef<string>("");

  const mutation = useMutation({
    mutationFn: (blocks: Block[]) =>
      apiClient.patch<Page>(`/pages/${pageId}/blocks/draft`, {
        blocks_draft: blocks,
      }),
  });

  useEffect(() => {
    if (!pageId) return;

    console.log(pageId, watch());
    const debouncedSave = debounce((blocks: Block[]) => {
      mutation.mutate(blocks);
    }, 2000);

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
  }, [watch, pageId]);
}
