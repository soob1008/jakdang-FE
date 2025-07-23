import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function ImageBlock({ index }: { index: number }) {
  const namePrefix = `blocks.${index}.data.images`;
  const { control, register, watch } = useFormContext();
  const { fields, remove } = useFieldArray({
    control,
    name: namePrefix,
  });
  const images = watch(namePrefix) || [];

  const handleUpload = () => {
    if (fields.length >= 10) return;
    // 실제 파일 업로드 구현 필요

    console.log("이미지 업로드");
  };

  return (
    <div className="space-y-4">
      <FormLabel>이미지 업로드 (최대 10장)</FormLabel>
      <div className="grid grid-cols-3 gap-4">
        {fields.map((field, i) => (
          <div key={field.id} className="flex flex-col gap-2">
            <div className="relative w-full pt-[100%] bg-muted rounded-md overflow-hidden">
              <Image
                src={images[i]?.url || "https://via.placeholder.com/300"}
                alt={images[i]?.alt || "image"}
                fill
                className="object-cover"
              />
            </div>
            <Input
              {...register(`${namePrefix}.${i}.link`)}
              placeholder="선택사항: 링크 주소"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => remove(i)}
            >
              삭제
            </Button>
          </div>
        ))}

        {fields.length < 10 && (
          <button
            type="button"
            onClick={handleUpload}
            className="flex items-center justify-center w-24 h-24 aspect-square bg-muted rounded-md border border-dashed hover:bg-muted/70"
          >
            <Plus className="w-6 h-6 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}
