// WorkBlock.tsx
import React, { useState } from "react";
import Image from "next/image";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkBlock({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data.works`;
  const { control, register, setValue } = useFormContext();
  const { fields, remove } = useFieldArray({
    control,
    name: namePrefix,
    keyName: "block_id",
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {fields.map((field, i) => {
        const path = `${namePrefix}.${i}`;
        const [isDeleteOpen, setIsDeleteOpen] = useState(false);
        const [loaded, setLoaded] = useState(false);

        return (
          <div key={field.block_id} className="flex flex-col">
            <div className="relative w-full aspect-[1] overflow-hidden rounded-md shadow-sm bg-white">
              {!loaded && (
                <Skeleton className="absolute top-0 left-0 w-full h-full" />
              )}
              <Image
                src={
                  field.image_url
                    ? process.env.NEXT_PUBLIC_IMAGE_URL + field.image_url
                    : "/assets/basic_book.jpg"
                }
                alt={field.title || "작품 이미지"}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 50vw"
                onLoad={() => setLoaded(true)}
              />
              {field.is_representative && (
                <Badge className="absolute top-2 left-2" size="xs">
                  대표작
                </Badge>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  size="icon"
                  variant="outline"
                  className="w-7 h-7 p-1 rounded-full"
                  aria-label="Edit Work"
                  type="button"
                  onClick={() => alert("작품 수정 기능은 아직 미구현입니다")}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-7 h-7 p-1 rounded-full"
                      aria-label="Delete Work"
                      type="button"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>삭제하시겠습니까?</AlertDialogTitle>
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
            </div>

            <div className="pt-4 space-y-2">
              <Input
                {...register(`${path}.title`)}
                placeholder="작품 제목"
                className="text-sm"
              />
              <Input
                {...register(`${path}.description`)}
                placeholder="작품 설명"
                className="text-sm"
              />
              <div className="flex items-center justify-between">
                <Input
                  {...register(`${path}.url`)}
                  placeholder="링크 주소"
                  className="text-sm max-w-[70%]"
                />
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
          </div>
        );
      })}
    </div>
  );
}
