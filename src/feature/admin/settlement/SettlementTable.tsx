"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SettlementStatus = "waiting" | "progress" | "completed";
type SortKey = "latest" | "oldest" | "amount-desc";

type SettlementRow = {
  id: string;
  workTitle: string;
  settlementPeriod: string;
  amount: number;
  status: SettlementStatus;
  dueDate: Date | null;
  paidAt: Date | null;
  createdAt: Date;
};

const PAGE_SIZE = 15;

const STATUS_META: Record<
  SettlementStatus,
  { label: string; variant: "warning" | "info" | "success" }
> = {
  waiting: { label: "정산 대기", variant: "warning" },
  progress: { label: "정산 진행 중", variant: "info" },
  completed: { label: "정산 완료", variant: "success" },
};

const WORK_TITLES = [
  "달빛 아래",
  "여름의 기억",
  "겨울의 서정",
  "그림자의 노래",
  "비밀의 정원",
  "작은 위로",
];
const STATUSES: SettlementStatus[] = ["waiting", "progress", "completed"];

const SETTLEMENT_DATA: SettlementRow[] = Array.from(
  { length: 45 },
  (_, index) => {
    const month = (index % 12) + 1;
    const baseDate = new Date(2024, month - 1, 5);
    const status = STATUSES[index % STATUSES.length];
    const due = new Date(2024, month - 1, 25);
    const paid = status === "completed" ? new Date(2024, month - 1, 23) : null;

    return {
      id: `SET-${2024000 + index + 1}`,
      workTitle: WORK_TITLES[index % WORK_TITLES.length],
      settlementPeriod: `2024.${month.toString().padStart(2, "0")}`,
      amount: 420000 + (index % 7) * 38000,
      status,
      dueDate: due,
      paidAt: paid,
      createdAt: baseDate,
    };
  }
);

const formatCurrency = (value: number) => `${value.toLocaleString("ko-KR")}원`;

const formatDate = (value: Date | null) =>
  value ? format(value, "yyyy.MM.dd") : "-";

export default function SettlementTable() {
  const [sortKey, setSortKey] = useState<SortKey>("latest");
  const [page, setPage] = useState(1);

  const sortedData = useMemo(() => {
    const next = [...SETTLEMENT_DATA];

    switch (sortKey) {
      case "oldest":
        next.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case "amount-desc":
        next.sort((a, b) => b.amount - a.amount);
        break;
      case "latest":
      default:
        next.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    return next;
  }, [sortKey]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pagedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedData.slice(start, start + PAGE_SIZE);
  }, [page, sortedData]);

  const hasData = sortedData.length > 0;
  const startIndex = hasData ? (page - 1) * PAGE_SIZE + 1 : 0;
  const endIndex = hasData ? Math.min(page * PAGE_SIZE, sortedData.length) : 0;

  const handleSortChange = (value: string) => {
    setSortKey(value as SortKey);
    setPage(1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <section className="mt-8">
      <div className="rounded-xl border border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">정산 내역</h3>
            <p className="text-xs text-gray-500">
              총 {sortedData.length.toLocaleString()}건의 정산 데이터를
              확인하세요.
            </p>
          </div>
          <Select value={sortKey} onValueChange={handleSortChange}>
            <SelectTrigger className="w-32 bg-white">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="oldest">오래된순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/80">
              <TableHead className="pl-4">정산 번호</TableHead>
              <TableHead>작품명</TableHead>
              <TableHead>정산 기간</TableHead>
              <TableHead className="text-right">정산 금액</TableHead>
              <TableHead>정산 상태</TableHead>

              <TableHead>지급 예정일</TableHead>
              <TableHead className="pr-4">정산일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedData.length ? (
              pagedData.map((row) => {
                const statusMeta = STATUS_META[row.status];
                return (
                  <TableRow key={row.id}>
                    <TableCell className="pl-4 text-xs text-gray-400">
                      {row.id}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {row.workTitle}
                    </TableCell>
                    <TableCell>{row.settlementPeriod}</TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatCurrency(row.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusMeta.variant} size="xs">
                        {statusMeta.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(row.dueDate)}</TableCell>
                    <TableCell className="pr-4">
                      {formatDate(row.paidAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-12 text-center text-sm text-gray-500"
                >
                  표시할 정산 내역이 없습니다. 조건을 변경해 다시 시도해 주세요.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableCaption>
            {hasData
              ? `${startIndex}–${endIndex} / ${sortedData.length}`
              : "표시할 데이터가 없습니다."}
          </TableCaption>
        </Table>

        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
          <span className="text-xs text-gray-500">
            총 {sortedData.length.toLocaleString()}건 중{" "}
            {hasData
              ? `${startIndex.toLocaleString()}–${endIndex.toLocaleString()}건 표시`
              : "표시할 데이터가 없습니다."}
          </span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handlePrevPage}
              disabled={page === 1}
              aria-label="이전 페이지"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm font-medium text-gray-700">
              {page} / {totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleNextPage}
              disabled={page === totalPages}
              aria-label="다음 페이지"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
