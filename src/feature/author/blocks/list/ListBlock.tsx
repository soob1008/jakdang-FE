"use client";

import { useState } from "react";
import {
  Block,
  PageStyle,
  ListItem,
  BlockDataList,
} from "@/entities/page/model/types";
import Image from "next/image";
import ListContentDialog from "./ListContentDialog";
import { autoContrast } from "@/shared/lib/utils";

interface ListBlockProps {
  block: Block;
  style: PageStyle;
}

export default function ListBlock({ block, style }: ListBlockProps) {
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);

  if (!block.is_active) return null;

  const { lists: items, layout, title } = block.data as BlockDataList;

  const cdn = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const textColor = autoContrast(style.background_color || "#ffffff");

  if (!items || items.length === 0) return null;

  const handleClick = (item: ListItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col gap-4">
      {title && (
        <h3
          className="font-bold text-lg text-[var(--text-color)]"
          style={{
            ["--text-color" as string]: textColor,
          }}
        >
          {title}
        </h3>
      )}
      {layout === "grid" ? (
        <div className="w-full [container-type:inline-size]">
          <div className="@container grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-y-4 @md:gap-y-8 gap-x-2 @md:gap-x-4">
            {items.map((item) => {
              if (!item.is_active || !item.id) return null;

              return (
                <button
                  key={`${item.id}-grid`}
                  onClick={() => handleClick(item)}
                  className="flex flex-col items-center gap-2 transition text-card-foreground"
                  style={{
                    ["--theme-color" as string]: "#222",
                    ["--text-color" as string]: textColor,
                  }}
                >
                  <div
                    className="relative w-full aspect-[3/2] overflow-hidden rounded-[var(--btn-radius)]"
                    style={{
                      ["--btn-radius" as string]:
                        style?.button_style === "sharp" ? "0" : "8px",
                    }}
                  >
                    <Image
                      src={
                        item.image_url
                          ? `${cdn}${item.image_url}`
                          : "/assets/basic_book.jpg"
                      }
                      alt={item.title || "리스트 항목 이미지"}
                      fill
                      className={`${
                        item.image_url ? "object-contain" : "object-cover"
                      } transition-transform hover:scale-105`}
                    />
                  </div>

                  <span
                    className={`text-sm font-bold text-[var(--text-color)]`}
                  >
                    {item.title || "제목 없음"}
                  </span>
                  {item.short_description && (
                    <span
                      className={`text-xs-md line-clamp-1 text-[var(--text-color)]`}
                    >
                      {item.short_description}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            if (!item.is_active || !item.id) return null;
            return (
              <button
                key={`${item.id}-list`}
                onClick={() => handleClick(item)}
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
                      "color-mix(in srgb, var(--br) 5%, transparent)",
                    ["--btn-radius" as string]:
                      style?.button_style === "sharp" ? "0" : "8px",
                  } as React.CSSProperties
                }
              >
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={
                      item.image_url
                        ? `${cdn}${item.image_url}`
                        : "/assets/basic_book.jpg"
                    }
                    alt={item.title || "리스트 항목 이미지"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <h4 className="text-base font-bold truncate">
                    {item.title || "제목 없음"}
                  </h4>
                  {item.short_description && (
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {item.short_description}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* 콘텐츠 다이얼로그: 선택된 항목이 있을 때 표시 */}
      <ListContentDialog
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
        item={selectedItem ?? undefined}
      />
    </div>
  );
}
