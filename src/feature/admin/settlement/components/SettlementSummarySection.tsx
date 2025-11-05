import SummaryCard from "./SummaryCard";
import useSettlementSummary from "../hooks/useSettlementSummary";
import { formatCurrency, formatDate } from "@/shared/lib/utils";

export default function SettlementSummarySection() {
  const { data: summary } = useSettlementSummary();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4  ">
      <SummaryCard
        title="이번 달 총 수익"
        value={formatCurrency(summary?.month_earning ?? 0)}
        subLabel="오늘 수익"
        subValue={formatCurrency(summary?.today_earning ?? 0)}
        highlight
      />
      <SummaryCard
        title="이번 주 지급 예정"
        value={formatCurrency(summary?.week_scheduled ?? 0)}
        subLabel="오늘 지급 예정"
        subValue={formatCurrency(summary?.today_earning ?? 0)}
      />
      <SummaryCard
        title="다음 정산일"
        value={formatDate(summary?.next_settlement_date ?? null)}
        sub={`${formatCurrency(
          summary?.next_settlement_amount ?? 0
        )} 지급 ㄴ예정`}
      />
    </section>
  );
}
