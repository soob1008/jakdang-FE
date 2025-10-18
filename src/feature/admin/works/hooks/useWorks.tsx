import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { Work } from "@/entities/work/model/type";

export default function useWorks(isPublic: boolean) {
  return useQuery({
    queryKey: ["works", isPublic],
    queryFn: () =>
      apiClient.get<Work[]>(`/works${isPublic ? "?is_public=true" : ""}`),
  });
}
