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
  tags: AuthorTag[];
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

  const handleTagAdd = () => {
    const rawTags = inputTag
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (rawTags.length === 0) return;

    const currentTags = getValues("tags");
    const maxTags = 5;

    const uniqueNewTags = rawTags
      .filter(
        (tag) => !currentTags.some((t) => t.tag === tag) && tag.length <= 10
      )
      .slice(0, maxTags - currentTags.length);

    if (uniqueNewTags.length === 0) return;

    const updatedTags = [
      ...currentTags,
      ...uniqueNewTags.map((tag) => ({
        id: crypto.randomUUID(),
        tag,
      })),
    ];

    setValue("tags", updatedTags);
    setInputTag("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" || e.key === "Comma") {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const handleTagRemove = (tagId: string) => {
    const newTags = getValues("tags").filter((tag) => tag.id !== tagId);
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
            reset({ tags });
          }
        }}
        trigger={
          <Button variant="muted" size="sm">
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Button>
        }
        title="관심 태그"
        description="최대 5개, 태그당 10자까지 입력할 수 있어요."
        onSubmit={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <div className="space-y-6">
          {/* 태그 입력 필드 */}
          <FormItem>
            <FormLabel>태그</FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="태그 입력 후 Enter 또는 쉼표로 추가"
                  value={inputTag}
                  onChange={(e) => setInputTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  disabled={watch("tags").length >= 5}
                  maxLength={10}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleTagAdd}
                  disabled={!inputTag.trim() || watch("tags").length >= 5}
                >
                  입력
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* 태그 목록 */}
          <ul className="flex flex-wrap gap-2">
            {watch("tags").map((tag) => (
              <li key={tag.id}>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 pr-1"
                >
                  #{tag.tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag.id)}
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
