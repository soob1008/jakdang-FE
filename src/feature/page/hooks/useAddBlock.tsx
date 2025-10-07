import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { Block, BlockType, TemplateType } from "@/entities/page/model/types";
import { toast } from "sonner";

type AddBlockArgs = {
  pageId: string;
  type?: BlockType;
  template?: TemplateType;
};

export default function useAddBlock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ pageId, type, template }: AddBlockArgs) =>
      apiClient.post<Block>(`/pages/${pageId}/blocks`, {
        type,
        template,
      }),
    onSuccess: async (newBlock) => {
      toast.success("블록이 성공적으로 추가되었습니다.");
      await queryClient.invalidateQueries({ queryKey: ["page"] });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      return newBlock;
    },
    onError: (error: Error) => {
      toast.error(error.message || "블록 추가에 실패했습니다.");
    },
  });
}
