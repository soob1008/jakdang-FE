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

const schema = z.object({
  tags: z.array(z.string()),
});

type ProfileFormValues = z.infer<typeof schema>;

export default function TagsDialog() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tags: [],
    },
  });

  const [inputTag, setInputTag] = useState("");

  const onSubmit = (data: ProfileFormValues) => {
    console.log("태그:", data.tags);
    // 저장 로직 실행
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    const key = e.key;
    const code = e.code;

    if (key === "Enter" || code === "Comma") {
      e.preventDefault();

      const rawTags = inputTag
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      if (rawTags.length === 0) return;

      const currentTags = form.getValues("tags");

      const filtered = rawTags
        .filter(
          (tag) =>
            !currentTags.includes(tag) &&
            tag.length <= 10 &&
            currentTags.length < 5
        )
        .slice(0, 5 - currentTags.length); // 최대 5개 제한

      if (filtered.length > 0) {
        form.setValue("tags", [...currentTags, ...filtered]);
      }

      setInputTag("");
    }
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button variant="muted" size="sm">
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>
      }
      title="관심 태그 수정"
      description="관심 있는 태그를 최대 5개까지 입력할 수 있어요. 각 태그는 10자 이내로 작성해주세요."
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <div className="space-y-6">
          {/* 태그 */}
          <FormItem>
            <FormLabel>태그</FormLabel>
            <FormControl>
              <Input
                placeholder="태그 입력 후 Enter 또는 쉼표로 추가"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                disabled={form.watch("tags").length >= 5}
                maxLength={10}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* 태그 미리보기 */}
          <ul className="flex flex-wrap gap-2">
            {form.watch("tags").map((tag, index) => (
              <li key={index}>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 pr-1"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = form
                        .getValues("tags")
                        .filter((t) => t !== tag);
                      form.setValue("tags", updated);
                    }}
                    className="ml-1 text-muted-foreground"
                  >
                    <X className="w-3 h-3 " />
                  </button>
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </Form>
    </ResponsiveDialog>
  );
}
