"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import BlockItem from "./BlockItem";
import BlockDialog from "./BlockDialog";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useAutoSaveBlock } from "@/hooks/useAutoSaveBlock";

export default function PageEditor() {
  const { control, watch } = useFormContext();
  const { fields, move, update } = useFieldArray({
    control,
    name: "blocks_draft",
    keyName: "block_id",
  });

  const [openBlockDialog, setOpenBlockDialog] = useState(false);

  useAutoSaveBlock(watch("id"));

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return; // 드롭 안한 경우 무시
    if (source.index === destination.index) return; // 위치 변경 없음

    // 순서 변경
    move(source.index, destination.index);

    // position 값 재정렬 + 1
    const updatedBlocks = [...watch("blocks_draft")].map((block, index) => ({
      ...block,
      position: index + 1,
    }));

    updatedBlocks.forEach((block, idx) => {
      update(idx, block);
    });
  };

  return (
    <article className="pr-2 flex flex-col gap-4 pt-4 pl-10 pb-24 max-w-[900px] w-full mx-auto lg:max-w-none">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-lg font-bold">구성하기</h2>
        <div className="flex items-center gap-2">
          <BlockDialog
            open={openBlockDialog}
            onOpenChange={setOpenBlockDialog}
            trigger={
              <Button type="button" className="w-fit" variant="outline">
                블록 추가하기
              </Button>
            }
          />
          <Button type="button" className="w-fit">
            저장하기
          </Button>
        </div>
      </div>

      {fields.length === 0 ? (
        <div className="mt-10 text-center text-sm text-gray-500">
          추가된 블록이 없습니다. 블록을 추가해 주세요.
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks" type="BLOCK">
            {(provided) => (
              <div
                className="flex flex-col gap-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
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
                          block={block as BlockItem}
                          dragHandleProps={provided.dragHandleProps ?? {}}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </article>
  );
}
