import EarningsContainer from "@/feature/admin/settlement/components/EarningsContainer";
import Title from "@/feature/admin/components/Title";

export default async function SettlementListPage() {
  return (
    <>
      <Title title="정산 내역" />
      <EarningsContainer />
    </>
  );
}
