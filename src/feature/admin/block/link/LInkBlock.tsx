import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { GripVertical, Plus, Trash2 } from "lucide-react";

export default function LinkBlock({ index }: { index: number }) {
  const namePrefix = `blocks.${index}.data.links`;
  const { control, register } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: namePrefix,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">링크 설정</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ title: "", url: "" })}
        >
          <Plus className="w-4 h-4 mr-1" /> 링크 추가하기
        </Button>
      </div>

      {fields.map((field, i) => (
        <div key={field.id} className="flex items-start gap-2">
          <GripVertical className="w-4 h-4 mt-3 text-muted-foreground cursor-move" />

          <div className="w-full space-y-2">
            <FormField
              name={`${namePrefix}.${i}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="링크 제목" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name={`${namePrefix}.${i}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(i)}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ))}
    </div>
  );
}
