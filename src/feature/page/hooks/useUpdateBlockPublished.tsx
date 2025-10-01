import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { Block } from "@/entities/page/model/types";
import { toast } from "sonner";

export default function useUpdateBlockPublished() {
  return useMutation({
    mutationFn: ({ pageId }: { pageId: string }) =>
      apiClient.patch<Block>(`/pages/${pageId}/blocks/published`),
    onSuccess: () => {
      toast.success("성공적으로 반영되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "블록 상태 업데이트에 실패했습니다.");
    },
  });
}
