"use client";

import { Block } from "@/feature/admin/types";
import { Button } from "@/components/ui/button";
import { BlockDataLink } from "@/feature/admin/types";

interface LinkBlockProps {
  block: Block;
}

export default function LinkBlock({ block }: LinkBlockProps) {
  const { links = [] } = block.data as BlockDataLink;

  if (!block.is_active || links.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <Button
          key={`${link.label}-${link.url}`}
          type="button"
          variant="outline-primary"
          size="2xl"
          className="w-full rounded-none text-sm truncate"
          onClick={() => window.open(link.url, "_blank", "noopener noreferrer")}
        >
          {link.label}
        </Button>
      ))}
    </div>
  );
}
