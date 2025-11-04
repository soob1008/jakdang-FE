import Title from "@/feature/admin/components/Title";
import SettlementFilter from "@/feature/admin/settlement/SettlementFilter";

export default function SettlementListPage() {
  return (
    <div>
      <Title title="정산 내역" />
      <SettlementFilter />
    </div>
  );
}
