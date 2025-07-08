"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";
import { uploadImage } from "@/feature/common/api/api.client";
import { handleAction } from "@/feature/common/api/action";
import { toast } from "sonner";
import { BASIC_PROFILE_IMAGE } from "@/lib/const";
import { useEffect } from "react";

const schema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  description: z.string().min(1, { message: "내용을 입력해주세요." }),
  image_url: z.string().optional(),
  url: z.string().url("올바른 링크를 입력해주세요"),
  is_representative: z.boolean().optional(),
});

export type WorkValues = z.infer<typeof schema>;

interface WorkDialogProps {
  userId: string;
  mode?: "create" | "edit";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValues?: Partial<WorkValues>;
  onSubmitSuccess?: (data: WorkValues) => Promise<void>;
}

export function WorkDialog({
  mode = "create",
  open,
  userId,
  onOpenChange,
  defaultValues,
  onSubmitSuccess,
}: WorkDialogProps) {
  const form = useForm<WorkValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      image_url: defaultValues?.image_url ?? "",
      url: defaultValues?.url ?? "",
      is_representative: defaultValues?.is_representative ?? false,
    },
  });
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = form;

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title ?? "",
        description: defaultValues.description ?? "",
        image_url: defaultValues.image_url ?? "",
        url: defaultValues.url ?? "",
        is_representative: defaultValues.is_representative ?? false,
      });
    }
  }, [defaultValues, form]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;

    if (file) {
      await handleAction(() => uploadImage(file, userId), {
        successMessage: "이미지가 성공적으로 업로드되었습니다.",
        errorMessage: "이미지 업로드에 실패했습니다.",
        onSuccess: ({ imagePath }) => {
          setValue("image_url", imagePath);
        },
      });
    } else {
      toast.error("이미지 파일을 선택해주세요.");
      return;
    }
  };

  const onSubmit = (data: WorkValues) => {
    onSubmitSuccess?.(data);
  };

  const isEdit = mode === "edit";

  return (
    <ResponsiveDialog
      trigger={undefined}
      title={isEdit ? "작품 수정" : "작품 등록"}
      description={
        isEdit ? "작가님의 작품을 수정하세요." : "작가님의 작품을 등록해주세요."
      }
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      onOpenChange={(open) => {
        onOpenChange?.(open);

        if (!open) {
          form.reset({
            title: defaultValues?.title ?? "",
            description: defaultValues?.description ?? "",
            image_url: defaultValues?.image_url ?? "",
            url: defaultValues?.url ?? "",
            is_representative: defaultValues?.is_representative ?? false,
          });
        }
      }}
      submitText={isEdit ? "수정하기" : "등록하기"}
      disabled={!isValid}
    >
      <Form {...form}>
        <div className="space-y-4">
          {/* ✅ 대표작 체크박스 - 맨 위 */}
          <FormField
            control={control}
            name="is_representative"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="m-0 text-sm">대표작으로 설정</FormLabel>
              </FormItem>
            )}
          />

          {/* 제목 */}
          <FormField
            control={control}
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
            control={control}
            name="description"
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
            control={control}
            name="url"
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
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                    이미지 선택
                  </label>

                  <span className="text-sm text-muted-foreground italic">
                    {watch("image_url")
                      ? "이미지가 선택되었습니다."
                      : "선택된 파일 없음"}
                  </span>
                </div>

                {watch("image_url") && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${
                      watch("image_url") || BASIC_PROFILE_IMAGE
                    }`}
                    alt="프로필 미리보기"
                    width={400}
                    height={400}
                    className="object-cover border rounded w-full h-70"
                  />
                )}
                <p className="text-xs text-gray-500 text-center">
                  파일을 선택하지 않으면 기본 이미지가 표시됩니다.
                </p>
              </div>
            </FormControl>
          </FormItem>
        </div>
      </Form>
    </ResponsiveDialog>
  );
}
