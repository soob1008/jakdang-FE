"use client";

import { Block, BlockDataSNS } from "@/feature/admin/types";
import { Button } from "@/components/ui/button";

interface SNSBlockProps {
  block: Block;
}

export default function SNSBlock({ block }: SNSBlockProps) {
  if (!block.is_active) return null;

  const { sns_links = [] } = block.data as BlockDataSNS;

  if (sns_links.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {sns_links.map((sns) => (
        <Button
          key={`${sns.platform}-${sns.url}`}
          type="button"
          size="2xl"
          className="w-full rounded-none text-sm truncate"
          onClick={() => window.open(sns.url, "_blank", "noopener noreferrer")}
        >
          {sns.label || sns.platform}
        </Button>
      ))}
    </div>
  );
}
