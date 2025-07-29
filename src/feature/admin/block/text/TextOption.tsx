import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { clsx } from "clsx";

export default function TextOption({ index }: { index: number }) {
  const namePrefix = `blocks.${index}.data`;

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* 정렬 선택 (아이콘 기반) */}
        <FormField
          name={`${namePrefix}.align`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>정렬</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  <FormItem className="w-fit">
                    <FormControl>
                      <RadioGroupItem value="left" className="hidden" />
                    </FormControl>
                    <label
                      htmlFor={`${namePrefix}.align.left`}
                      onClick={() => field.onChange("left")}
                      className={clsx(
                        "cursor-pointer border rounded-md p-2",
                        field.value === "left"
                          ? "bg-muted border-ring"
                          : "bg-background border-muted"
                      )}
                    >
                      <AlignLeft className="w-5 h-5" />
                    </label>
                  </FormItem>

                  <FormItem className="w-fit">
                    <FormControl>
                      <RadioGroupItem value="center" className="hidden" />
                    </FormControl>
                    <label
                      htmlFor={`${namePrefix}.align.center`}
                      onClick={() => field.onChange("center")}
                      className={clsx(
                        "cursor-pointer border rounded-md p-2",
                        field.value === "center"
                          ? "bg-muted border-ring"
                          : "bg-background border-muted"
                      )}
                    >
                      <AlignCenter className="w-5 h-5" />
                    </label>
                  </FormItem>
                  <FormItem className="w-fit">
                    <FormControl>
                      <RadioGroupItem value="right" className="hidden" />
                    </FormControl>
                    <label
                      htmlFor={`${namePrefix}.align.right`}
                      onClick={() => field.onChange("right")}
                      className={clsx(
                        "cursor-pointer border rounded-md p-2",
                        field.value === "right"
                          ? "bg-muted border-ring"
                          : "bg-background border-muted"
                      )}
                    >
                      <AlignRight className="w-5 h-5" />
                    </label>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 색상 선택 */}
        <FormField
          name={`${namePrefix}.bgColor`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>색상</FormLabel>
              <FormControl>
                <Input
                  type="color"
                  className="w-10 h-10 p-0 border-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        name={`${namePrefix}.fontSize`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>글자 크기</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                {[
                  { value: "sm", label: "가", size: "text-sm" },
                  { value: "base", label: "가", size: "text-base" },
                  { value: "lg", label: "가", size: "text-lg" },
                  { value: "xl", label: "가", size: "text-xl" },
                ].map((option) => {
                  const isSelected = field.value === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => field.onChange(option.value)}
                      className={clsx(
                        "rounded-md border w-9 h-9 transition",
                        option.size,
                        isSelected
                          ? "bg-muted border-ring"
                          : "bg-background border-muted hover:border-ring"
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
