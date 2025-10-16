import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { Work } from "@/entities/work/model/type";

export default function useWorks() {
  return useQuery({
    queryKey: ["works"],
    queryFn: () => apiClient.get<Work[]>("/works"),
  });
}
