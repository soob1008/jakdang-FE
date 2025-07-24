import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LayoutList, Grid2X2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function WorkOption({ index }: { index: number }) {
  const namePrefix = `blocks.${index}.data`;
  const { setValue } = useFormContext();
  // const { fields, move } = useFieldArray({ control, name: imagesPrefix });

  return (
    <div className="space-y-6">
      {/* 정렬 방식 선택 */}
      <FormField
        name={`${namePrefix}.layoutType`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>작품 정렬 방식</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  setValue(`${namePrefix}.layoutColumn`, "1");
                }}
                className="flex gap-4"
              >
                <FormItem className="flex flex-col items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value="horizontal" className="sr-only" />
                  </FormControl>
                  <button
                    type="button"
                    className={`w-16 h-16 border rounded-md flex flex-col items-center justify-center gap-1 ${
                      field.value === "horizontal"
                        ? "border-ring bg-muted"
                        : "border-border"
                    }`}
                    onClick={() => field.onChange("horizontal")}
                  >
                    <Grid2X2 className="w-5 h-5" />
                    <span className="text-xs">카드형</span>
                  </button>
                </FormItem>

                <FormItem className="flex flex-col items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value="vertical" className="sr-only" />
                  </FormControl>
                  <button
                    type="button"
                    className={`w-16 h-16 border rounded-md flex flex-col items-center justify-center gap-1 ${
                      field.value === "vertical"
                        ? "border-ring bg-muted"
                        : "border-border"
                    }`}
                    onClick={() => field.onChange("vertical")}
                  >
                    <LayoutList className="w-5 h-5" />
                    <span className="text-xs">리스트형</span>
                  </button>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
