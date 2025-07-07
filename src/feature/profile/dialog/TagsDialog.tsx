"use client";

import { useState } from "react";
import { z } from "zod";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";
import { Badge } from "@/components/ui/badge";
import { AuthorTag } from "@/feature/user/type";
import { updateUserTags } from "@/feature/user/api.server";
import { toast } from "sonner";

const schema = z.object({
  tags: z.array(z.object({ id: z.string(), tag: z.string() })),
});

type FormValues = z.infer<typeof schema>;

interface TagsDialogProps {
  id: string;
  tags: AuthorTag[]; // [{ id: '', tag: '' }]
}

export default function TagsDialog({ id, tags }: TagsDialogProps) {
  const [inputTag, setInputTag] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tags,
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = form;

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" || e.key === "Comma") {
      e.preventDefault();

      const newTags = inputTag
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      if (newTags.length === 0) return;

      const currentTags = getValues("tags");

      const filtered = newTags
        .filter(
          (tag) =>
            !currentTags.some((t) => t.tag === tag) &&
            tag.length <= 10 &&
            currentTags.length < 5
        )
        .slice(0, 5 - currentTags.length);

      if (filtered.length > 0) {
        setValue("tags", [
          ...currentTags,
          ...filtered.map((tag) => ({
            id: crypto.randomUUID(),
            tag,
          })),
        ]);
      }

      setInputTag("");
    }
  };

  const handleTagRemove = (index: number) => {
    const newTags = [...getValues("tags")];
    newTags.splice(index, 1);
    setValue("tags", newTags);
  };

  const onSubmit = async (data: FormValues) => {
    const { error } = await updateUserTags(id, data.tags);

    if (error) {
      console.error("태그 저장 실패:", error);
      toast.error("태그 저장 실패");
      return;
    }

    toast.success("태그가 성공적으로 저장되었습니다.");
    setIsOpen(false);
  };

  return (
    <Form {...form}>
      <ResponsiveDialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            reset({ tags }); // 닫힐 때 원래 상태로 되돌림
          }
        }}
        trigger={
          <Button variant="muted" size="sm">
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Button>
        }
        title="관심 태그 수정"
        description="관심 있는 태그를 최대 5개까지 입력할 수 있어요. 각 태그는 10자 이내로 작성해주세요."
        onSubmit={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <div className="space-y-6">
          {/* 태그 입력 필드 */}
          <FormItem>
            <FormLabel>태그</FormLabel>
            <FormControl>
              <Input
                placeholder="태그 입력 후 Enter 또는 쉼표로 추가"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                disabled={watch("tags").length >= 5}
                maxLength={10}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* 태그 목록 */}
          <ul className="flex flex-wrap gap-2">
            {watch("tags").map((tag, index) => (
              <li key={tag.id}>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 pr-1"
                >
                  #{tag.tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(index)}
                    className="ml-1 text-muted-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </ResponsiveDialog>
    </Form>
  );
}
