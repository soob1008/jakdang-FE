"use client";

import type { CSSProperties } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";
import type { NodeKey } from "lexical";
import type { ImageAlign } from "./ImageNode";
import { $isImageNode } from "./ImageNode";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { Slider } from "@/shared/ui/slider";
import { AlignLeft, AlignCenter, AlignRight, PanelLeft, PanelRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ImageComponentProps {
  nodeKey: NodeKey;
  src: string;
  width: number;
  align: ImageAlign;
}

export function ImageComponent({
  nodeKey,
  src,
  width,
  align,
}: ImageComponentProps) {
  const [editor] = useLexicalComposerContext();
  const resolvedWidth = clamp(width, 10, 100);
  const resolvedSrc = resolveSrc(src);
  const containerWidth = `${resolvedWidth}%`;
  const isSideBySide = align === "text-left" || align === "text-right";

  const handleWidthChange = (nextWidth: number) => {
    const clamped = clamp(nextWidth, 10, 100);
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setWidth(clamped);
      }
    });
  };

  const handleAlignChange = (nextAlign: ImageAlign) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (!$isImageNode(node)) return;
      node.setAlign(nextAlign);
      if (
        (nextAlign === "text-left" || nextAlign === "text-right") &&
        node.getWidth() > 60
      ) {
        node.setWidth(60);
      }
    });
  };

  const figureClassName = cn(
    "my-4 flex flex-col gap-2",
    !isSideBySide && "mx-auto",
    !isSideBySide && align === "left" && "ml-0 mr-auto",
    !isSideBySide && align === "center" && "mx-auto",
    !isSideBySide && align === "right" && "ml-auto mr-0",
    align === "text-left" && "float-left mr-6 mb-2",
    align === "text-right" && "float-right ml-6 mb-2"
  );

  const figureStyle: CSSProperties = {
    width: containerWidth,
    maxWidth: "480px",
    minWidth: isSideBySide ? "240px" : undefined,
  };

  const alignmentOptions = (
    [
      { value: "left", icon: AlignLeft, label: "왼쪽 정렬" },
      { value: "center", icon: AlignCenter, label: "가운데 정렬" },
      { value: "right", icon: AlignRight, label: "오른쪽 정렬" },
      { value: "text-left", icon: PanelLeft, label: "이미지 왼쪽 + 텍스트" },
      { value: "text-right", icon: PanelRight, label: "이미지 오른쪽 + 텍스트" },
    ] as const
  );

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <figure className={figureClassName} style={figureStyle}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolvedSrc}
              alt="업로드된 이미지"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </figure>
        </PopoverTrigger>
        <PopoverContent className="w-44 space-y-3 p-3" side="top" align="start">
          <div className="space-y-2">
            <Slider
              value={[resolvedWidth]}
              min={10}
              max={100}
              step={5}
              onValueChange={([value]) => handleWidthChange(value)}
            />
            <div className="text-right text-[11px] text-muted-foreground">
              {resolvedWidth}%
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1">
            {alignmentOptions.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                type="button"
                className={cn(
                  "flex h-8 w-full items-center justify-center rounded-md border transition",
                  align === value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:bg-muted"
                )}
                onClick={() => handleAlignChange(value)}
                title={label}
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {!isSideBySide && <div className="clear-both" />}
    </>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function resolveSrc(src: string) {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";
  return `${baseUrl}${src}`;
}
