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
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function CalendarBlock({ index }: { index: number }) {
  const namePrefix = `blocks.${index}.data.items`;
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: namePrefix,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-base">일정 설정</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ title: "", memo: "", date: new Date() })}
        >
          <Plus className="w-4 h-4 mr-1" /> 일정 추가하기
        </Button>
      </div>

      {fields.map((field, i) => {
        const dateValue = watch(`${namePrefix}.${i}.date`);
        return (
          <div key={field.id} className="grid grid-cols-[auto_1fr_auto]  gap-2">
            {/* 날짜 선택 */}
            <FormField
              name={`${namePrefix}.${i}.date`}
              render={() => (
                <FormItem className="w-fit">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal min-w-[120px]"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateValue ? (
                          format(new Date(dateValue), "PPP", { locale: ko })
                        ) : (
                          <span>날짜 선택</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(dateValue)}
                        onSelect={(date) => {
                          setValue(`${namePrefix}.${i}.date`, date);
                          setTimeout(() => {
                            document
                              .querySelector(
                                `input[name='${namePrefix}.${i}.title']`
                              )
                              ?.focus();
                          }, 50);
                        }}
                        initialFocus
                        locale={ko}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            {/* 제목 & 메모 */}
            <div className="space-y-1">
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
                name={`${namePrefix}.${i}.memo`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="간단 메모"
                        rows={1}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 삭제 버튼 */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(i)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
