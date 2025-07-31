"use client";

import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash, Plus, GripVertical, Upload } from "lucide-react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { handleAction } from "@/lib/api/action";
import { uploadImage } from "@/lib/api/api.client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { ChangeEvent, useState } from "react";

export default function WorkBlock({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data.works`;
  const { control, register, watch } = useFormContext();
  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: namePrefix,
    keyName: "block_id",
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const works = watch(namePrefix) || [];

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleAction(() => uploadImage(file, watch("user_id")), {
      successMessage: "이미지 업로드 완료",
      errorMessage: "이미지 업로드 실패",
      onSuccess: ({ imagePath }) => {
        update(i, {
          ...works[i],
          image_url: imagePath,
        });
      },
    });

    e.target.value = "";
  };

  const handleAddWork = () => {
    append({
      title: "",
      description: "",
      url: "",
      image_url: "",
      is_active: true,
      is_representative: false,
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={handleAddWork}>
          <Plus className="w-4 h-4 mr-2" />
          작품 추가
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="work-list" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {fields.map((field, i) => {
                const path = `${namePrefix}.${i}`;

                return (
                  <Draggable
                    key={field.block_id}
                    draggableId={field.block_id}
                    index={i}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="relative flex gap-4 p-3 bg-white border rounded-md"
                      >
                        {/* Drag handle */}
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-grab text-gray-400"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>

                        {/* 썸네일 이미지 + 업로드 */}
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-white border">
                          <Image
                            src={
                              works[i]?.image_url
                                ? process.env.NEXT_PUBLIC_IMAGE_URL +
                                  works[i].image_url
                                : "/assets/basic_book.jpg"
                            }
                            alt="작품 이미지"
                            fill
                            className="object-cover"
                          />
                          <label className="absolute bottom-0 right-0 bg-white/80 hover:bg-white p-0.5 rounded cursor-pointer">
                            <Upload className="w-3 h-3" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, i)}
                            />
                          </label>
                        </div>

                        {/* 입력 필드들 */}
                        <div className="flex flex-col flex-grow gap-1">
                          {/* 대표작 / 공개 여부 */}
                          <div className="flex gap-2">
                            <div className="flex items-center gap-2 text-xs">
                              대표작
                              <Controller
                                control={control}
                                name={`${path}.is_representative`}
                                render={({ field }) => (
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                )}
                              />
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              공개
                              <Controller
                                control={control}
                                name={`${path}.is_active`}
                                render={({ field }) => (
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                )}
                              />
                            </div>
                          </div>
                          <Input
                            {...register(`${path}.title`)}
                            placeholder="제목"
                            className="text-sm"
                          />
                          <Input
                            {...register(`${path}.description`)}
                            placeholder="설명"
                            className="text-sm"
                          />
                          <Input
                            {...register(`${path}.url`)}
                            placeholder="링크 주소"
                            className="text-sm"
                          />
                        </div>

                        {/* 삭제 버튼 */}
                        <AlertDialog
                          open={isDeleteOpen}
                          onOpenChange={setIsDeleteOpen}
                        >
                          <AlertDialogTrigger asChild>
                            <Button type="button" variant="ghost" size="icon">
                              <Trash className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                작품을 삭제할까요?
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>취소</AlertDialogCancel>
                              <AlertDialogAction onClick={() => remove(i)}>
                                삭제
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
