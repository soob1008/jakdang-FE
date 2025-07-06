"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";

const linkSchema = z.object({
  label: z.string().min(1, { message: "링크 제목을 입력해주세요." }),
  url: z.string().url({ message: "올바른 링크 주소를 입력해주세요." }),
});

export type LinkValues = z.infer<typeof linkSchema>;

interface LinkDialogProps {
  mode: "create" | "edit";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValues?: Partial<LinkValues>;
  onSubmitSuccess?: (data: LinkValues) => void;
}

export function LinkDialog({
  mode,
  open,
  onOpenChange,
  defaultValues,
  onSubmitSuccess,
}: LinkDialogProps) {
  const isEdit = mode === "edit";

  const form = useForm<LinkValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      label: defaultValues?.label ?? "",
      url: defaultValues?.url ?? "",
    },
  });

  const onSubmit = (data: LinkValues) => {
    onSubmitSuccess?.(data);
  };

  return (
    <ResponsiveDialog
      trigger={undefined}
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "링크 수정" : "외부 링크 등록"}
      description={
        isEdit
          ? "등록된 링크 정보를 수정할 수 있어요."
          : "블로그나 포트폴리오 등 연결할 링크를 등록해주세요."
      }
      onSubmit={form.handleSubmit(onSubmit)}
      submitText={isEdit ? "수정하기" : "등록하기"}
    >
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>링크 제목</FormLabel>
                <FormControl>
                  <Input
                    placeholder="예: 내 블로그, 브런치, 출판사 페이지"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>링크 주소</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </ResponsiveDialog>
  );
}
