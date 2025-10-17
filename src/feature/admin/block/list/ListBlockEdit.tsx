"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";
import { Textarea } from "@/shared/ui/textarea";
import { X, Plus, GripVertical, Upload } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { handleAction } from "@/shared/lib/api/action";
import { uploadImage } from "@/shared/lib/api/api.client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/shared/ui/form";

type ListItem = {
  title: string;
  short_description?: string;
  description?: string;
  url?: string;
  image_url?: string;
  is_active: boolean;
  is_representative: boolean;
};

export default function ListBlockEdit({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data`;
  const itemNamePrefix = `${namePrefix}.lists`;

  const { control, register, watch, setValue } = useFormContext();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: itemNamePrefix,
    keyName: "_key",
  });

  const items: ListItem[] = watch(itemNamePrefix) || [];

  const [deleteKey, setDeleteKey] = useState<string | null>(null);
  const getIndexByKey = (key: string | null) =>
    key ? fields.findIndex((f) => f._key === key) : -1;

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleAction(() => uploadImage(file), {
      successMessage: "이미지 업로드 완료",
      errorMessage: "이미지 업로드 실패",
      onSuccess: ({ imagePath }) => {
        const idx = getIndexByKey(key);
        if (idx > -1) {
          setValue(`${itemNamePrefix}.${idx}.image_url`, imagePath, {
            shouldDirty: true,
          });
        }
      },
    });

    e.target.value = "";
  };

  const handleAddItem = () => {
    append({
      id: crypto.randomUUID(),
      title: "",
      short_description: "",
      description: "",
      url: "",
      image_url: "",
      is_active: true,
      is_representative: false,
    } as ListItem);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <div className="space-y-4">
      {/* 상단 추가 버튼 */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddItem}
        >
          <Plus className="w-4 h-4" />
          추가
        </Button>
      </div>

      <FormField
        name={`${namePrefix}.title`}
        render={({ field }) => (
          <FormItem className="w-1/2">
            <FormControl>
              <Input placeholder="제목" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list-items" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3 md:space-y-4"
            >
              {fields.map((field, i: number) => {
                const itemPath = `${itemNamePrefix}.${i}`;

                return (
                  <Draggable
                    key={field._key}
                    draggableId={field._key}
                    index={i}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="relative flex flex-col md:flex-row gap-3 md:gap-4 p-3 md:p-4 bg-white border rounded-md"
                      >
                        {/* Drag handle */}
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-grab text-gray-400 md:self-start"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>

                        {/* 썸네일 + 업로드 */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded overflow-hidden bg-white border">
                          <Image
                            src={
                              items[i]?.image_url
                                ? (process.env.NEXT_PUBLIC_IMAGE_URL || "") +
                                  items[i].image_url
                                : "/assets/basic_book.jpg"
                            }
                            alt="리스트 항목 이미지"
                            fill
                            className="object-cover"
                          />
                          <label className="absolute bottom-1 right-1 bg-white/80 hover:bg-white p-1 rounded cursor-pointer">
                            <Upload className="w-3 h-3" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, field._key)} // ✅ key 기반
                            />
                          </label>
                        </div>

                        {/* 입력 필드들 */}
                        <div className="flex flex-col flex-grow gap-2 md:gap-3">
                          {/* 상단 스위치들 */}
                          <div className="flex flex-wrap items-center gap-3">
                            {/* <div className="flex items-center gap-2 text-xs">
                              대표 항목
                              <Controller
                                control={control}
                                name={`${itemPath}.is_representative`}
                                render={({ field }) => (
                                  <Switch
                                    checked={!!field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                )}
                              />
                            </div> */}
                            <div className="flex items-center gap-2 text-xs">
                              공개
                              <Controller
                                control={control}
                                name={`${itemPath}.is_active`}
                                render={({ field }) => (
                                  <Switch
                                    checked={!!field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                )}
                              />
                            </div>
                          </div>

                          {/* 텍스트 입력: 반응형 그리드 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                            <Input
                              {...register(`${itemPath}.title`)}
                              placeholder="제목"
                              className="text-sm"
                            />
                            <Input
                              {...register(`${itemPath}.short_description`)}
                              placeholder="한줄 설명"
                              className="text-sm"
                            />
                            <Input
                              {...register(`${itemPath}.url`)}
                              placeholder="링크 주소"
                              className="text-sm md:col-span-2"
                            />
                          </div>

                          <Textarea
                            {...register(`${itemPath}.description`)}
                            placeholder="항목에 대한 내용이나 긴 설명을 적어주세요."
                            className="text-sm h-28 md:h-32 lg:h-40 resize-none"
                          />
                        </div>

                        {/* 삭제 버튼 → 다이얼로그는 전역 하나만 */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 md:static md:self-start md:ml-auto"
                          onClick={() => setDeleteKey(field._key)} // ✅ 클릭 시 삭제대상 key 저장
                        >
                          <X className="w-4 h-4" />
                        </Button>
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

      {/* ✅ 전역 AlertDialog 하나만 사용 */}
      <AlertDialog
        open={!!deleteKey}
        onOpenChange={(o) => !o && setDeleteKey(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>항목을 삭제할까요?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const idx = getIndexByKey(deleteKey);

                if (idx > -1) remove(idx);
                setDeleteKey(null);
              }}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
