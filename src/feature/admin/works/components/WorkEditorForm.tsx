"use client";

import { useEffect, useState, useMemo, ChangeEvent } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import LexicalEditor from "@/shared/components/editor/LexicalEditor";
import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Calendar } from "@/shared/ui/calendar";
import { cn } from "@/shared/lib/utils";
import {
  addMinutes,
  format,
  isBefore,
  setHours,
  setMinutes,
  startOfDay,
} from "date-fns";
import { CalendarDays } from "lucide-react";
import { Input } from "@/shared/ui/input";

export interface WorkFormValues {
  title: string;
  subtitle?: string;
  content: string;
  is_public: boolean;
  is_scheduled: boolean;
  scheduled_at?: Date;
}

const DEFAULT_VALUES: WorkFormValues = {
  title: "",
  subtitle: "",
  content: "",
  is_public: true,
  is_scheduled: false,
};

type WorkEditorFormProps = {
  heading: string;
  submitLabel: string;
  defaultValues?: Partial<WorkFormValues>;
  onSubmit?: (values: WorkFormValues) => Promise<void> | void;
};

const WorkFormSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  subtitle: z.string().optional(),
  content: z.string().min(1, "내용을 입력해주세요."),
  is_public: z.boolean(),
  is_scheduled: z.boolean(),
});

export default function WorkEditorForm({
  heading,
  submitLabel,
  defaultValues,
  onSubmit,
}: WorkEditorFormProps) {
  const form = useForm<WorkFormValues>({
    defaultValues: {
      ...DEFAULT_VALUES,
      ...defaultValues,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(WorkFormSchema),
  });

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
  } = form;

  console.log(watch());

  const isPublic = watch("is_public");
  const canSchedule = !isPublic;

  useEffect(() => {
    form.reset({
      ...DEFAULT_VALUES,
      ...defaultValues,
    });
  }, [defaultValues, form]);

  const isScheduled = watch("is_scheduled");
  const scheduledAt = watch("scheduled_at");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const selectedTime = useMemo(
    () => (scheduledAt ? format(scheduledAt, "HH:mm") : ""),
    [scheduledAt]
  );

  const scheduleLabel = useMemo(() => {
    if (!canSchedule) return "비공개 설정 시 예약 발행 가능";
    if (!isScheduled || !scheduledAt) return "예약 발행 없음";
    return format(scheduledAt, "yyyy.MM.dd HH:mm 예약");
  }, [canSchedule, isScheduled, scheduledAt]);

  useEffect(() => {
    if (!canSchedule) {
      setValue("is_scheduled", false, { shouldDirty: true, shouldTouch: true });
      setValue("scheduled_at", undefined, {
        shouldDirty: true,
        shouldTouch: true,
      });
      setIsScheduleOpen(false);
    }
  }, [canSchedule, setValue]);

  const ensureScheduleDate = () => {
    const base = scheduledAt ?? addMinutes(new Date(), 30);
    setValue("scheduled_at", base, { shouldDirty: true, shouldTouch: true });
    return base;
  };

  const handleScheduleToggle = (checked: boolean) => {
    if (checked) {
      if (!canSchedule) return;
      ensureScheduleDate();
    } else {
      setValue("scheduled_at", undefined, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
    setValue("is_scheduled", checked && canSchedule, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleDateSelect = (date?: Date) => {
    if (!canSchedule) return;
    if (!date) return;
    const base = ensureScheduleDate();
    const updated = setMinutes(
      setHours(date, base.getHours()),
      base.getMinutes()
    );
    setValue("scheduled_at", updated, { shouldDirty: true, shouldTouch: true });
    setValue("is_scheduled", true, { shouldDirty: true, shouldTouch: true });
  };

  const updateScheduleTime = (hour: number, minute: number) => {
    if (!canSchedule) return;
    const base = ensureScheduleDate();
    const updated = setMinutes(setHours(base, hour), minute);
    setValue("scheduled_at", updated, { shouldDirty: true, shouldTouch: true });
    setValue("is_scheduled", true, { shouldDirty: true, shouldTouch: true });
  };

  const handleTimeInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!canSchedule) return;
    const value = event.target.value;
    if (!value) return;
    const [hour, minute] = value.split(":").map(Number);
    if (!Number.isNaN(hour) && !Number.isNaN(minute)) {
      updateScheduleTime(hour, minute);
    }
  };

  const disabledDate = (date: Date) => isBefore(date, startOfDay(new Date()));

  return (
    <FormProvider {...form}>
      <form
        className="relative min-h-screen flex justify-center bg-white"
        onSubmit={handleSubmit(async (values) => {
          await onSubmit?.(values);
        })}
      >
        <div className="w-full max-w-5xl px-6 py-12">
          <div className="mb-8 text-sm text-gray-400">{heading}</div>
          <div className="mb-8">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              {...register("title", { required: true })}
              className="w-full text-2xl font-semibold outline-none border-none focus:ring-0 placeholder-gray-300"
            />
            <input
              type="text"
              placeholder="소제목을 입력하세요"
              {...register("subtitle", { required: true })}
              className="w-full mt-4 text-sm font-semibold outline-none border-none focus:ring-0 placeholder-gray-300"
            />
          </div>

          <div className="min-h-[60vh]">
            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <LexicalEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="내용을 입력하세요."
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-3 py-4 px-10 fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="flex items-center gap-2 mr-2">
            <span className="text-sm text-gray-500">공개</span>
            <Switch
              checked={isPublic}
              onCheckedChange={(checked) =>
                setValue("is_public", checked, {
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
            />
          </div>

          {/* 예약 발행 설정 */}
          <Popover
            open={isScheduleOpen && canSchedule}
            onOpenChange={(open) => canSchedule && setIsScheduleOpen(open)}
          >
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant={isScheduled ? "secondary" : "outline"}
                size="sm"
                className={cn(
                  "flex items-center gap-2 text-sm",
                  (!canSchedule || !isScheduled) && "text-gray-600"
                )}
                disabled={!canSchedule}
              >
                <CalendarDays className="h-4 w-4" />
                <span>{scheduleLabel}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-4 p-5" align="end">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900">
                    예약 발행
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {canSchedule
                      ? "지정한 시간에 자동으로 공개돼요."
                      : "비공개 상태에서만 예약 발행을 사용할 수 있어요."}
                  </p>
                </div>
                <Switch
                  checked={isScheduled}
                  onCheckedChange={handleScheduleToggle}
                  disabled={!canSchedule}
                />
              </div>

              <div
                className={cn(
                  "rounded-md border p-3 space-y-4 bg-gray-50/60",
                  (!isScheduled || !canSchedule) &&
                    "pointer-events-none opacity-50"
                )}
              >
                <Calendar
                  mode="single"
                  selected={(scheduledAt as Date) ?? undefined}
                  onSelect={handleDateSelect}
                  disabled={[disabledDate]}
                  initialFocus
                />
                <div className="space-y-3">
                  <label
                    htmlFor="schedule-time"
                    className="text-xs font-medium text-gray-600"
                  >
                    발행 시각 (KST)
                  </label>
                  <Input
                    id="schedule-time"
                    type="time"
                    value={selectedTime}
                    onChange={handleTimeInputChange}
                    className="w-32 text-sm"
                    step={60}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    예약 시간은 설정된 시각에 자동으로 공개됩니다. 최소 30분
                    이후부터 설정할 수 있어요.
                  </span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            type="button"
            size="xl"
            variant="outline-primary"
            onClick={() => history.back()}
          >
            취소
          </Button>
          <Button type="submit" size="xl" disabled={!isValid}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
