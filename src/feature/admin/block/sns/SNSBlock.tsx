import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2, MoveUp, MoveDown } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

const snsTypes = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "twitter", label: "Twitter" },
  { id: "youtube", label: "YouTube" },
  { id: "tiktok", label: "TikTok" },
  { id: "blog", label: "Blog" },
  { id: "etc", label: "기타" },
];

export default function SNSBlock({ index }: { index: number }) {
  const namePrefix = `blocks.${index}.data.items`;
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: namePrefix,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-semibold">SNS 링크</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ type: "instagram", url: "" })}
        >
          + SNS 추가
        </Button>
      </div>

      {fields.map((field, i) => (
        <div key={field.id} className="flex items-center gap-4">
          <GripVertical className="w-4 h-4 text-muted-foreground" />

          <FormField
            name={`${namePrefix}.${i}.type`}
            render={({ field }) => (
              <FormItem className="w-1/5">
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {snsTypes.map((sns) => (
                      <SelectItem key={sns.id} value={sns.id}>
                        {sns.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name={`${namePrefix}.${i}.url`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => remove(i)}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ))}
    </div>
  );
}
