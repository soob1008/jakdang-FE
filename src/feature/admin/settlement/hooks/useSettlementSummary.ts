import { apiClient } from "@/shared/lib/api/api.client";
import { useQuery } from "@tanstack/react-query";
import { SettlementSummaryDto } from "@/entities/settlement/model/type";

export default function useSettlementSummary() {
  // Placeholder for future logic related to settlement summary
  return useQuery({
    queryKey: ["settlementSummary"],
    queryFn: async () => {
      // Placeholder API call
      return apiClient.get<SettlementSummaryDto>("/earnings/summary");
    },
  });
}
