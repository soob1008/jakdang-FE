"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  addMinutes,
  format,
  isBefore,
  setHours,
  setMinutes,
  startOfDay,
} from "date-fns";
import { CalendarDays } from "lucide-react";

import LexicalEditor from "@/shared/components/editor/LexicalEditor";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Calendar } from "@/shared/ui/calendar";
import { cn } from "@/shared/lib/utils";

type WorkFormValues = {
  title: string;
  isPublic: boolean;
  isScheduled: boolean;
  scheduledAt: Date | null;
};

export default function WorkNewContainer() {
  const form = useForm<WorkFormValues>({
    defaultValues: {
      title: "",
      isPublic: true,
      isScheduled: false,
      scheduledAt: null,
    },
  });

  const { register, watch, setValue } = form;
  const isPublic = watch("isPublic");
  const isScheduled = watch("isScheduled");
  const scheduledAt = watch("scheduledAt");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const scheduleLabel = useMemo(() => {
    if (isScheduled && scheduledAt) {
      return format(scheduledAt, "M월 d일 HH:mm 예약");
    }
    return "예약 발행";
  }, [isScheduled, scheduledAt]);

  const ensureScheduleDate = () => {
    const base = scheduledAt ?? addMinutes(new Date(), 30);
    setValue("scheduledAt", base, { shouldDirty: true });
    return base;
  };

  const handleScheduleToggle = (checked: boolean) => {
    if (checked) {
      ensureScheduleDate();
    } else {
      setValue("scheduledAt", null, { shouldDirty: true });
    }
    setValue("isScheduled", checked, { shouldDirty: true });
  };

  const handleDateSelect = (date?: Date) => {
    if (!date) return;
    const base = ensureScheduleDate();
    const updated = setMinutes(
      setHours(date, base.getHours()),
      base.getMinutes()
    );
    setValue("scheduledAt", updated, { shouldDirty: true });
    setValue("isScheduled", true, { shouldDirty: true });
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) return;
    const [hour, minute] = value.split(":").map(Number);
    const base = ensureScheduleDate();
    const updated = setMinutes(setHours(base, hour), minute);
    setValue("scheduledAt", updated, { shouldDirty: true });
    setValue("isScheduled", true, { shouldDirty: true });
  };

  return (
    <FormProvider {...form}>
      <div className="relative min-h-screen flex justify-center bg-white">
        <div className="w-full max-w-5xl px-6 py-12">
          <div className="mb-8 text-sm text-gray-400">글 작성</div>
          <div className="mb-8">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              {...register("title", { required: true })}
              className="w-full text-2xl font-semibold outline-none border-none focus:ring-0 placeholder-gray-300"
            />
          </div>

          <div className="min-h-[60vh]">
            <LexicalEditor height="60vh" placeholder="내용을 입력하세요" />
          </div>
        </div>
        <div className="flex justify-end items-center gap-3 py-4 px-10 fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="flex items-center gap-2 mr-2">
            <span className="text-sm text-gray-500">공개</span>
            <Switch
              checked={isPublic}
              onCheckedChange={(checked) =>
                setValue("isPublic", checked, { shouldDirty: true })
              }
            />
          </div>

          <Popover open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant={isScheduled ? "secondary" : "outline"}
                size="sm"
                className={cn(
                  "flex items-center gap-2",
                  !isScheduled && "text-gray-600"
                )}
              >
                <CalendarDays className="h-4 w-4" />
                <span className="text-sm">{scheduleLabel}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 space-y-4" align="end">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">예약 발행</p>
                  <p className="text-xs text-muted-foreground">
                    지정한 시간에 자동으로 공개돼요.
                  </p>
                </div>
                <Switch
                  checked={isScheduled}
                  onCheckedChange={handleScheduleToggle}
                />
              </div>

              <div
                className={cn(
                  "",
                  !isScheduled && "pointer-events-none opacity-50"
                )}
              >
                <Calendar
                  mode="single"
                  selected={scheduledAt ?? undefined}
                  onSelect={handleDateSelect}
                  disabled={(date) => isBefore(date, startOfDay(new Date()))}
                  initialFocus
                />
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={scheduledAt ? format(scheduledAt, "HH:mm") : ""}
                    onChange={handleTimeChange}
                  />
                  <span className="text-xs text-muted-foreground">KST</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button type="submit" size="xl">
            작성하기
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
