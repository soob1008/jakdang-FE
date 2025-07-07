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
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";
import { Author } from "@/feature/user/type";
import { updateUser } from "@/feature/user/api.server";
import { toast } from "sonner";
import { uploadImage } from "@/feature/common/api/api.client";
import { BASIC_PROFILE_IMAGE } from "@/lib/const";
import { handleAction } from "@/feature/common/api/action";

const schema = z.object({
  displayName: z.string().min(1, "필명을 입력해주세요."),
  slug: z
    .string()
    .min(5, "주소는 최소 5자 이상이어야 해요.")
    .max(20, "주소는 최대 20자까지 가능해요.")
    .regex(/^[a-z0-9]+$/, "영어 소문자와 숫자만 사용할 수 있어요."),
  profile_image_url: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof schema>;

interface ProfileDialogProps {
  author: Author;
}

export function ProfileDialog({ author }: ProfileDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: author?.display_name || "",
      slug: author?.slug || "",
      profile_image_url: author?.profile_image_url || "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = form;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;

    if (file) {
      await handleAction(() => uploadImage(file, author.id), {
        successMessage: "이미지가 성공적으로 업로드되었습니다.",
        errorMessage: "이미지 업로드에 실패했습니다.",
        onSuccess: ({ imagePath }) => {
          setValue("profile_image_url", imagePath);
        },
      });
    } else {
      toast.error("이미지 파일을 선택해주세요.");
      return;
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    await handleAction(
      () => {
        return updateUser(author.id, {
          display_name: data.displayName,
          slug: data.slug,
          profile_image_url: data.profile_image_url,
        });
      },
      {
        successMessage: "프로필이 성공적으로 업데이트되었습니다.",
        errorMessage: "프로필 업데이트에 실패했습니다.",
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);

        if (!open) {
          form.reset({
            displayName: author?.display_name || "",
            slug: author?.slug || "",
            profile_image_url: author?.profile_image_url || "",
          });
        }
      }}
      trigger={
        <Button variant="muted" size="sm">
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>
      }
      title="프로필 수정"
      description="필명과 소개글을 자유롭게 작성해주세요."
      onSubmit={handleSubmit(onSubmit)}
      disabled={!isValid}
    >
      <Form {...form}>
        <div className="space-y-6">
          <FormItem>
            <FormField
              control={control}
              name="profile_image_url"
              render={({}) => (
                <FormItem>
                  <FormLabel>프로필 이미지</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      id="file-upload"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </FormControl>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition cursor-pointer"
                    >
                      <ImageIcon className="w-4 h-4" />
                      이미지 선택
                    </label>

                    <span className="text-sm text-muted-foreground italic">
                      {watch("profile_image_url")
                        ? "이미지가 선택되었습니다."
                        : "선택된 파일 없음"}
                    </span>
                  </div>

                  {watch("profile_image_url") && (
                    <div className="mt-3 flex justify-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${
                          watch("profile_image_url") || BASIC_PROFILE_IMAGE
                        }`}
                        alt="프로필 미리보기"
                        width={100}
                        height={100}
                        className="rounded-full object-cover border w-24 h-24"
                      />
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormMessage />
          </FormItem>

          {/* 필명 */}
          <FormField
            control={control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  필명 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="필명 입력" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 필명 */}
          <FormField
            control={control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  주소 <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="예: jakdang, jakdang123" {...field} />
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
