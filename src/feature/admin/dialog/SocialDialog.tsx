"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  SOCIAL_PLATFORMS_OPTIONS,
  SOCIAL_PLATFORM_KEYS,
} from "@/shared/lib/const";
import { ResponsiveDialog } from "@/shared/ui/ResponsiveDialog";
import { toast } from "sonner";
import { updateUserSNS } from "@/entities/author/lib/repository";

const schema = z.object({
  platform: z.enum(SOCIAL_PLATFORM_KEYS as [string, ...string[]]),
  url: z.string(),
});

export type SocialFormValues = z.infer<typeof schema> & { id?: string };

interface SocialDialogProps {
  userId: string;
  mode?: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: Partial<SocialFormValues>;
  onSubmitSuccess?: (data: SocialFormValues) => void;
}

export default function SocialDialog({
  userId,
  mode = "create",
  open = false,
  onOpenChange,
  defaultValues,
}: SocialDialogProps) {
  const form = useForm<SocialFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      platform: defaultValues?.platform ?? undefined,
      url: defaultValues?.url ?? "",
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = form;

  const isEdit = mode === "edit";

  useEffect(() => {
    if (open) {
      form.reset({
        platform: defaultValues?.platform ?? undefined,
        url: defaultValues?.url ?? "",
      });
    }
  }, [open, defaultValues, form]);

  const onSubmit = async (data: SocialFormValues) => {
    const { error } = await updateUserSNS(userId, data, defaultValues?.id);

    if (error) {
      toast.error("SNS 저장 중 문제가 발생했어요.");
      return;
    }

    toast.success(isEdit ? "SNS를 수정했어요." : "SNS를 추가했어요.");
    onOpenChange(false);
  };

  return (
    <Form {...form}>
      <ResponsiveDialog
        trigger={undefined}
        open={open}
        onOpenChange={onOpenChange}
        title={isEdit ? "SNS 링크 수정" : "SNS 링크 추가"}
        description="SNS 종류와 링크를 입력하세요."
        submitText={isEdit ? "수정" : "추가"}
        onSubmit={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <div className="space-y-6">
          {/* SNS 종류 선택 */}
          <FormItem>
            <FormLabel>플랫폼</FormLabel>
            <FormControl>
              <Select
                onValueChange={(val) =>
                  setValue("platform", val as SocialFormValues["platform"])
                }
                value={watch("platform")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="SNS 선택" />
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_PLATFORMS_OPTIONS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* 링크 입력 */}
          <FormItem>
            <FormLabel>링크</FormLabel>
            <FormControl>
              <Input
                placeholder="https://example.com/your-profile"
                {...form.register("url")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      </ResponsiveDialog>
    </Form>
  );
}
