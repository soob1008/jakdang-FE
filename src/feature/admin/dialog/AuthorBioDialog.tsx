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
  bio: z.string().min(1, "작가 소개를 입력해주세요."),
});

type ProfileFormValues = z.infer<typeof schema>;

interface AuthorBioDialogProps {
  userId: string;
  bio?: string;
}

export function AuthorBioDialog({ userId, bio }: AuthorBioDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: bio || "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const onSubmit = async (data: ProfileFormValues) => {
    const { error } = await updateUser(userId, {
      bio: data.bio,
    });

    if (error) {
      console.error("사용자 업데이트 실패:", error);
      return;
    }

    toast.success("소개글이 성공적으로 업데이트되었습니다.");
    setIsOpen(false);
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);

        if (!open) {
          form.reset({ bio: bio || "" });
        }
      }}
      trigger={
        <Button variant="muted" size="sm">
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>
      }
      title="작가 소개"
      description="작가의 소개글을 작성해주세요."
      onSubmit={handleSubmit(onSubmit)}
      disabled={!isValid}
    >
      <Form {...form}>
        <div className="space-y-6">
          {/* 소개글 */}
          <FormField
            control={control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>소개글</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ex) 사라지는 것들에 대해 쓰고, 남겨지는 마음을 기록합니다. 단어 하나로 누군가의 하루가 바뀌길 바라며 오늘도 씁니다."
                    className="resize-none h-72"
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
