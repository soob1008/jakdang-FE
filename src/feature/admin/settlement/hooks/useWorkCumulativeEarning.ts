import { apiClient } from "@/shared/lib/api/api.client";
import { useQuery } from "@tanstack/react-query";
import { EarningCumulativeItem } from "@/entities/settlement/model/type";

interface UseWorkCumulativeEarningParams {
  year: string;
  month: string;
}

export default function useWorkCumulativeEarning({
  year,
  month,
}: UseWorkCumulativeEarningParams) {
  return useQuery({
    queryKey: ["earningCumulativeTrend", year, month],
    queryFn: async () => {
      return apiClient.get<EarningCumulativeItem[]>(
        `/earnings/trend/cumulative?year=${year}&month=${month}`
      );
    },
    enabled: !!year && !!month,
  });
}
