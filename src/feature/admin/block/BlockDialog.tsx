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
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { BLOCK_LIST } from "./const";
import { createDefaultBlock } from "./utils";
import { BlockType } from "../types";

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
  const [selectedType, setSelectedType] = useState<BlockType | null>(null);

  console.log("Selected block type:", selectedType);
  // TODO:
  const handleAddBlock = () => {
    if (selectedType) {
      const block = createDefaultBlock(selectedType);
      console.log("Adding block:", block);

      const body = {};
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>블록 선택</DialogTitle>
          <DialogDescription>추가할 블록을 하나 선택하세요.</DialogDescription>
        </DialogHeader>
        <div className="max-h-120 overflow-y-auto">
          <RadioGroup
            value={selectedType}
            onValueChange={(value) => {
              console.log("Selected block type:", value);
              setSelectedType(value);
            }}
            className="space-y-6"
          >
            {BLOCK_LIST.map((group) => (
              <div key={group.category}>
                <h4 className="text-sm font-semibold text-muted-foreground">
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
