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
import { Pencil, Trash2 } from "lucide-react";

type WorkListProps = {
  works: Work[];
  itemsPerPage?: number;
  selectedWork: Work | null;
  onSelectWork: (work: Work) => void;
};

export default function WorkList({
  works,
  itemsPerPage = 8,
  selectedWork,
  onSelectWork,
}: WorkListProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(works.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const visibleWorks = works.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-10">
      {/* 작품 리스트 */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleWorks.map((work) => (
          <li
            key={work.id}
            className={cn(
              "rounded-lg overflow-hidden h-52 shadow-sm bg-white border border-gray-100 transition-all cursor-pointer group",
              "hover:shadow-md hover:-translate-y-1",
              selectedWork?.id === work.id && "ring-2 ring-primary"
            )}
            onClick={() => onSelectWork(work)}
          >
            {/* 썸네일 영역 */}
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-100">
              {work.thumbnailUrl ? (
                <Image
                  src={work.thumbnailUrl}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No Image
                </div>
              )}

              {/* 수정/삭제 버튼 */}
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 hover:bg-gray-100 text-gray-600 hover:text-gray-800 shadow-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 hover:bg-gray-100 text-gray-600 hover:text-gray-800 shadow-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* 공개 상태 뱃지 - 하단 왼쪽 */}
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[11px] font-medium bg-black/60 text-white backdrop-blur-sm">
                {work.visibility === "PUBLIC"
                  ? "공개"
                  : work.visibility === "PRIVATE"
                  ? "비공개"
                  : "한정 공개"}
              </div>
            </div>

            {/* 내용 */}
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-[15px] mb-1">
                {work.title}
              </h3>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{format(new Date(work.createdAt), "yyyy.MM.dd")}</span>
              </div>

              {/* 예약 정보 */}
              {work.isScheduled && work.scheduledAt && (
                <div className="flex justify-end mt-3">
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    {format(new Date(work.scheduledAt), "MM.dd HH:mm")}
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
