"use client";

import React from "react";
import Link from "next/link";
import { Block, BlockDataSNS, PageStyle } from "@/entities/block/model/types";
import Image from "next/image";
import { SNSPlatform } from "@/entities/block/model/types";

interface SNSBlockProps {
  block: Block;
  style: PageStyle;
}

// --- contrast util (WCAG-ish heuristic) ---

export default function SNSBlock({ block, style }: SNSBlockProps) {
  if (!block?.is_active) return null;
  const { sns_links = [] } = (block.data as BlockDataSNS) || {};
  if (sns_links.length === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-4 py-2 bg-white rounded-[var(--btn-radius)]"
      style={{
        ["--btn-radius" as string]:
          style?.button_style === "sharp" ? "0px" : "8px",
      }}
    >
      {sns_links.map((sns, index) => (
        <Link
          key={`${sns.platform}-${sns.url}-${index}`}
          href={sns.platform === "email" ? `mailto:${sns.url}` : sns.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            key={`${sns.platform}-${sns.url}`}
            src={getSNSIconPath(sns.platform as SNSPlatform)}
            width={32}
            height={32}
            alt={sns.label || sns.platform}
            className="w-6.5 h-6.5 object-contain transition-transform hover:scale-110"
          />
        </Link>
      ))}
    </div>
  );
}

const getSNSIconPath = (platform: SNSPlatform) => {
  switch (platform) {
    case "blog":
      return "/assets/social/blog.webp";
    case "facebook":
      return "/assets/social/facebook.webp";
    case "x":
      return "/assets/social/x.webp";
    case "brunch":
      return "/assets/social/brunch.webp";
    case "youtube":
      return "/assets/social/youtube.webp";
    case "threads":
      return "/assets/social/threads.webp";
    case "medium":
      return "/assets/social/medium.webp";
    case "linkedin":
      return "/assets/social/linkedin.webp";
    case "instagram":
      return "/assets/social/instagram.webp";
    case "email":
      return "/assets/social/mail.webp";
    default:
      return "";
  }
};

// <Button
//   key={`${sns.platform}-${sns.url}`}
//   type="button"
//   size="2xl"
//   className="w-full text-sm truncate border-0
//              bg-[var(--sns-color)] text-[var(--sns-fg)]
//              hover:bg-[var(--sns-hover)]
//              focus-visible:ring-2 focus-visible:ring-[var(--sns-color)]
//              transition-colors rounded-[var(--btn-radius)]"
//   style={{
//     ["--sns-color" as string]: theme,
//     ["--sns-fg" as string]: fg,
//     // darken a touch on hover regardless of base tone
//     ["--sns-hover" as string]:
//       "color-mix(in srgb, var(--sns-color) 88%, #000)",
//     ["--btn-radius" as string]:
//       style?.button_style === "sharp" ? "0" : "8px",
//   }}
//   onClick={() => window.open(sns.url, "_blank", "noopener,noreferrer")}
// >
//   {sns.label || sns.platform}
// </Button>
