"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ImageIcon } from "lucide-react";
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
  link: z.string().optional(),
});

type PostValues = z.infer<typeof postSchema>;

export function WorkDialog() {
  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      link: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: PostValues) => {
    console.log("제목:", data.title);
    console.log("글:", data.content);
    console.log("링크:", data.link);
    console.log("이미지:", selectedFile);
    // 저장 로직
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button variant="muted" size="sm">
          <Plus className="w-4 h-4 mr-1" /> Create
        </Button>
      }
      title="작품 등록"
      description="작가님의 작품을 등록하세요."
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <div className="space-y-4">
          {/* 제목 */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input placeholder="작품의 제목을 써주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 설명 */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>설명</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="작품에 대한 설명을 써주세요."
                    className="resize-none h-20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 링크 */}
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>링크</FormLabel>
                <FormControl>
                  <Input placeholder="링크를 첨부해주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 이미지 업로드 */}
          <FormItem>
            <FormLabel>이미지</FormLabel>
            <FormControl>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="file-upload"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4" />
                  이미지 선택
                </label>

                <span className="text-sm text-muted-foreground italic">
                  {selectedFile?.name ?? "선택된 파일 없음"}
                </span>
              </div>
            </FormControl>

            <div className="mt-3 space-y-1">
              <Image
                src={previewUrl || "/test.png"}
                alt="미리보기"
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-40 border"
              />
              <p className="text-xs text-gray-500 text-center">
                파일을 선택하지 않으면 기본 이미지가 표시됩니다.
              </p>
            </div>
          </FormItem>
        </div>
      </Form>
    </ResponsiveDialog>
  );
}
