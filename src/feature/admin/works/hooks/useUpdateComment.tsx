import { Comment } from "@/entities/work/model/type";
import { apiClient } from "@/shared/lib/api/api.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CommentRequest {
  writingId: string;
  commentId: string;
  content: string;
}

export default function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, CommentRequest>({
    mutationFn: ({ commentId, content }) =>
      apiClient.patch<Comment>(`/works/writings/comment/${commentId}`, {
        content,
      }),
    onSuccess: (_, { writingId }) => {
      toast.success("댓글이 수정되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["comments", writingId],
      });
    },
    onError: () => {
      toast.error("댓글 수정에 실패했습니다.");
    },
  });
}
