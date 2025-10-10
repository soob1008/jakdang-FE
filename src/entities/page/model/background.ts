import type { CSSProperties } from "react";
import type { PageStyle } from "@/entities/page/model/types";

export function buildPageBackgroundStyle(style?: PageStyle | null): CSSProperties {
  const backgroundStyle: CSSProperties = {};
  const mode = style?.background_mode ?? "color";

  if (mode === "color") {
    backgroundStyle.backgroundColor = style?.background_color ?? "#ffffff";
    return backgroundStyle;
  }

  if (mode === "gradient") {
    const start = style?.gradient_start ?? "#a18cd1";
    const end = style?.gradient_end ?? "#fbc2eb";
    backgroundStyle.backgroundImage = `linear-gradient(180deg, ${start} 0%, ${end} 100%)`;
    return backgroundStyle;
  }

  const imagePath = style?.background_image_url;
  if (mode === "image" && imagePath) {
    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";
    backgroundStyle.backgroundImage = `url(${baseUrl}${imagePath})`;
    backgroundStyle.backgroundSize = "cover";
    backgroundStyle.backgroundRepeat = "no-repeat";
    backgroundStyle.backgroundPosition = "top";
    return backgroundStyle;
  }

  backgroundStyle.backgroundColor = "#ffffff";
  return backgroundStyle;
}

