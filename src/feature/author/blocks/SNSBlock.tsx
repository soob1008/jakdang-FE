"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Block, BlockDataSNS, PageStyle } from "@/feature/admin/types";

interface SNSBlockProps {
  block: Block;
  style: PageStyle;
}

// --- contrast util (WCAG-ish heuristic) ---
function hexToRgb(hex: string) {
  const h = (hex || "#000000").replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return { r, g, b };
}
function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const s = [r, g, b].map((v) => v / 255);
  const l = s.map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
}
function autoContrast(hex: string) {
  try {
    return relativeLuminance(hexToRgb(hex)) > 0.179 ? "#000000" : "#ffffff";
  } catch {
    return "#000000";
  }
}

function contrastRatio(fgHex: string, bgHex: string) {
  try {
    const L1 = relativeLuminance(hexToRgb(fgHex));
    const L2 = relativeLuminance(hexToRgb(bgHex));
    const light = Math.max(L1, L2);
    const dark = Math.min(L1, L2);
    return (light + 0.05) / (dark + 0.05);
  } catch {
    return 1;
  }
}

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
          // use default variant; override colors with CSS vars + arbitrary values
          className="w-full rounded-[var(--btn-radius)] text-sm truncate border-0
                     bg-[var(--sns-color)] text-[var(--sns-fg)]
                     hover:bg-[var(--sns-hover)]
                     focus-visible:ring-2 focus-visible:ring-[var(--sns-color)]
                     transition-colors"
          style={{
            ["--sns-color" as string]: theme,
            ["--sns-fg" as string]: fg,
            // darken a touch on hover regardless of base tone
            ["--sns-hover" as string]:
              "color-mix(in srgb, var(--sns-color) 88%, #000)",
          }}
          onClick={() => window.open(sns.url, "_blank", "noopener,noreferrer")}
        >
          {sns.label || sns.platform}
        </Button>
      ))}
    </div>
  );
}
