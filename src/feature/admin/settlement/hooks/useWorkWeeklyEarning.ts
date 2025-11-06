import { apiClient } from "@/shared/lib/api/api.client";
import { useQuery } from "@tanstack/react-query";
import { EarningWeekItem } from "@/entities/settlement/model/type";

interface UseWorkWeeklyEarningParams {
  work_id: string;
  year: string;
  month: string;
}

export default function useWorkWeeklyEarning({
  work_id,
  year,
  month,
}: UseWorkWeeklyEarningParams) {
  return useQuery({
    queryKey: ["earningWeekTrend", work_id, year, month],
    queryFn: async () => {
      return apiClient.get<EarningWeekItem[]>(
        `/earnings/trend/week?work_id=${work_id}&year=${year}&month=${month}`
      );
    },
    enabled: !!work_id && !!year && !!month,
  });
}
