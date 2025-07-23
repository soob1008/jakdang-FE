import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Rows2, Columns2, Columns3 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function ImageOption({ index }: { index: number }) {
  const namePrefix = `blocks.${index}.data`;
  const imagesPrefix = `${namePrefix}.images`;
  const { control, watch, setValue } = useFormContext();
  const { fields } = useFieldArray({ control, name: imagesPrefix });

  const layoutType = watch(`${namePrefix}.layoutType`) || "horizontal";

  return (
    <div className="space-y-6">
      {/* 스타일 유형 선택 */}
      <FormField
        name={`${namePrefix}.layoutType`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>이미지 정렬 방향</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  setValue(`${namePrefix}.layoutColumn`, "1"); // reset column on change
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
                    <Columns3 className="w-5 h-5" />
                    <span className="text-xs">가로형</span>
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
                    <Rows2 className="w-5 h-5" />
                    <span className="text-xs">세로형</span>
                  </button>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 세로형일 때 열 수 선택 */}
      {layoutType === "vertical" && (
        <FormField
          name={`${namePrefix}.layoutColumn`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>세로형 열 수</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  <FormItem className="flex flex-col items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="1" className="sr-only" />
                    </FormControl>
                    <button
                      type="button"
                      className={`p-2 border rounded-md flex flex-col items-center gap-1 ${
                        field.value === "1"
                          ? "border-ring bg-muted"
                          : "border-border"
                      }`}
                      onClick={() => field.onChange("1")}
                    >
                      <Columns2 className="w-6 h-6 rotate-90" />
                      <span className="text-xs">1열</span>
                    </button>
                  </FormItem>

                  <FormItem className="flex flex-col items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="2" className="sr-only" />
                    </FormControl>
                    <button
                      type="button"
                      className={`p-2 border rounded-md flex flex-col items-center gap-1 ${
                        field.value === "2"
                          ? "border-ring bg-muted"
                          : "border-border"
                      }`}
                      onClick={() => field.onChange("2")}
                    >
                      <Columns2 className="w-6 h-6" />
                      <span className="text-xs">2열</span>
                    </button>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* 각 이미지 링크 입력 */}
      {fields.map((field, i) => (
        <FormField
          key={field.id}
          name={`${imagesPrefix}.${i}.link`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이미지 {i + 1} 링크 (선택)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
