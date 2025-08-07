"use client";

import { useState } from "react";
import { Block, WorkItem } from "@/feature/admin/types";
import Image from "next/image";

import WorkDialog from "@/feature/author/blocks/work/WorkDialog";

interface WorkBlockProps {
  block: Block;
}

export default function WorkBlock({ block }: WorkBlockProps) {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  if (!block.is_active) return null;

  const { works, layout } = block.data as {
    works: WorkItem[];
    layout: "grid" | "list";
  };

  const cdn = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  if (!works || works.length === 0) return null;

  const handleClick = (work: WorkItem) => {
    setSelectedWork(work);
  };

  return (
    <>
      {layout === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4 md:gap-x-6">
          {works.map((work) => (
            <button
              key={`${work.id}-${work.title}-grid`}
              onClick={() => handleClick(work)}
              className="bg-card text-card-foreground text-left"
            >
              <div className="relative w-full h-50 overflow-hidden">
                {work.is_representative && (
                  <span className="absolute top-1 left-1 z-10 bg-primary text-[10px] font-semibold text-primary-foreground px-2 py-1 rounded-lg">
                    대표작
                  </span>
                )}
                <Image
                  src={
                    work.image_url
                      ? `${cdn}${work.image_url}`
                      : "/placeholder.png"
                  }
                  alt={work.title || "작품 이미지"}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-base font-bold mt-3 truncate">
                {work.title || "제목 없음"}
              </h3>
              {work.short_description && (
                <p className="text-xs-md font-light mt-1 line-clamp-2">
                  {work.short_description}
                </p>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {works.map((work) => (
            <button
              key={`${work.id}-${work.title}-list`}
              onClick={() => handleClick(work)}
              className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/60 transition bg-card text-card-foreground w-full text-left"
            >
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={
                    work.image_url
                      ? `${cdn}${work.image_url}`
                      : "/placeholder.png"
                  }
                  alt={work.title || "작품 이미지"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-base font-medium truncate">
                  {work.title || "제목 없음"}
                </span>
                {work.short_description && (
                  <span className="text-sm text-muted-foreground line-clamp-1">
                    {work.short_description}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* WorkDialog: 선택된 작품이 있을 때 표시 */}
      {selectedWork && (
        <WorkDialog
          open={!!selectedWork}
          onOpenChange={(open) => !open && setSelectedWork(null)}
          work={selectedWork}
        />
      )}
    </>
  );
}
