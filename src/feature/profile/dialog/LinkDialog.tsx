"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
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

type LinkValues = z.infer<typeof linkSchema>;

export function LinkDialog() {
  const form = useForm<LinkValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      label: "",
      url: "",
    },
  });

  const onSubmit = (data: LinkValues) => {
    console.log("링크 제목:", data.label);
    console.log("링크 주소:", data.url);
    // TODO: 저장 로직
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button variant="muted" size="sm">
          <Plus className="w-4 h-4 mr-1" /> Create
        </Button>
      }
      title="외부 링크 등록"
      description="블로그나 포트폴리오 등 연결할 링크를 등록해주세요."
      onSubmit={form.handleSubmit(onSubmit)}
      submitText="등록하기"
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
