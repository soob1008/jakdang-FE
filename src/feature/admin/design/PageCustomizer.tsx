"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Page } from "@/feature/admin/types";

export default function PageCustomizer() {
  const { register, watch, setValue } = useFormContext<Page>();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const background_mode = watch("style_draft.background_mode") ?? "color";
  const background_color = watch("style_draft.background_color") ?? "#ffffff";
  const gradient_start = watch("style_draft.gradient_start") ?? "#a18cd1";
  const gradient_end = watch("style_draft.gradient_end") ?? "#fbc2eb";
  const background_image_url = watch("style_draft.background_image_url") ?? "";
  const button_style = watch("style_draft.button_style") ?? "rounded";

  const handlePickImage = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setValue("style_draft.background_image_url", url, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

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

  console.log("Page Style:", watch("style_draft"));

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
              <Label htmlFor="imgfile">이미지 업로드</Label>
              <input
                ref={fileRef}
                id="imgfile"
                type="file"
                accept="image/*"
                onChange={(e) => handlePickImage(e.target.files?.[0])}
                className="text-sm"
              />
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
          <h3 className="text-sm font-medium text-foreground/80">
            버튼 스타일
          </h3>
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
