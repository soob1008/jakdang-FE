import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";

export default function useDeleteWork() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workId: string) =>
      apiClient.delete<{ message: string }>(`/works/${workId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
  });
}
