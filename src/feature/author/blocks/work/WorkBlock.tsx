"use client";

import { useState } from "react";
import { Block, WorkItem } from "@/feature/admin/types";
import Image from "next/image";
import WorkDialog from "@/feature/author/blocks/work/WorkDialog";

interface WorkBlockProps {
  block: Block;
  isPreview?: boolean;
}

export default function WorkBlock({ block, isPreview }: WorkBlockProps) {
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

  const className = isPreview
    ? "@container grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-y-4 @md:gap-y-8 gap-x-2 @md:gap-x-4"
    : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 md:gap-y-8 gap-x-2 md:gap-x-4";

  return (
    <>
      {layout === "grid" ? (
        <div className={className}>
          {works.map((work) => {
            if (!work.is_active) return null;
            return (
              <button
                key={`${work.id}-${work.title}-grid`}
                onClick={() => handleClick(work)}
                className="flex flex-col items-center gap-2 transition bg-card text-card-foreground"
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={
                      work.image_url
                        ? `${cdn}${work.image_url}`
                        : "/placeholder.png"
                    }
                    alt={work.title || "작품 이미지"}
                    fill
                    className="object-contain transition-transform hover:scale-105"
                  />
                </div>
                <span className="text-sm font-medium text-center">
                  {work.title || "제목 없음"}
                </span>
                {work.short_description && (
                  <span className="text-xs-md text-muted-foreground line-clamp-1">
                    {work.short_description}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {works.map((work) => {
            if (!work.is_active) return null;
            return (
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
                  <h4 className="text-base font-bold truncate">
                    {work.title || "제목 없음"}
                  </h4>
                  {work.short_description && (
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {work.short_description}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
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
