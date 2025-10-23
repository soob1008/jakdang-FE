"use client";

import { useMemo } from "react";
import type { Work } from "@/entities/work/model/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useFormContext } from "react-hook-form";

type WorkBlockEditProps = {
  index: number;
  works: Work[];
};

export default function WorkBlockEdit({ index, works }: WorkBlockEditProps) {
  const hasWorks = works && works.length > 0;
  const { control } = useFormContext();

  const workField = `blocks_draft.${index}.data.work` as const;

  const workLookup = useMemo(() => {
    const map = new Map<string, Work>();
    works.forEach((work) => {
      map.set(work.id, work);
    });
    return map;
  }, [works]);

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={workField}
        render={({ field }) => {
          const currentWork = field.value as Work | null | undefined;
          const selectValue = currentWork?.id ?? "";

          return (
            <FormItem className="w-full max-w-md">
              <FormLabel>작품 선택</FormLabel>
              <Select
                value={selectValue}
                onValueChange={(value) => {
                  if (value === "__reset__" || !value) {
                    field.onChange(null);

                    return;
                  }

                  const selected = workLookup.get(value) ?? null;
                  field.onChange(selected ? mapWorkToWorkItem(selected) : null);
                }}
                disabled={!hasWorks}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        hasWorks
                          ? "작품을 선택하세요."
                          : "등록된 작품이 없습니다."
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="__reset__">선택 해제</SelectItem>
                  {works?.map((work) => (
                    <SelectItem key={work.id} value={work.id}>
                      {work.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {!hasWorks && (
        <p className="text-xs text-muted-foreground">
          작품을 먼저 등록하면 목록에서 선택할 수 있습니다.
        </p>
      )}
    </div>
  );
}

function mapWorkToWorkItem(work: Work) {
  return {
    id: work.id,
  };
}
