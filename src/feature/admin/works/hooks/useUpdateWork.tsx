import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { Work } from "@/entities/work/model/type";
import { toast } from "sonner";

export default function useUpdateWork() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (work: Work) => {
      return apiClient.patch<Work>(`/works/${work.id}`, {
        title: work.title,
        description: work.description,
        thumbnail: work.thumbnail,
        is_public: work.is_public,
      });
    },
    onSuccess: () => {
      toast.success("작품이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
    onError: () => {
      toast.error("작품 수정에 실패했습니다.");
    },
  });

  return mutation;
}
