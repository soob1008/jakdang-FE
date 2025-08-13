import { Block, BlockDataText } from "@/feature/admin/types";
import clsx from "clsx";

interface TextBlockProps {
  block: Block;
}

export default function TextBlock({ block }: TextBlockProps) {
  if (!block.is_active) return null;

  const { title, content, align, font_size, color } =
    block.data as BlockDataText;

  // 본문 폰트 크기 매핑
  const contentFontMap: Record<string, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  // 제목 폰트 크기 매핑 (본문보다 2단계 이상 크게)
  const titleFontMap: Record<string, string> = {
    xs: "text-lg", // extra small → xl
    sm: "text-xl", // small → 2xl
    md: "text-2xl", // medium → 3xl
    lg: "text-3xl", // large → 4xl
    xl: "text-4xl", // xl → 5xl
    "2xl": "text-5xl", // 2xl → 6xl
  };

  const contentFontSize = contentFontMap[font_size] || "text-base";
  const titleFontSize = titleFontMap[font_size] || "text-2xl";

  // 정렬 매핑
  const alignClass: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  const alignClassName = alignClass[align] || "text-left";

  return (
    <div
      className={clsx("w-full space-y-3", alignClassName)}
      style={{ color: color || "inherit" }}
    >
      {title && (
        <h2
          className={clsx(
            "font-extrabold leading-tight",
            titleFontSize,
            alignClassName,
            color ? "" : "text-gray-900"
          )}
        >
          {title}
        </h2>
      )}

      {content && (
        <p
          className={clsx(
            contentFontSize,
            "whitespace-pre-line leading-relaxed"
          )}
        >
          {content}
        </p>
      )}
    </div>
  );
}
