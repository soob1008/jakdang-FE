"use client";

import { useState } from "react";
import { Block, PageStyle, WorkItem } from "@/feature/admin/types";
import Image from "next/image";
import WorkDialog from "@/feature/author/blocks/work/WorkDialog";
import { autoContrast } from "@/lib/utils";

interface WorkBlockProps {
  block: Block;
  style: PageStyle;
  isPreview?: boolean;
}

export default function WorkBlock({ block, isPreview, style }: WorkBlockProps) {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  if (!block.is_active) return null;

  const { works, layout } = block.data as {
    works: WorkItem[];
    layout: "grid" | "list";
  };

  const cdn = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const textColor = autoContrast(style.background_color || "#ffffff");

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
            if (!work.is_active || !work.id) return null;

            return (
              <button
                key={`${work.id}-grid`}
                onClick={() => handleClick(work)}
                className="flex flex-col items-center gap-2 transition text-card-foreground"
                style={{
                  ["--theme-color" as string]: "#222",
                  ["--text-color" as string]: textColor,
                }}
              >
                <div
                  className="relative w-full h-40 overflow-hidden rounded-[var(--btn-radius)]"
                  style={{
                    ["--btn-radius" as string]:
                      style?.button_style === "sharp" ? "0" : "8px",
                  }}
                >
                  <Image
                    src={
                      work.image_url
                        ? `${cdn}${work.image_url}`
                        : "/assets/basic_book.jpg"
                    }
                    alt={work.title || "작품 이미지"}
                    fill
                    className={`${
                      work.image_url ? "object-contain" : "object-cover"
                    } transition-transform hover:scale-105`}
                  />
                </div>
                <span
                  className={`text-sm font-bold text-center text-[var(--text-color)]`}
                >
                  {work.title || "제목 없음"}
                </span>
                {work.short_description && (
                  <span
                    className={`text-xs-md line-clamp-1 text-[var(--text-color)]`}
                  >
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
            if (!work.is_active || !work.id) return null;
            return (
              <button
                key={`${work.id}-list`}
                onClick={() => handleClick(work)}
                className={`flex items-center gap-4 p-3 border transition bg-card text-card-foreground w-full text-left
                ${
                  style?.button_style === "sharp"
                    ? "rounded-none"
                    : "rounded-lg"
                }
                border-[var(--br)]
                hover:bg-[var(--hover)]
                focus-visible:ring-2 focus-visible:ring-[var(--br)]
                rounded-[var(--btn-radius)]
              `}
                style={
                  {
                    // 테마 보더 색
                    ["--br" as string]: style?.theme_color || "#e5e7eb",
                    // 테마색 12%만 섞은 hover 배경 (살짝 흐려짐)
                    ["--hover" as string]:
                      "color-mix(in srgb, var(--br) 20%, transparent)",
                    ["--btn-radius" as string]:
                      style?.button_style === "sharp" ? "0" : "8px",
                  } as React.CSSProperties
                }
              >
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={
                      work.image_url
                        ? `${cdn}${work.image_url}`
                        : "/assets/basic_book.jpg"
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
