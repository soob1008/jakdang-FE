import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/ui/form";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { CalendarDays, ListOrdered } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function CalendarOption({ index }: { index: number }) {
  const name = `blocks_draft.${index}.data.layout`;
  const { setValue, watch } = useFormContext();
  const value = watch(name);

  return (
    <div className="space-y-4">
      <FormField
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>레이아웃</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
                className="flex gap-4"
              >
                <FormItem className="flex flex-col items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value="calendar" className="sr-only" />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setValue(name, "calendar")}
                    className={`w-16 h-16 border rounded-md flex flex-col items-center justify-center gap-1 ${
                      value === "calendar"
                        ? "border-ring bg-muted"
                        : "border-border"
                    }`}
                  >
                    <CalendarDays className="w-5 h-5" />
                    <span className="text-xs">캘린더형</span>
                  </button>
                </FormItem>

                <FormItem className="flex flex-col items-center gap-2">
                  <FormControl>
                    <RadioGroupItem value="list" className="sr-only" />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setValue(name, "list")}
                    className={`w-16 h-16 border rounded-md flex flex-col items-center justify-center gap-1 ${
                      value === "list"
                        ? "border-ring bg-muted"
                        : "border-border"
                    }`}
                  >
                    <ListOrdered className="w-5 h-5" />
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
