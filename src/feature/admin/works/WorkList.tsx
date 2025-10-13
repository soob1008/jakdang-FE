"use client";

import { Work } from "@/entities/work/model/type";
import Image from "next/image";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { Button } from "@/shared/ui/button";
import { format } from "date-fns";
import { cn } from "@/shared/lib/utils";

type WorkListProps = {
  works: Work[];
  itemsPerPage?: number;
};

export default function WorkList({ works, itemsPerPage = 8 }: WorkListProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(works.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const visibleWorks = works.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-10">
      {/* 작품 리스트 */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {visibleWorks.map((work) => (
          <li
            key={work.id}
            className={cn(
              "rounded-xl overflow-hidden shadow-sm bg-white border border-gray-100 transition-all",
              "hover:shadow-md hover:-translate-y-1"
            )}
          >
            {/* 썸네일 */}
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-100">
              {work.thumbnailUrl ? (
                <Image
                  src={work.thumbnailUrl}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No Image
                </div>
              )}

              <span
                className={cn(
                  "absolute top-2 right-2 px-2 py-0.5 rounded-md font-medium text-xs",
                  work.visibility === "PUBLIC" && "bg-green-50 text-green-700",
                  work.visibility === "PRIVATE" && "bg-gray-100 text-gray-500",
                  work.visibility === "UNLISTED" && "bg-blue-50 text-blue-600"
                )}
              >
                {work.visibility === "PUBLIC"
                  ? "공개"
                  : work.visibility === "PRIVATE"
                  ? "비공개"
                  : "한정 공개"}
              </span>
            </div>

            {/* 내용 */}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {work.title}
              </h3>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {work.type === "SINGLE" ? "단일" : "시리즈"} ·{" "}
                  {format(new Date(work.createdAt), "yyyy.MM.dd")}
                </span>
              </div>

              {/* 예약 정보 */}
              {work.isScheduled && work.scheduledAt && (
                <div className="flex justify-end">
                  <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-xs ">
                    예약 발행:{" "}
                    {format(new Date(work.scheduledAt), "yyyy.MM.dd HH:mm")}
                  </span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-10">
          <Pagination>
            <PaginationContent className="flex items-center gap-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className={cn(
                    "cursor-pointer",
                    page === 1 && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <Button
                    size="sm"
                    variant={page === i + 1 ? "default" : "outline"}
                    onClick={() => setPage(i + 1)}
                    className="rounded-md w-8 h-8 text-sm"
                  >
                    {i + 1}
                  </Button>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className={cn(
                    "cursor-pointer",
                    page === totalPages && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
