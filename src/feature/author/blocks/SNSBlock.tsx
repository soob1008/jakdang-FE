"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Block, BlockDataSNS, PageStyle } from "@/feature/admin/types";
import { autoContrast } from "@/lib/utils";

interface SNSBlockProps {
  block: Block;
  style: PageStyle;
}

// --- contrast util (WCAG-ish heuristic) ---

export default function SNSBlock({ block, style }: SNSBlockProps) {
  if (!block?.is_active) return null;
  const { sns_links = [] } = (block.data as BlockDataSNS) || {};
  if (sns_links.length === 0) return null;

  const theme = style?.theme_color ?? "#3b82f6";
  const fg = autoContrast(theme);

  return (
    <div className="flex flex-col gap-2">
      {sns_links.map((sns) => (
        <Button
          key={`${sns.platform}-${sns.url}`}
          type="button"
          size="2xl"
          className="w-full text-sm truncate border-0
                     bg-[var(--sns-color)] text-[var(--sns-fg)]
                     hover:bg-[var(--sns-hover)]
                     focus-visible:ring-2 focus-visible:ring-[var(--sns-color)]
                     transition-colors rounded-[var(--btn-radius)]"
          style={{
            ["--sns-color" as string]: theme,
            ["--sns-fg" as string]: fg,
            // darken a touch on hover regardless of base tone
            ["--sns-hover" as string]:
              "color-mix(in srgb, var(--sns-color) 88%, #000)",
            ["--btn-radius" as string]:
              style?.button_style === "sharp" ? "0" : "8px",
          }}
          onClick={() => window.open(sns.url, "_blank", "noopener,noreferrer")}
        >
          {sns.label || sns.platform}
        </Button>
      ))}
    </div>
  );
}
