import { apiClient } from "@/shared/lib/api/api.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CreateCommentParams {
  content: string;
  writingId: string;
  parentId?: string;
}

export default function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, writingId, parentId }: CreateCommentParams) =>
      apiClient.post(`/works/writings/${writingId}/comments`, {
        content,
        parent_id: parentId,
      }),
    onSuccess: (_, { writingId }) => {
      toast.success("댓글이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments", writingId] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "댓글 등록에 실패했습니다.");
    },
  });
}
