import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { toast } from "sonner";

export default function useDeleteWriting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workId,
      writingId,
    }: {
      workId: string;
      writingId: string;
    }) =>
      apiClient.delete<{ message: string }>(
        `/works/${workId}/writing/${writingId}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] });
      toast.success("글이 삭제되었습니다.");
    },
    onError: () => {
      toast.error("글 삭제에 실패했습니다.");
    },
  });
}
