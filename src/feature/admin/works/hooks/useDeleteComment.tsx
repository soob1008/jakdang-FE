import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { toast } from "sonner";

type DeleteCommentRequest = {
  commentId: string;
  writingId: string;
};

export default function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, DeleteCommentRequest>({
    mutationFn: ({ commentId }) =>
      apiClient.delete<{ message: string }>(`/works/writings/comment/${commentId}`),
    onSuccess: (_, { writingId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", writingId] });
      toast.success("댓글이 삭제되었습니다.");
    },
    onError: () => {
      toast.error("댓글 삭제에 실패했습니다.");
    },
  });
}
