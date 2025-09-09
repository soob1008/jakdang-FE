"use client";

import React from "react";
import { Button } from "@/shared/ui/button";
import { Block, PageStyle, BlockDataLink } from "@/feature/admin/types";

interface LinkBlockProps {
  block: Block;
  style: PageStyle;
}

export default function LinkBlock({ block, style }: LinkBlockProps) {
  const { links = [] } = (block.data as BlockDataLink) || {};
  if (!block.is_active || links.length === 0) return null;

  const raw = (style?.theme_color ?? "#3b82f6").trim().toLowerCase();
  const isWhite = raw === "#fff" || raw === "#ffffff" || raw === "white";
  // 흰색일 때만 가독성을 위해 대체색 사용, 그 외에는 테마색 그대로
  const linkColor = isWhite ? "#666" : style?.theme_color ?? "#3b82f6";

  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <Button
          key={`${link.label}-${link.url}`}
          type="button"
          variant="outline"
          size="2xl"
          className="w-full rounded-[var(--btn-radius)] text-sm truncate border
                     text-[var(--link-color)] border-[var(--link-color)]
                     hover:bg-[var(--link-hover-bg)]
                     focus-visible:ring-2 focus-visible:ring-[var(--link-color)]
                     transition-colors hover:text-[var(--link-color)]"
          style={{
            ["--link-color" as string]: linkColor,
            ["--link-hover-bg" as string]: "#f5f5f5",
            ["--btn-radius" as string]:
              style?.button_style === "sharp" ? "0" : "8px",
          }}
          onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
        >
          {link.label}
        </Button>
      ))}
    </div>
  );
}
