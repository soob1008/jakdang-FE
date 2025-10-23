import { Writing } from "@/entities/work/model/type";
import { apiClient } from "@/shared/lib/api/api.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface WritingRequest {
  title: string;
  subtitle?: string | null;
  content: string;
  is_public: boolean;
  is_scheduled?: boolean;
  scheduled_at?: Date | null;
}

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
      writing: WritingRequest;
    }) => {
      return apiClient.patch<Writing>(`/works/${workId}/writing/${writingId}`, {
        title: writing.title,
        subtitle: writing.subtitle,
        content: writing.content,
        is_public: writing.is_public,
        is_scheduled: writing.is_scheduled,
        scheduled_at: writing.scheduled_at,
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
