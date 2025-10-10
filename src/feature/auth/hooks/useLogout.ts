import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { getCookie } from "@/shared/lib/utils";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiClient.post("/auth/logout", undefined, {
        "X-CSRFToken": getCookie("csrftoken") || "",
      }),
    onSuccess: () => {
      queryClient.clear(); // react-query 캐시 초기화
      router.push("/auth/login"); // 로그인 페이지로
    },
  });
}
