import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { ChangeEvent } from "react";
import { uploadImage } from "@/lib/api/api.client";
import { handleAction } from "@/lib/api/action";
import { toast } from "sonner";

export default function ImageBlock({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data.images`;
  const { control, register, watch, setValue } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: namePrefix,
    keyName: "block_id",
  });

  const images = watch(namePrefix) || [];

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (fields.length >= 10) return;

    const file: File | null = e.target.files?.[0] || null;

    if (!file) {
      toast.error("이미지 파일을 선택해주세요.");
      return;
    }

    await handleAction(() => uploadImage(file, watch("user_id")), {
      successMessage: "이미지가 성공적으로 업로드되었습니다.",
      errorMessage: "이미지 업로드에 실패했습니다.",
      onSuccess: ({ imagePath }) => {
        const baseName = file.name.replace(/\.[^/.]+$/, "");

        append({
          url: imagePath,
          alt: baseName,
          link: "",
          position: fields.length,
        });
      },
    });

    e.target.value = "";
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const from = result.source.index;
    const to = result.destination.index;

    move(from, to);

    const reordered = [...images];
    const movedItem = reordered.splice(from, 1)[0];
    reordered.splice(to, 0, movedItem);

    const updatedWithPosition = reordered.map((item, i) => ({
      ...item,
      position: i,
    }));

    setValue(namePrefix, updatedWithPosition);
  };

  return (
    <div className="space-y-4">
      <FormLabel>업로드 (최대 10장)</FormLabel>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={`images-${namePrefix}`} type="IMAGE">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-5 gap-4"
            >
              {fields.map((field, i) => (
                <Draggable
                  key={field.block_id}
                  draggableId={field.block_id}
                  index={i}
                >
                  {(provided) => (
                    <div
                      key={field.block_id}
                      className="flex flex-col"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* 이미지 영역 */}
                      <div className="relative w-full pt-[100%] bg-muted rounded-md overflow-hidden">
                        <Image
                          src={
                            `${process.env.NEXT_PUBLIC_IMAGE_URL}${images[i]?.url}` ||
                            "https://via.placeholder.com/300"
                          }
                          alt={images[i]?.alt || "image"}
                          fill
                          className="object-cover"
                        />

                        {/* 삭제 아이콘 */}
                        <button
                          type="button"
                          onClick={() => remove(i)}
                          className="absolute top-1 right-1 p-2 rounded-full bg-white/70 hover:bg-white shadow"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>

                      {/* 링크 입력 필드 */}
                      <div className="mt-1">
                        <Input
                          {...register(`${namePrefix}.${i}.link`)}
                          placeholder="링크(선택)"
                          className="text-xs px-2 py-1 h-8 rounded-md"
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}

              {/* 추가 버튼 */}
              {fields.length < 10 && (
                <label
                  htmlFor={`image-upload-${index}`}
                  className="cursor-pointer flex items-center justify-center w-full aspect-square bg-muted rounded-md border border-dashed hover:bg-muted/70"
                >
                  <Plus className="w-6 h-6 text-muted-foreground" />
                  <input
                    id={`image-upload-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    hidden
                  />
                </label>
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
