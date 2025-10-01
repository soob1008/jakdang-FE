import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { Page } from "@/entities/page/model/types";
import { toast } from "sonner";

export default function useUpdatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Page>) =>
      apiClient.patch<Page>("/pages/me", data),
    onSuccess: () => {
      toast.success("페이지가 성공적으로 업데이트되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["page"] });
    },
  });
}
