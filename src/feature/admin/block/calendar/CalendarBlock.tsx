import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon, Plus, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function CalendarBlock({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data.dates`;
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: namePrefix,
    keyName: "block_id",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              title: "",
              memo: "",
              start_date: null,
              end_date: null,
            })
          }
        >
          <Plus className="w-4 h-4 mr-1" /> 일정 추가
        </Button>
      </div>

      {fields.map((field, i) => {
        const start = watch(`${namePrefix}.${i}.start_date`);
        const end = watch(`${namePrefix}.${i}.end_date`);

        return (
          <div
            key={field.block_id}
            className="
              grid gap-3 md:gap-4 items-start
              grid-cols-1 md:grid-cols-[auto_1fr_auto]
            "
          >
            {/* 시작/종료일 선택 */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-3">
              {/* 시작일 */}
              <FormField
                name={`${namePrefix}.${i}.start_date`}
                render={() => (
                  <FormItem className="w-full sm:w-[180px] md:w-[160px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {start ? (
                            format(new Date(start), "PPP", { locale: ko })
                          ) : (
                            <span>시작일 선택</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={start ? new Date(start) : undefined}
                          onSelect={(date) =>
                            setValue(`${namePrefix}.${i}.start_date`, date)
                          }
                          initialFocus
                          locale={ko}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              {/* 종료일 */}
              <FormField
                name={`${namePrefix}.${i}.end_date`}
                render={() => (
                  <FormItem className="w-full sm:w-[180px] md:w-[160px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {end ? (
                            format(new Date(end), "PPP", { locale: ko })
                          ) : (
                            <span>종료일 선택</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={end ? new Date(end) : undefined}
                          onSelect={(date) =>
                            setValue(`${namePrefix}.${i}.end_date`, date)
                          }
                          initialFocus
                          locale={ko}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            {/* 제목 & 메모 */}
            <div className="space-y-2 md:space-y-3">
              <FormField
                name={`${namePrefix}.${i}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="일정 제목" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`${namePrefix}.${i}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="간단 메모"
                        rows={2}
                        className="resize-none md:h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 삭제 버튼 */}
            <div className="flex md:block justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(i)}
                className="self-start"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
