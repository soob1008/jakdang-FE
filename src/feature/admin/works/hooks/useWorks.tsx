import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { Work } from "@/entities/work/model/type";

interface UseWorksOptions {
  isPublic?: boolean;
  ids?: string[];
}

export default function useWorks({
  isPublic = false,
  ids,
}: UseWorksOptions = {}) {
  const hasIds = !!ids?.length;

  return useQuery({
    queryKey: ["works", { isPublic, ids }],
    enabled: !ids || hasIds,
    queryFn: async () => {
      const params = new URLSearchParams();

      if (hasIds) params.set("ids", ids!.join(","));
      else if (isPublic) params.set("is_public", "true");

      const url = `/works${params.toString() ? `?${params}` : ""}`;
      return apiClient.get<Work[]>(url);
    },
  });
}
