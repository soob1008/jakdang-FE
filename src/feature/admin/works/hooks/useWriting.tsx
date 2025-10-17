import { apiClient } from "@/shared/lib/api/api.client";
import { useQuery } from "@tanstack/react-query";

export default function useWriting(workId: string, writingId: string) {
  return useQuery({
    queryKey: ["writing", workId, writingId],
    queryFn: ({ queryKey }) => {
      const [, workId, writingId] = queryKey;
      return apiClient.get(`/works/${workId}/writing/${writingId}`);
    },
  });
}
