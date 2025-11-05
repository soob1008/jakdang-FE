"use client";

import SettlementSummarySection from "@/feature/admin/settlement/components/SettlementSummarySection";
import SettlementChartsSection from "./SettlementChartsSection";
import Title from "@/feature/admin/components/Title";
import { Button } from "@/shared/ui/button";

export default function SettlementSummaryContainer() {
  return (
    <>
      <Title
        title="정산 현황"
        rightContent={<Button variant="outline">입금계좌 관리</Button>}
      />
      <div className="space-y-14">
        <SettlementSummarySection />
        <SettlementChartsSection />
      </div>
    </>
  );
}
