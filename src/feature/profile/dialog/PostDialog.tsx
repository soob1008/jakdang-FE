"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const postSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  content: z.string().min(1, { message: "내용을 입력해주세요." }),
});

type PostValues = z.infer<typeof postSchema>;

export function PostDialog() {
  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: PostValues) => {
    console.log("제목:", data.title);
    console.log("글:", data.content);
    // 저장 로직
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button variant="muted" size="sm">
          <Plus className="w-4 h-4 mr-1" /> Create
        </Button>
      }
      title="글 등록"
      description="자유롭게 쓰고 싶은 글을 작성하세요."
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input placeholder="글 제목" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="글 작성"
                    className="resize-none h-40"
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
