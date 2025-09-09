"use client";

import { Block } from "@/feature/admin/types";
import { useFormContext, useWatch } from "react-hook-form";
import BlockPreview from "@/feature/admin/block/BlockPreview";
import ProfileBlock from "../author/blocks/ProfileBlock";
import React from "react";
import { autoContrast } from "@/shared/lib/utils";

export default function PagePreview() {
  const { watch, control } = useFormContext();

  // blocks/profile
  const blocks: Block[] =
    useWatch({ name: "blocks_draft", control }) ?? ([] as Block[]);
  const profile = watch("profile");
  const displayName = watch("display_name") as string;

  // style draft (live)
  const style = useWatch({ name: "style_draft", control }) as
    | {
        theme_color?: string;
        background_mode?: "color" | "image" | "gradient";
        background_color?: string;
        background_image_url?: string;
        gradient_start?: string;
        gradient_end?: string;
        button_style?: "rounded" | "sharp";
      }
    | undefined;

  const themeColor = style?.theme_color ?? "#3b82f6";
  const backgroundMode = style?.background_mode ?? "color";
  const bgColor = style?.background_color ?? "#ffffff";
  const bgImage = style?.background_image_url ?? "";
  const gStart = style?.gradient_start ?? "#a18cd1";
  const gEnd = style?.gradient_end ?? "#fbc2eb";
  const btnStyle = style?.button_style ?? "rounded";

  // background style for the phone viewport
  const bgStyle: React.CSSProperties = {};
  if (backgroundMode === "color") {
    bgStyle.backgroundColor = bgColor;
  } else if (backgroundMode === "image") {
    bgStyle.backgroundImage = `url(${process.env.NEXT_PUBLIC_IMAGE_URL}${bgImage})`;
    bgStyle.backgroundSize = "cover";
    bgStyle.backgroundPosition = "center";
  } else if (backgroundMode === "gradient") {
    bgStyle.backgroundImage = `linear-gradient(180deg, ${gStart}, ${gEnd})`;
  }

  // CSS variables to let inner components opt-in to the theme
  const cssVars = {
    "--color-primary": themeColor,
    "--color-primary-fg": autoContrast(themeColor),
    "--btn-radius": btnStyle === "rounded" ? "12px" : "0px",
  } as React.CSSProperties as React.CSSProperties & Record<string, string>;

  return (
    <aside
      className="sticky top-10 h-fit px-8 md:px-8 flex flex-col items-center justify-center"
      style={cssVars}
      data-button-style={btnStyle}
    >
      <section
        aria-label="모바일 화면 미리보기"
        className="relative w-full sm:w-[360px] h-[700px] overflow-y-scroll scrollbar-none rounded-[2rem] border border-gray-200 shadow-[0_0_20px_rgba(0,0,0,0.08)]"
        style={bgStyle}
      >
        {/* overlay for image/gradient to keep things readable (very subtle) */}
        {(backgroundMode === "image" || backgroundMode === "gradient") && (
          <div className="pointer-events-none absolute inset-0" />
        )}

        {/* content */}
        <div
          className="relative flex flex-col gap-6 origin-top scale-[0.9] pt-8"
          style={{ height: "calc(100% / 0.9)" }}
        >
          {profile?.is_active && (
            <article aria-label="프로필 블록">
              <ProfileBlock profile={profile} displayName={displayName} />
            </article>
          )}

          <div className="flex flex-col gap-12 px-1 pb-16">
            {blocks.map((block: Block, index: number) => (
              <article key={index} aria-label={`콘텐츠 블록 ${index + 1}`}>
                <BlockPreview block={block} style={watch("style_draft")} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
}
