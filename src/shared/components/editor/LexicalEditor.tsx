"use client";

import { useMemo, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { ToolbarPlugin } from "./ToolbarPlugin";
import { TextNode } from "lexical";
import { CustomTextNode } from "./CustomTextNode";
import { cn } from "@/shared/lib/utils";
import { uploadImage } from "@/shared/lib/api/api.client";
import { handleAction } from "@/shared/lib/api/action";
import { ImageNode } from "./node/ImageNode";
import { ImageUploadPlugin } from "./plugins/ImageUploadPlugin";

interface LexicalEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: number | string;
}

export default function LexicalEditor({
  value,
  onChange,
  placeholder,
  height = 500,
}: LexicalEditorProps) {
  const [editorState, setEditorState] = useState(value || "");

  const editorConfig = {
    namespace: "TextBlockEditor",
    theme: {
      paragraph: "mb-2",
      heading: {
        h1: "text-2xl font-bold",
        h2: "text-xl font-semibold",
      },
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
    },
    onError(error: Error) {
      console.error(error);
    },
    nodes: [
      TextNode,
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CustomTextNode,
      ImageNode, // NOTE: Custom Image Node
    ],
    editorState: editorState ? JSON.parse(editorState) : undefined,
  };

  const uploadHandler = useMemo(() => {
    return async (file: File) => {
      const result = await handleAction(() => uploadImage(file), {
        successMessage: "이미지가 업로드되었습니다.",
        errorMessage: "이미지 업로드에 실패했습니다.",
      });

      return result?.imagePath ?? null;
    };
  }, []);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <ToolbarPlugin />
      <div className="p-2 bg-white relative">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={cn("outline-none p-2", !height && "h-60")}
              style={{
                minHeight:
                  typeof height === "number"
                    ? `${height}px`
                    : height ?? undefined,
              }}
            />
          }
          placeholder={
            <div className="text-gray-400 absolute top-4 left-4 pointer-events-none text-sm">
              {placeholder || "텍스트를 입력하세요."}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />

        {/* ✅ 에디터 상태 변경 감지 */}
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const json = JSON.stringify(editorState);
              setEditorState(json);
              onChange?.(json);
            });
          }}
        />

        {/* ✅ 별도 플러그인으로 editor 접근 */}
        <ImageUploadPlugin upload={uploadHandler} />
      </div>
    </LexicalComposer>
  );
}
