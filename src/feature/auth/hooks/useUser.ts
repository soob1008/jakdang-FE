import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { Author } from "@/entities/author/model/types";

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => apiClient.get<Author>("/users/me"),
  });
}
