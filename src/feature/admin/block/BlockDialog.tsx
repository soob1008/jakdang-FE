"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BLOCK_LIST } from "./const";
import { BlockType, Block } from "../types";
import { apiClient } from "@/lib/api/api.client";
import { handleAction } from "@/lib/api/action";
import { useFormContext } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

interface BlockSelectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
}

export default function BlockDialog({
  open,
  onOpenChange,
  trigger,
}: BlockSelectDialogProps) {
  const queryClient = useQueryClient();

  const { watch } = useFormContext();
  const [selectedType, setSelectedType] = useState<BlockType | null>(null);

  useEffect(() => {
    if (!open) {
      setSelectedType(null);
    }
  }, [open]);

  console.log("Selected Block Type:", selectedType);

  const handleAddBlock = async () => {
    if (!selectedType) {
      console.error("No block type selected");
      return;
    }

    await handleAction(
      () =>
        apiClient.post<Block, { type: BlockType }>(
          `/api/pages/${watch("id")}/draft`,
          {
            type: selectedType,
          }
        ),
      {
        successMessage: "블록이 성공적으로 추가되었습니다.",
        errorMessage: "블록 추가에 실패했습니다.",
        onSuccess: () => {
          onOpenChange(false);
          setSelectedType(null);
          queryClient.invalidateQueries({ queryKey: ["admin-page"] });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-8/9 max-w-2xl sm:max-w-3xl ">
        <DialogHeader>
          <DialogTitle>블록 선택</DialogTitle>
          <DialogDescription>추가할 블록을 하나 선택하세요.</DialogDescription>
        </DialogHeader>
        <div className="max-h-140 overflow-y-auto">
          <RadioGroup
            value={selectedType || ""}
            onValueChange={(value: BlockType) => {
              setSelectedType(value || null);
            }}
            className="space-y-6"
          >
            {BLOCK_LIST.map((group) => (
              <div key={group.category}>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                  {group.category}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {group.blocks.map((block) => {
                    const Icon = block.icon;
                    return (
                      <label
                        key={block.type}
                        htmlFor={block.type}
                        className={cn(
                          "p-4 border h-32 rounded-md flex flex-col items-center gap-2 cursor-pointer transition",
                          selectedType === block.type && "bg-secondary"
                        )}
                      >
                        <RadioGroupItem
                          value={block.type}
                          id={block.type}
                          className="sr-only"
                        />
                        <Icon className="w-6 h-6" />
                        <span className="font-medium text-sm">
                          {block.name}
                        </span>
                        <span className="text-xs text-muted-foreground text-center">
                          {block.description}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button onClick={handleAddBlock} disabled={!selectedType}>
            추가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
