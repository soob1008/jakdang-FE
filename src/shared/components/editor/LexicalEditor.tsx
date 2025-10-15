"use client";

import { useEffect, useMemo, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { ToolbarPlugin } from "./ToolbarPlugin";
import { TextNode, $getRoot } from "lexical";
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
  const editorConfig = useMemo(() => {
    return {
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
    };
  }, []);

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
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const json = JSON.stringify(editorState);
              onChange?.(json);
            });
          }}
        />
        <ImageUploadPlugin upload={uploadHandler} />
        <InitialValuePlugin value={value} />
      </div>
    </LexicalComposer>
  );
}

function InitialValuePlugin({ value }: { value?: string }) {
  const [editor] = useLexicalComposerContext();
  const lastValueRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!value) {
      if (!lastValueRef.current) return;
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        root.selectStart();
      });
      lastValueRef.current = undefined;
      return;
    }

    if (lastValueRef.current === value) return;

    try {
      const parsed = editor.parseEditorState(value);
      editor.setEditorState(parsed);
      lastValueRef.current = value;
    } catch (error) {
      console.error("Failed to parse editor state", error);
    }
  }, [editor, value]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const serialized = JSON.stringify(editorState);
      lastValueRef.current = serialized;
    });
  }, [editor]);

  return null;
}
