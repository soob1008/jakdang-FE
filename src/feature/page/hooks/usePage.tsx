import { apiClient } from "@/shared/lib/api/api.client";
import { useQuery } from "@tanstack/react-query";
import { Page } from "@/entities/page/model/types";

export default function usePage() {
  return useQuery({
    queryKey: ["page"],
    queryFn: () => apiClient.get<Page>("/pages/me"),
  });
}
