"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { BLOCK_LIST } from "./const";
import { BlockType, TemplateType } from "@/entities/page/model/types";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import useAddBlock from "@/feature/page/hooks/useAddBlock";

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
  const { mutateAsync: addBlock } = useAddBlock();
  const { watch } = useFormContext();

  const [selectedType, setSelectedType] = useState<{
    type: string;
    isTemplate: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 다이얼로그 닫힐 때 선택 초기화
  useEffect(() => {
    if (!open) setSelectedType(null);
  }, [open]);

  const handleAddBlock = async () => {
    if (!selectedType) return;

    const pageId = watch("id");
    if (!pageId) return;

    try {
      setIsLoading(true);

      const payload = selectedType.isTemplate
        ? { pageId, template: selectedType.type as TemplateType }
        : { pageId, type: selectedType.type as BlockType };

      await addBlock(payload);
    } finally {
      setIsLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-8/9 max-w-2xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>페이지 구성 요소 선택</DialogTitle>
          <DialogDescription>
            두 가지 방식 중 하나를 선택하세요.
            <br />
            <strong>① 페이지 요소</strong>: 글·이미지·링크 같은 단일 요소를 하나
            추가합니다.
            <br />
            <strong>② 템플릿</strong>: 프로필형·웹매거진형 등 미리 구성된
            묶음으로 빠르게 시작합니다.
            <br />
            <span className="text-red-600 font-medium">
              ※ 템플릿을 적용하면 현재 페이지의 구성 요소와 데이터가 모두
              초기화됩니다.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-125 overflow-y-auto px-2 pb-10">
          <RadioGroup
            value={selectedType?.type ?? ""}
            onValueChange={(value: string) => {
              const found = BLOCK_LIST.flatMap((g) => g.blocks).find(
                (b) => b.type === value
              );
              if (found) {
                setSelectedType({
                  type: found.type,
                  isTemplate:
                    BLOCK_LIST.find(
                      (g) => g.category === "템플릿"
                    )?.blocks.includes(found) ?? false,
                });
              }
            }}
            className="space-y-6"
          >
            {BLOCK_LIST.map((group) => {
              const isTemplate = group.category === "템플릿";

              return (
                <div key={group.category}>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                    {group.category}
                  </h4>

                  <div
                    className={cn(
                      isTemplate
                        ? "grid grid-cols-1 sm:grid-cols-3 gap-6"
                        : "grid grid-cols-2 sm:grid-cols-5 gap-4"
                    )}
                  >
                    {group.blocks.map((block) => {
                      const isSelected = selectedType?.type === block.type;
                      const Icon = block.icon;
                      const isTemplateCard = isTemplate;

                      return (
                        <label
                          key={block.type}
                          htmlFor={block.type}
                          className={cn(
                            "relative cursor-pointer rounded-lg border overflow-hidden transition focus-within:ring-2",
                            isTemplateCard
                              ? "p-0"
                              : "p-3 flex flex-col items-center gap-2",
                            isSelected
                              ? "ring-2 ring-primary"
                              : "hover:border-foreground/40"
                          )}
                        >
                          <RadioGroupItem
                            value={block.type}
                            id={block.type}
                            className="sr-only"
                          />

                          {isTemplateCard ? (
                            <>
                              <div className="relative w-full">
                                <Image
                                  src={
                                    block.imageSrc ??
                                    "/assets/template/profile.jpg"
                                  }
                                  alt={`${block.name} 미리보기`}
                                  width={1600}
                                  height={1000}
                                  className="w-full aspect-[16/10] object-contain block transition-transform duration-300 will-change-transform hover:scale-[1.02]"
                                  priority
                                />
                                {isSelected && (
                                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md shadow">
                                    선택됨
                                  </div>
                                )}
                              </div>
                              <p className="py-2 text-sm font-medium text-center">
                                {block.name}
                              </p>
                            </>
                          ) : (
                            <>
                              {Icon && <Icon className="w-6 h-6" />}
                              <span className="font-medium text-sm text-center">
                                {block.name}
                              </span>
                            </>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button
            onClick={handleAddBlock}
            disabled={!selectedType || isLoading}
          >
            {selectedType?.isTemplate ? "템플릿 추가하기" : "요소 추가하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
