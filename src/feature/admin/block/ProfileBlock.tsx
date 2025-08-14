"use client";

import { useState, ChangeEvent } from "react";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Upload } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/api/api.client";
import { handleAction } from "@/lib/api/action";
import { useFormContext } from "react-hook-form";

export default function ProfileBlock() {
  const { control, register, watch, setValue } = useFormContext();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const profile = watch("profile") || {};

  const handleToggle = () => setIsOpenProfile((prev) => !prev);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleAction(() => uploadImage(file, watch("user_id")), {
      successMessage: "프로필 이미지가 업로드되었습니다.",
      errorMessage: "이미지 업로드 실패",
      onSuccess: ({ imagePath }) => {
        setValue("profile.avatar_url", imagePath);
      },
    });
  };

  return (
    <section className="bg-white rounded-lg shadow-sm">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-3 border-b">
        <h4 className="font-semibold">프로필</h4>
        <div className="flex items-center gap-2">
          <FormField
            name={`profile.is_active`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id={`profile.is_active`}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToggle}
          >
            {isOpenProfile ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* 내용 */}
      {isOpenProfile && (
        <div className="p-3 space-y-4">
          {/* 프로필 이미지 */}
          <div>
            <label className="text-sm font-medium">프로필 이미지</label>
            <div className="mt-2 flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted">
                {profile.avatar_url && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${profile.avatar_url}`}
                    alt="프로필 이미지"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <label className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm bg-muted rounded-md border border-dashed hover:bg-muted/70">
                <Upload className="w-4 h-4" />
                업로드
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  hidden
                />
              </label>
            </div>
          </div>

          {/* 대표 문구 */}
          <div>
            <label className="text-sm font-medium">대표 문구</label>
            <Input
              {...register("profile.headline")}
              placeholder="대표 문구를 입력하세요"
              className="mt-2"
            />
          </div>
        </div>
      )}
    </section>
  );
}
