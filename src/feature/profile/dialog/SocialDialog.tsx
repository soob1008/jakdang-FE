"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";

const schema = z.object({
  platform: z.enum(["twitter", "instagram", "brunch", "x", "medium"]),
  url: z.string().url("올바른 링크를 입력해주세요"),
});

export type SocialFormValues = z.infer<typeof schema>;

interface SocialDialogProps {
  mode?: "create" | "edit";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValues?: Partial<SocialFormValues>;
  onSubmitSuccess?: (data: SocialFormValues) => void;
}

export default function SocialDialog({
  mode = "create",
  open = false,
  onOpenChange,
  defaultValues,
  onSubmitSuccess,
}: SocialDialogProps) {
  const form = useForm<SocialFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      platform: defaultValues?.platform ?? "twitter",
      url: defaultValues?.url ?? "",
    },
  });

  const isEdit = mode === "edit";

  const onSubmit = (data: SocialFormValues) => {
    console.log("SNS 등록 정보:", data);
    onSubmitSuccess?.(data);
  };

  const platformLabelMap: Record<SocialFormValues["platform"], string> = {
    twitter: "Twitter",
    instagram: "Instagram",
    brunch: "Brunch",
    x: "X (구 Twitter)",
    medium: "Medium",
  };

  return (
    <ResponsiveDialog
      trigger={undefined}
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "SNS 링크 수정" : "SNS 링크 추가"}
      description="등록할 SNS 종류를 선택하고, 연결할 링크를 입력해주세요."
      submitText={isEdit ? "수정하기" : "추가하기"}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <div className="space-y-6">
          {/* SNS 종류 선택 */}
          <FormItem>
            <FormLabel>플랫폼</FormLabel>
            <FormControl>
              <Select
                onValueChange={(val) =>
                  form.setValue("platform", val as SocialFormValues["platform"])
                }
                defaultValue={form.getValues("platform")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="SNS 선택" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(platformLabelMap).map(([value, label]) => (
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
      </Form>
    </ResponsiveDialog>
  );
}
