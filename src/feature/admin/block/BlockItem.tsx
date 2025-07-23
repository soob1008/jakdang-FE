import { GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TextBlock from "./text/TextBlock";
import BlockOptions from "./BlockOptions";
import ImageBlock from "./image/ImageBlock";
import WorkBlock from "./work/WorkBlock";
import LinkBlock from "./link/LInkBlock";

interface BlockItemProps {
  index: number;
  block: {
    id: string;
    type: string;
    name?: string;
  };
}

export default function BlockItem({ index, block }: BlockItemProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* 헤더 영역 */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
          <h4 className="font-semibold">
            {block.name || block.type.toUpperCase()}
          </h4>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* 내용 영역 */}
      {isOpen && (
        <div className="px-4 py-6 space-y-2">
          {block.type === "text" && <TextBlock index={index} />}
          {block.type === "image" && <ImageBlock index={index} />}
          {block.type === "work" && <WorkBlock />}
          {block.type === "link" && <LinkBlock index={index} />}
          {/* 기타 블록 추가 예정 */}
          <BlockOptions type={block.type} />
        </div>
      )}
    </div>
  );
}
