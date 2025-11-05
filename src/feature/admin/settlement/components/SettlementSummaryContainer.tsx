"use client";

import SettlementSummarySection from "@/feature/admin/settlement/components/SettlementSummarySection";
import SettlementChartsSection from "./SettlementChartsSection";
import Title from "@/feature/admin/components/Title";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/ui/dialog";
import SettlementAccountCard from "./SettlementAccountCard";

export default function SettlementSummaryContainer() {
  return (
    <>
      <Title
        title="정산 현황"
        description={`작가님의 정산 현황과 수익 흐름을 한눈에 확인할 수 있습니다.\n정산을 받으려면 반드시 ‘입금 계좌’를 등록해야 합니다.`}
        rightContent={
          <div className="flex gap-2 items-center">
            <span className="text-sm">계좌 미등록</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">입금계좌 관리</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>입금 계좌 관리</DialogTitle>
                </DialogHeader>
                <SettlementAccountCard />
                <DialogFooter>
                  <Button>닫기</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
      />
      <div className="space-y-14">
        <SettlementSummarySection />
        <SettlementChartsSection />
      </div>
    </>
  );
}
