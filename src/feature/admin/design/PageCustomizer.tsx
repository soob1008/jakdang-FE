"use client";

import { useRef } from "react";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/ui/form";
import { Page } from "@/entities/page/model/types";
import { handleAction } from "@/shared/lib/api/action";
import Image from "next/image";
import { uploadImage } from "@/shared/lib/api/api.client";
import { toast } from "sonner";

export default function PageCustomizer() {
  const { register, watch, setValue } = useFormContext<
    {
      user_id: string;
    } & Page
  >();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const background_mode = watch("style_draft.background_mode") ?? "color";
  const background_color = watch("style_draft.background_color") ?? "#ffffff";
  const gradient_start = watch("style_draft.gradient_start") ?? "#a18cd1";
  const gradient_end = watch("style_draft.gradient_end") ?? "#fbc2eb";
  const background_image_url = watch("style_draft.background_image_url") ?? "";
  const button_style = watch("style_draft.button_style") ?? "rounded";

  // 모드 전환 시 불필요 필드 초기화(옵션)
  const setBgMode = (mode: "color" | "image" | "gradient") => {
    setValue("style_draft.background_mode", mode, {
      shouldDirty: true,
      shouldTouch: true,
    });
    if (mode === "color" || mode === "gradient") {
      setValue("style_draft.background_image_url", "");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;

    if (file) {
      await handleAction(() => uploadImage(file, watch("user_id")), {
        successMessage: "이미지가 성공적으로 업로드되었습니다.",
        errorMessage: "이미지 업로드에 실패했습니다.",
        onSuccess: ({ imagePath }) => {
          setValue("style_draft.background_image_url", imagePath);
        },
      });
    } else {
      toast.error("이미지 파일을 선택해주세요.");
      return;
    }
  };

  return (
    <div className="grid gap-6 w-full">
      <div className="space-y-6 p-4 rounded-xl border bg-card shadow-sm">
        {/* 테마 색상 */}
        <section className="space-y-3">
          <h3 className="font-bold text-foreground/80">테마 색상</h3>
          <FormItem className="flex items-center gap-3">
            <FormLabel htmlFor="primary">기본 색상</FormLabel>
            <FormControl>
              <Input
                id="primary"
                type="color"
                className="h-8 w-12 p-1 cursor-pointer rounded-md border"
                {...register("style_draft.theme_color")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <p className="text-xs text-muted-foreground mb-1">
            * 개별 텍스트 컬러 설정은 <strong>구성하기</strong> 메뉴의 각
            블럭에서 설정 가능합니다.
          </p>
        </section>

        {/* 배경 스타일 */}
        <section className="space-y-3">
          <h3 className="font-bold text-foreground/80">배경 스타일</h3>
          <div className="flex gap-3">
            <Tile
              selected={background_mode === "color"}
              onClick={() => setBgMode("color")}
              label="색상"
            >
              <div
                style={{ backgroundColor: background_color }}
                className="w-full h-full"
              />
            </Tile>
            <Tile
              selected={background_mode === "gradient"}
              onClick={() => setBgMode("gradient")}
              label="그라디언트"
            >
              <div
                style={{
                  backgroundImage: `linear-gradient(135deg, ${gradient_start}, ${gradient_end})`,
                }}
                className="w-full h-full"
              />
            </Tile>
            <Tile
              selected={background_mode === "image"}
              onClick={() => setBgMode("image")}
              label="이미지"
            >
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=300&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
            </Tile>
          </div>

          {background_mode === "color" && (
            <FormItem className="flex items-center gap-3 pt-2">
              <FormLabel htmlFor="bgcolor">배경 색상</FormLabel>
              <FormControl>
                <Input
                  id="bgcolor"
                  type="color"
                  className="h-8 w-12 p-1 cursor-pointer rounded-md border"
                  {...register("style_draft.background_color")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}

          {background_mode === "gradient" && (
            <div className="grid gap-3 pt-2">
              <div className="flex items-center gap-4">
                <FormItem className="flex items-center gap-2">
                  <FormLabel htmlFor="gstart">시작</FormLabel>
                  <FormControl>
                    <Input
                      id="gstart"
                      type="color"
                      className="h-8 w-12 p-1 cursor-pointer rounded-md border"
                      {...register("style_draft.gradient_start")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem className="flex items-center gap-2">
                  <FormLabel htmlFor="gend">끝</FormLabel>
                  <FormControl>
                    <Input
                      id="gend"
                      type="color"
                      className="h-8 w-12 p-1 cursor-pointer rounded-md border"
                      {...register("style_draft.gradient_end")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <div
                className="rounded-lg h-8 border"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${gradient_start}, ${gradient_end})`,
                }}
              />
            </div>
          )}

          {background_mode === "image" && (
            <div className="grid gap-2 pt-2">
              <Label
                htmlFor="imgfile"
                className="inline-flex items-center gap-3 cursor-pointer select-none"
              >
                {/* 썸네일(작게) */}
                <div className="relative w-28 h-30 rounded-md overflow-hidden border bg-muted/30">
                  {background_image_url ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${background_image_url}`}
                      width={112}
                      height={64}
                      alt="배경 미리보기"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center text-center w-full h-full text-[11px] text-muted-foreground flex-wrap">
                      이미지 선택 <br /> (클릭하여 업로드)
                    </div>
                  )}
                </div>

                {/* 실제 파일 입력은 숨김 */}
                <input
                  ref={fileRef}
                  id="imgfile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </Label>

              {background_image_url && (
                <div className="text-xs text-muted-foreground">
                  미리보기 적용됨
                </div>
              )}
            </div>
          )}
        </section>

        {/* 버튼 스타일 */}
        <section className="space-y-3">
          <h3 className="font-bold text-foreground/80">버튼 스타일</h3>
          <div className="flex gap-3">
            <Tile
              selected={button_style === "sharp"}
              onClick={() =>
                setValue("style_draft.button_style", "sharp", {
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              label="각진"
            >
              <div className="w-full h-full grid place-items-center">
                <div className="px-3 py-1.5 text-xs font-medium border bg-background rounded-none shadow-sm">
                  각진
                </div>
              </div>
            </Tile>
            <Tile
              selected={button_style === "rounded"}
              onClick={() =>
                setValue("style_draft.button_style", "rounded", {
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              label="둥근"
            >
              <div className="w-full h-full grid place-items-center">
                <div className="px-3 py-1.5 text-xs font-medium border bg-background rounded-lg shadow-sm">
                  둥근
                </div>
              </div>
            </Tile>
          </div>
        </section>
      </div>
    </div>
  );
}

const Tile = ({
  selected,
  onClick,
  children,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "group relative w-14 h-14 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors flex items-center justify-center overflow-hidden",
      selected && "ring-2 ring-primary ring-offset-2 shadow-sm"
    )}
    aria-pressed={selected}
  >
    {children}
    <span className="absolute -bottom-5 text-[11px] text-muted-foreground whitespace-nowrap">
      {label}
    </span>
  </button>
);
