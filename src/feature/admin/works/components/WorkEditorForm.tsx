"use client";

import { use, useEffect } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import LexicalEditor from "@/shared/components/editor/LexicalEditor";
import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// import { Input } from "@/shared/ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
// import { Calendar } from "@/shared/ui/calendar";
// import { cn } from "@/shared/lib/utils";
// import {
//   addMinutes,
//   format,
//   isBefore,
//   setHours,
//   setMinutes,
//   startOfDay,
// } from "date-fns";
// import { CalendarDays } from "lucide-react";

export type WorkFormValues = {
  title: string;
  subtitle?: string;
  content: string;
  is_public: boolean;
  // isScheduled: boolean;
  // scheduledAt: Date | null;
};

const DEFAULT_VALUES: WorkFormValues = {
  title: "",
  subtitle: "",
  content: "",
  is_public: true,
  // isScheduled: false,
  // scheduledAt: null,
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
  // isScheduled: z.boolean(),
  // scheduledAt: z.date().nullable(),
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

  const isPublic = watch("is_public");

  useEffect(() => {
    form.reset({
      ...DEFAULT_VALUES,
      ...defaultValues,
    });
  }, [defaultValues, form]);

  // const isScheduled = watch("isScheduled");
  // const scheduledAt = watch("scheduledAt");
  // const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // const scheduleLabel = useMemo(() => {
  //   if (isScheduled && scheduledAt) {
  //     return format(scheduledAt, "M월 d일 HH:mm 예약");
  //   }
  //   return "예약 발행";
  // }, [isScheduled, scheduledAt]);

  // const ensureScheduleDate = () => {
  //   const base = scheduledAt ?? addMinutes(new Date(), 30);
  //   setValue("scheduledAt", base, { shouldDirty: true, shouldTouch: true });
  //   return base;
  // };

  // const handleScheduleToggle = (checked: boolean) => {
  //   if (checked) {
  //     ensureScheduleDate();
  //   } else {
  //     setValue("scheduledAt", null, { shouldDirty: true, shouldTouch: true });
  //   }
  //   setValue("isScheduled", checked, { shouldDirty: true, shouldTouch: true });
  // };

  // const handleDateSelect = (date?: Date) => {
  //   if (!date) return;
  //   const base = ensureScheduleDate();
  //   const updated = setMinutes(
  //     setHours(date, base.getHours()),
  //     base.getMinutes()
  //   );
  //   setValue("scheduledAt", updated, { shouldDirty: true, shouldTouch: true });
  //   setValue("isScheduled", true, { shouldDirty: true, shouldTouch: true });
  // };

  // const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   if (!value) return;

  //   const [hour, minute] = value.split(":").map(Number);
  //   const base = ensureScheduleDate();
  //   const updated = setMinutes(setHours(base, hour), minute);
  //   setValue("scheduledAt", updated, { shouldDirty: true, shouldTouch: true });
  //   setValue("isScheduled", true, { shouldDirty: true, shouldTouch: true });
  // };

  // const disabledDate = (date: Date) => isBefore(date, startOfDay(new Date()));

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

          {/* TODO: 예약 발행 */}
          {/* <Popover open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
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
                  "rounded-md border p-3 space-y-3",
                  !isScheduled && "pointer-events-none opacity-50"
                )}
              >
                <Calendar
                  mode="single"
                  selected={scheduledAt ?? undefined}
                  onSelect={handleDateSelect}
                  disabled={disabledDate}
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
          </Popover> */}

          <Button type="submit" size="xl" disabled={!isValid}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
