import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { Comment } from "@/entities/work/model/type";

interface UseCommentsOptions {
  writingId: string;
}

export default function useComments({ writingId }: UseCommentsOptions) {
  return useQuery({
    queryKey: ["comments", writingId],
    queryFn: async () => {
      return apiClient.get<Comment[]>(`/works/writings/${writingId}/comments`);
    },
  });
}
