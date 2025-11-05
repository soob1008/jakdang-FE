import SummaryCard from "./SummaryCard";

export default function SettlementSummarySection() {
  return (
    <section className="grid grid-cols-3 gap-4  ">
      <SummaryCard
        title="이번 달 총 수익"
        value="₩1,230,000"
        subLabel="오늘 수익"
        subValue="₩25,000"
        highlight
      />
      <SummaryCard title="이번 주 지급 예정" value="₩350,000" />
      <SummaryCard title="다음 정산일" value="11월 10일" sub="₩350,000 예정" />
    </section>
  );
}
