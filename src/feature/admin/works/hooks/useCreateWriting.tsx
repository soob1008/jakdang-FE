import { apiClient } from "@/shared/lib/api/api.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkFormValues } from "../components/WorkEditorForm";
import { toast } from "sonner";

export default function useCreateWriting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workId,
      writing,
    }: {
      workId: string;
      writing: WorkFormValues;
    }) => apiClient.post(`/works/${workId}/writings`, writing),
    onSuccess: () => {
      toast.success("새 글이 생성되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "글 생성에 실패했습니다.");
    },
  });
}
