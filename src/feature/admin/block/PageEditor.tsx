"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import BlockItem from "./BlockItem";
import BlockDialog from "./BlockDialog";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Block, BlockItemType } from "@/entities/page/model/types";
import ProfileBlock from "./ProfileBlock";
import { cn } from "@/shared/lib/utils";
import useAutoSaveBlocks from "@/feature/page/hooks/useAutoSaveBlocks";

function Skel({ className = "" }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-muted/30 rounded-md", className)} />
  );
}

export default function PageEditor() {
  const { control, watch } = useFormContext();
  const { fields, move, update, remove } = useFieldArray({
    control,
    name: "blocks_draft",
    keyName: "block_id",
  });

  const [openBlockDialog, setOpenBlockDialog] = useState(false);

  useAutoSaveBlocks(watch("id"));
  // useAutoSaveProfile(watch("user_id"));

  const blocksWatch = useWatch({ control, name: "blocks_draft" });
  const isLoading = blocksWatch === undefined;

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;
    move(source.index, destination.index);
    const updatedBlocks = [...watch("blocks_draft")].map(
      (block: Block, index: number) => ({
        ...block,
        position: index + 1,
      })
    );
    updatedBlocks.forEach((block, idx) => update(idx, block));
  };

  const handleDeleteBlock = (index: number) => {
    remove(index);
  };

  // published 하는 함수
  const handleSavePage = async () => {
    // const blocks = watch("blocks_draft");
    // const profile = watch("profile");
    // const style = watch("style_draft");

    // await handleAction(
    //   () =>
    //     apiClient.put(`/api/pages/${watch("id")}/publish`, {
    //       blocks_draft: blocks,
    //       profile_draft: profile,
    //       style_draft: style,
    //     }),
    //   {
    //     successMessage: "내 공간에 반영되었습니다.",
    //     errorMessage: "저장이 실패되었습니다. 다시 시도해 주세요.",
    //   }
    // );
    setOpenBlockDialog(false);
  };

  return (
    <article className="px-4 flex flex-col gap-4 pt-4 pb-24 max-w-[900px] w-full mx-auto md:pl-10 lg:max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold">구성하기</h2>
        <div className="flex items-center gap-2">
          <BlockDialog
            open={openBlockDialog}
            onOpenChange={setOpenBlockDialog}
            trigger={
              <Button
                type="button"
                className="w-fit"
                variant="outline"
                disabled={isLoading}
              >
                요소 추가하기
              </Button>
            }
          />
          <Button
            type="button"
            className="w-fit"
            onClick={handleSavePage}
            disabled={isLoading}
          >
            반영하기
          </Button>
        </div>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        원하는 요소를 골라서 페이지에 추가해보세요. 각각의 요소를 블록처럼 쌓아
        올려 나만의 작가 페이지를 만들 수 있습니다.
      </p>

      {/* Profile skeleton */}
      {isLoading ? (
        <div className="grid gap-4">
          <Skel className="h-28 rounded-xl" />
          <Skel className="h-20" />
          <Skel className="h-20" />
          <Skel className="h-20" />
        </div>
      ) : (
        // DnD List
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks" type="BLOCK">
            {(provided) => (
              <div
                className="flex flex-col gap-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* 프로필 편집 블록은 로딩 이후에 표시 */}
                <ProfileBlock />
                {fields.map((block, index) => (
                  <Draggable
                    key={block.block_id}
                    draggableId={block.block_id}
                    index={index}
                  >
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <BlockItem
                          index={index}
                          block={block as BlockItemType}
                          dragHandleProps={provided.dragHandleProps ?? {}}
                          onDelete={() => handleDeleteBlock(index)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </article>
  );
}
