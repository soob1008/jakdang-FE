"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge, badgeVariants } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { cn, formatCurrency } from "@/shared/lib/utils";
import type { EarningDto } from "@/entities/settlement/model/type";
import { STATUS_CONFIG } from "@/entities/settlement/consts/status";

const PAGE_SIZE = 10;

const formatDate = (value?: string | Date | null) => {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "-";
  return format(date, "yyyy.MM.dd");
};

interface EarningTableProps {
  earnings: EarningDto[];
}

export default function EarningTable({ earnings }: EarningTableProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(earnings.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pagedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return earnings.slice(start, start + PAGE_SIZE);
  }, [earnings, page]);

  const hasData = earnings.length > 0;
  const startIndex = hasData ? (page - 1) * PAGE_SIZE + 1 : 0;

  const handlePrevPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <section className="mt-8">
      <div className="rounded-xl border border-gray-200 bg-white/95 px-4 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">정산 내역</h3>
            <p className="text-xs text-gray-500">
              총 {earnings.length.toLocaleString()}건의 정산 데이터를
              확인하세요.
            </p>
          </div>
        </div>

        <Table className="mt-2">
          <TableHeader>
            <TableRow className="bg-gray-50/80">
              <TableHead className="text-center">번호</TableHead>
              <TableHead>작품 / 회차</TableHead>
              <TableHead className="text-center">결제 금액</TableHead>
              <TableHead className="text-center">
                정산 금액
                <span className="text-xs text-gray-500">(수수료 10%)</span>
              </TableHead>
              <TableHead className="text-center">정산 상태</TableHead>
              <TableHead className="text-center">결제일</TableHead>
              <TableHead className="text-center">
                지급 예정일
                <span className="text-xs text-gray-500">(+7일)</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedData.length ? (
              pagedData.map((earning, index) => {
                const status = STATUS_CONFIG[earning.status];
                return (
                  <TableRow key={earning.id}>
                    <TableCell className="pl-4 text-xs text-center text-gray-400">
                      {(startIndex + index).toLocaleString()}
                    </TableCell>
                    <TableCell className="min-w-[220px] font-medium text-gray-900">
                      <span>{earning.work_title}</span>
                      {earning.writing_title ? (
                        <span className="ml-1 text-xs text-gray-500">
                          · {earning.writing_title}
                        </span>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-center text-gray-900">
                      {formatCurrency(earning.gross_amount)}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-gray-900">
                      {formatCurrency(earning.net_amount)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          status.badgeVariant as keyof typeof badgeVariants
                        }
                        size="xs"
                      >
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm text-gray-600">
                      {formatDate(earning.paid_at ?? null)}
                    </TableCell>
                    <TableCell className="text-center text-sm font-semibold">
                      {formatDate(earning.settled_at ?? null)}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-12 text-center text-sm text-gray-500"
                >
                  표시할 정산 내역이 없습니다. 조건을 변경해 다시 시도해 주세요.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination className="mt-6 justify-center px-4 pb-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePrevPage}
                className={cn(
                  "cursor-pointer",
                  page === 1 && "pointer-events-none opacity-40"
                )}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              const isActive = pageNumber === page;
              return (
                <PaginationItem key={pageNumber}>
                  <Button
                    type="button"
                    size="sm"
                    variant={isActive ? "default" : "outline"}
                    className={cn(
                      "h-8 w-8 p-0 text-sm",
                      !isActive && "text-gray-600"
                    )}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={handleNextPage}
                className={cn(
                  "cursor-pointer",
                  page === totalPages && "pointer-events-none opacity-40"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
