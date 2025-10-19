"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  LexicalCommand,
  $isTextNode,
} from "lexical";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { $patchStyleText } from "@lexical/selection";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/select";
import { INSERT_IMAGE_COMMAND } from "./plugins/imageCommands";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [color, setColor] = useState<string>("#000000");
  const [fontSize, setFontSize] = useState<string>("16px");
  const [fontFamily, setFontFamily] = useState<string>("Pretendard");

  // Lexical 상태 업데이트 감시
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsUnderline(selection.hasFormat("underline"));

          const parent = selection.anchor.getNode().getParent();
          if (parent !== null) {
            const formatType = parent.getFormatType?.() as
              | "left"
              | "center"
              | "right";
            setAlign(formatType || "left");
          }

          const node = selection.anchor.getNode();
          if ($isTextNode(node)) {
            const styles = node.getStyle();
            if (styles) {
              const sizeMatch = styles.match(/font-size:\s*([^;]+)/);
              const familyMatch = styles.match(/font-family:\s*([^;]+)/);
              const colorMatch = styles.match(/color:\s*([^;]+)/);

              if (sizeMatch) setFontSize(sizeMatch[1]);
              if (familyMatch)
                setFontFamily(familyMatch[1].replace(/['"]/g, ""));
              if (colorMatch) setColor(colorMatch[1]);
            }
          }
        }
      });
    });
  }, [editor]);

  const toggle = (command: LexicalCommand<string>, val: string) =>
    editor.dispatchCommand(command, val);

  // 색상 / 폰트 크기 / 폰트 패밀리 변경 핸들러
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { color: newColor });
      }
    });
  };

  const handleFontSizeChange = (newSize: string) => {
    setFontSize(newSize);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { "font-size": newSize });
      }
    });
  };

  const handleFontFamilyChange = (newFamily: string) => {
    setFontFamily(newFamily);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { "font-family": newFamily });
      }
    });
  };

  // 이미지 업로드 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, { file });
    }
    e.target.value = ""; // 동일 파일 다시 선택 가능하게
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-t border-b bg-white px-2 py-1">
      {/* ✅ 이미지 업로드 버튼 */}
      <div className="flex items-center border-r pr-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-8 h-7 flex items-center justify-center hover:bg-gray-100"
          title="이미지 삽입"
        >
          <ImageIcon size={16} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Bold / Italic / Underline */}
      <div className="flex border-r">
        <button
          type="button"
          onClick={() => toggle(FORMAT_TEXT_COMMAND, "bold")}
          className={`px-3 h-7 font-bold hover:bg-gray-100 ${
            isBold ? "bg-gray-200" : ""
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => toggle(FORMAT_TEXT_COMMAND, "italic")}
          className={`px-3 h-7 italic hover:bg-gray-100 ${
            isItalic ? "bg-gray-200" : ""
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => toggle(FORMAT_TEXT_COMMAND, "underline")}
          className={`px-3 h-7 underline hover:bg-gray-100 ${
            isUnderline ? "bg-gray-200" : ""
          }`}
        >
          U
        </button>
      </div>

      {/* Align */}
      <div className="flex border-r">
        <button
          type="button"
          onClick={() => toggle(FORMAT_ELEMENT_COMMAND, "left")}
          className={`w-8 h-7 flex items-center justify-center hover:bg-gray-100 ${
            align === "left" ? "bg-gray-200" : ""
          }`}
        >
          <AlignLeft size={14} />
        </button>
        <button
          type="button"
          onClick={() => toggle(FORMAT_ELEMENT_COMMAND, "center")}
          className={`w-8 h-7 flex items-center justify-center hover:bg-gray-100 ${
            align === "center" ? "bg-gray-200" : ""
          }`}
        >
          <AlignCenter size={14} />
        </button>
        <button
          type="button"
          onClick={() => toggle(FORMAT_ELEMENT_COMMAND, "right")}
          className={`w-8 h-7 flex items-center justify-center hover:bg-gray-100 ${
            align === "right" ? "bg-gray-200" : ""
          }`}
        >
          <AlignRight size={14} />
        </button>
      </div>

      {/* Color Picker */}
      <div className="flex items-center gap-1 px-2 border-r">
        <input
          type="color"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-8 h-7 cursor-pointer border rounded"
        />
      </div>

      {/* Font Size (Select) */}
      <Select onValueChange={handleFontSizeChange} value={fontSize}>
        <SelectTrigger className="w-[120px] h-7 text-sm">
          <SelectValue placeholder="폰트 크기" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="12px">12px</SelectItem>
          <SelectItem value="14px">14px</SelectItem>
          <SelectItem value="16px">16px (기본)</SelectItem>
          <SelectItem value="20px">20px</SelectItem>
          <SelectItem value="24px">24px</SelectItem>
          <SelectItem value="32px">32px</SelectItem>
        </SelectContent>
      </Select>

      {/* Font Family (Select) */}
      <Select onValueChange={handleFontFamilyChange} value={fontFamily}>
        <SelectTrigger className="w-[140px] h-7 text-sm">
          <SelectValue placeholder="폰트 종류" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pretendard">Pretendard</SelectItem>
          <SelectItem value="BookkMyungjo">부크크명조</SelectItem>
          <SelectItem value="JoseonPalace">궁서체</SelectItem>
          <SelectItem value="Yeongwol">영월체</SelectItem>
          <SelectItem value="NanumSquare">나눔스퀘어</SelectItem>
          <SelectItem value="RoundedFixedsys">둥근모꼴+ Fixedsys</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
