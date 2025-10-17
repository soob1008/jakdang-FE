import { Writing } from "@/entities/work/model/type";
import { apiClient } from "@/shared/lib/api/api.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function useUpdateWriting() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      workId,
      writingId,
      writing,
    }: {
      workId: string;
      writingId: string;
      writing: {
        title: string;
        subtitle?: string;
        content?: string;
        is_public: boolean;
      };
    }) => {
      return apiClient.patch<Writing>(`/works/${workId}/writing/${writingId}`, {
        title: writing.title,
        subtitle: writing.subtitle,
        content: writing.content,
        is_public: writing.is_public,
      });
    },
    onSuccess: (_, { workId, writingId }) => {
      toast.success("글이 수정되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["writing", workId, writingId],
      });
      queryClient.invalidateQueries({ queryKey: ["works"] });
      const searchParams = new URLSearchParams();
      searchParams.set("selectedWorkId", workId);
      router.push(`/admin/works?${searchParams.toString()}`);
    },
    onError: () => {
      toast.error("글 수정에 실패했습니다.");
    },
  });
}
