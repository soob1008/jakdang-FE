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
import { Switch } from "@/shared/ui/switch";
type WorkListProps = {
  works: Work[];
  itemsPerPage?: number;
  selectedWork: Work | null;
  onSelectWork: (work: Work) => void;
  onEditWork: (work: Work) => void;
  onDeleteWork: (work: Work) => void;
  onTogglePublic: (work: Work, isPublic: boolean) => Promise<void>;
  isUpdating: boolean;
};

export default function WorkList({
  works,
  itemsPerPage = 8,
  selectedWork,
  onSelectWork,
  onEditWork,
  onDeleteWork,
  onTogglePublic,
  isUpdating,
}: WorkListProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(works.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const visibleWorks = works.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-10 @container">
      {/* 작품 리스트 */}
      {works && works.length > 0 ? (
        <ul className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 @xl:grid-cols-3 @3xl:grid-cols-4 gap-4">
          {visibleWorks.map((work) => (
            <li
              key={work.id}
              className={cn(
                "rounded-lg overflow-hidden shadow-sm bg-white border border-gray-100 transition-all cursor-pointer group",
                "hover:shadow-md hover:-translate-y-1",
                selectedWork?.id === work.id && "ring-2 ring-primary"
              )}
              onClick={() => onSelectWork(work)}
            >
              {/* 썸네일 영역 */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-100">
                {work.thumbnail ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${work.thumbnail}`}
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
                <div className="absolute top-1 w-full px-2 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        work.is_public ? "bg-green-500" : "bg-gray-500"
                      }`}
                    >
                      {/* {work.is_public ? "공개" : "비공개"} */}
                    </div>
                    <Switch
                      checked={work.is_public}
                      onCheckedChange={async (checked) => {
                        await onTogglePublic(work, checked);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      disabled={isUpdating}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* <Switch
                      checked={work.is_public}
                      onCheckedChange={async (checked) => {
                        await onTogglePublic(work, checked);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      disabled={isUpdating}
                    /> */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/80 hover:bg-gray-100 text-gray-600 hover:text-gray-800 shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditWork(work);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/80 hover:bg-gray-100 text-gray-600 hover:text-gray-800 shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteWork(work);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-gray-900" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* 내용 */}
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 text-[15px] mb-1">
                  {work.title}
                </h3>
                <p className="text-xs text-gray-600">{work.description}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>{format(new Date(work.created_at), "yyyy.MM.dd")}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex items-center justify-center text-sm text-gray-500 py-30">
          작품이 없습니다.
        </p>
      )}

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
