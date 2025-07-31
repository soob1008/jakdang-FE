"use client";

import { useEffect, useState } from "react";
import { GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import BlockOptions from "./BlockOptions";
import TextBlock from "./text/TextBlock";
import { BlockItemType } from "@/feature/admin/types";
import ImageBlock from "./image/ImageBlock";
import LinkBlock from "./link/LInkBlock";
import SNSBlock from "./sns/SNSBlock";
// import 기타 블록들

interface BlockItemProps {
  index: number;
  block: BlockItemType;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export default function BlockItem({
  index,
  block,
  dragHandleProps,
}: BlockItemProps) {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // mount 이후에 localStorage 값 반영
  useEffect(() => {
    const id = localStorage.getItem("selected-block-id");
    setSelectedBlockId(
      id !== null && id !== undefined && id !== "" ? id : null
    );
  }, []);

  // 현재 블럭이 선택된 블럭인지 계산
  const isOpen = selectedBlockId === block.id;

  const handleToggle = () => {
    const next = isOpen ? null : block.id;
    localStorage.setItem("selected-block-id", next ?? "");
    setSelectedBlockId(next ?? null);
  };

  console.log("BlockItem render", selectedBlockId, block);

  return (
    <section className="bg-white rounded-lg shadow-sm">
      {/* 헤더 영역 */}
      <div
        className="flex items-center justify-between p-3 border-b"
        {...dragHandleProps}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
          <h4 className="font-semibold">
            {block.name || block.type.toUpperCase()}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <FormField
            name={`blocks_draft.${index}.is_active`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id={`blocks_draft.${index}.is_active`}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToggle}
          >
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* 내용 영역 */}
      {isOpen && (
        <div className="px-4 py-6 space-y-2">
          {block.type === "text" && <TextBlock index={index} />}
          {block.type === "image" && <ImageBlock index={index} />}
          {block.type === "link" && <LinkBlock index={index} />}
          {block.type === "sns" && <SNSBlock index={index} />}
          {/* 다른 블록들도 필요 시 추가 */}
          <BlockOptions type={block.type} index={index} />
        </div>
      )}
    </section>
  );
}
