import { Writing } from "@/entities/work/model/type";
import { apiClient } from "@/shared/lib/api/api.client";
import { useQuery } from "@tanstack/react-query";

interface UseWritingsOptions {
  workId: string;
}

export default function useWritings({ workId }: UseWritingsOptions) {
  return useQuery({
    queryKey: ["writings", workId],
    enabled: !!workId,
    queryFn: async () => {
      return apiClient.get<Writing[]>(`/works/${workId}/writings`);
    },
  });
}
