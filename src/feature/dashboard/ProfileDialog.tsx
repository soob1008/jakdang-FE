"use client";

import { useState } from "react";
import { z } from "zod";
import Image from "next/image";
import { Pencil, ImageIcon } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";

const schema = z.object({
  penName: z.string().min(1, "필명을 입력해주세요."),
  bio: z.string().min(1, "소개글을 입력해주세요."),
});

type ProfileFormValues = z.infer<typeof schema>;

export function ProfileDialog() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      penName: "",
      bio: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    console.log("필명:", data.penName);
    console.log("소개글:", data.bio);
    console.log("이미지:", selectedFile);
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
      title="프로필 수정"
      description="필명과 소개글을 자유롭게 작성해주세요."
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <div className="space-y-6">
          {/* 이미지 업로드 */}
          <FormItem>
            <FormLabel>프로필 이미지</FormLabel>
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

            {previewUrl && (
              <div className="mt-3 flex justify-center">
                <Image
                  src={previewUrl}
                  alt="프로필 미리보기"
                  width={100}
                  height={100}
                  className="rounded-full object-cover border w-24 h-24"
                />
              </div>
            )}
            <FormMessage />
          </FormItem>

          {/* 필명 */}
          <FormField
            control={form.control}
            name="penName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>필명</FormLabel>
                <FormControl>
                  <Input placeholder="필명 입력" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 소개글 */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>소개글</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="간단한 소개글"
                    className="resize-none h-32"
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
