import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { Block } from "@/entities/page/model/types";
import { toast } from "sonner";

type AddBlockArgs = {
  pageId: string;
  type: Block["type"];
};

export default function useAddBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ pageId, type }: AddBlockArgs) =>
      apiClient.post<Block>(`/pages/${pageId}/blocks`, {
        type,
      }),
    onSuccess: (newBlock) => {
      toast.success("블록이 성공적으로 추가되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["page"] });
      return newBlock;
    },
    onError: (error: Error) => {
      toast.error(error.message || "블록 추가에 실패했습니다.");
    },
  });
}
