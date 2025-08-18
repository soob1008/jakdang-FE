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
import Image from "next/image";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelectedType(null);
    }
  }, [open]);

  const handleAddBlock = async () => {
    if (!selectedType) {
      return;
    }
    setIsLoading(true);

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
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-8/9 max-w-2xl sm:max-w-3xl ">
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
        <div className="max-h-140 overflow-y-auto px-2 pb-10">
          <RadioGroup
            value={selectedType || ""}
            onValueChange={(value: BlockType) => {
              setSelectedType(value || null);
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

                  {/* 템플릿은 1~2열 큰 카드, 요소는 5열 그리드 유지 */}
                  <div
                    className={cn(
                      isTemplate
                        ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                        : "grid grid-cols-5 sm:grid-cols-5 gap-4"
                    )}
                  >
                    {group.blocks.map((block) => {
                      const isSelected = selectedType === block.type;
                      const isTemplateCard = isTemplate;
                      const Icon = block.icon;

                      return (
                        <label
                          key={block.type}
                          htmlFor={block.type}
                          className={cn(
                            "relative cursor-pointer rounded-lg border overflow-hidden transition focus-within:ring-2",
                            isTemplateCard
                              ? "p-0" // 템플릿 카드: 이미지가 꽉 차게
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
                              {/* 큰 미리보기 이미지 */}
                              <div className="relative w-full">
                                <Image
                                  src={
                                    block.imageSrc ??
                                    "/assets/template/profile.jpg"
                                  }
                                  alt={`${block.name} 미리보기`}
                                  width={1600}
                                  height={1000}
                                  // 이미지가 화면을 꽉 채우도록
                                  className="w-full aspect-[16/10] object-contain block transition-transform duration-300 will-change-transform hover:scale-[1.02]"
                                  priority
                                />
                                {/* 상단 그라데이션 + 타이틀 */}
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent"></div>
                                {/* 선택 체크 배지 */}
                                {isSelected && (
                                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md shadow">
                                    선택됨
                                  </div>
                                )}
                              </div>

                              {/* 하단 바: 미리보기/선택 가이드 (옵션) */}
                              <p className="py-2 text-sm font-medium text-center">
                                {block.name}
                              </p>
                            </>
                          ) : (
                            // 요소 카드 (아이콘+텍스트)
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
            추가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
