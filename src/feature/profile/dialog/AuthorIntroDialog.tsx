"use client";

import { useState } from "react";
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
import { updateUser } from "@/feature/user/api.server";
import { toast } from "sonner";

const schema = z.object({
  intro: z.string().min(1, "한 줄 문장을 입력해주세요."),
});

type ProfileFormValues = z.infer<typeof schema>;

interface AuthorIntroDialogProps {
  id: string;
  intro?: string;
}

export function AuthorIntroDialog({ id, intro }: AuthorIntroDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      intro: intro || "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const onSubmit = async (data: ProfileFormValues) => {
    const { error } = await updateUser(id, {
      intro_text: data.intro,
    });

    if (error) {
      console.error("사용자 업데이트 실패:", error);
      return;
    }

    toast.success("한줄 문장이 성공적으로 업데이트되었습니다.");
    setIsOpen(false);
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);

        if (!open) {
          form.reset({ intro: intro || "" });
        }
      }}
      trigger={
        <Button variant="muted" size="sm">
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>
      }
      title="한 줄 문장"
      description="당신의 색깔을 담은 한 문장을 써보세요."
      onSubmit={handleSubmit(onSubmit)}
      disabled={!isValid}
    >
      <Form {...form}>
        <div className="space-y-6">
          {/* 소개글 */}
          <FormField
            control={control}
            name="intro"
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
