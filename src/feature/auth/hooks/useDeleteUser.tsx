import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.delete<{ message: string }>("/users/me"),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });

      window.dispatchEvent(new Event("session-expired"));
      window.location.href = "/auth/login";
    },
  });
}
