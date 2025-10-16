import { apiClient } from "@/shared/lib/api/api.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCreateWork() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      thumbnail = "",
    }: {
      title: string;
      thumbnail?: string;
    }) =>
      apiClient.post("/works", {
        title,
        thumbnail,
      }),
    onSuccess: () => {
      toast.success("작품이 생성되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "작품 생성에 실패했습니다.");
    },
  });
}
