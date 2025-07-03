"use client";

import { z } from "zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";

const schema = z.object({
  introBio: z.string().min(1, "한 줄 문장을 입력해주세요."),
});

type ProfileFormValues = z.infer<typeof schema>;

export function AuthorIntroDialog() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      introBio: "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("한줄문장:", data.introBio);

    // 저장 로직 실행
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button variant="muted" size="sm">
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>
      }
      title="한 줄 문장"
      description="당신의 색깔을 담은 한 문장을 써보세요."
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <div className="space-y-6">
          {/* 소개글 */}
          <FormField
            control={form.control}
            name="introBio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>한 줄 문장</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ex) 우연히 마주친 문장이 당신을 닮았으면 좋겠어요."
                    maxLength={40}
                    className="resize-none h-20"
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
