import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/api.client";
import { type EarningDto } from "@/entities/settlement/model/type";

export interface UseEarningsParams {
  work?: string | null;
  status?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}

const buildSearchParams = (params?: UseEarningsParams) => {
  const searchParams = new URLSearchParams();

  if (!params) return searchParams;

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams;
};

export default function useEarnings(queryParams?: UseEarningsParams) {
  const params = useMemo(() => buildSearchParams(queryParams), [queryParams]);

  return useQuery<EarningDto[]>({
    queryKey: ["earnings", params.toString()],
    queryFn: async () => {
      const queryString = params.toString();
      const url = queryString
        ? `/earnings/list?${queryString}`
        : "/earnings/list";

      return await apiClient.get<EarningDto[]>(url);
    },
  });
}
