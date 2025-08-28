"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { useFormContext } from "react-hook-form";
import { ToolbarPlugin } from "./ToolbarPlugin";
import { TextNode } from "lexical";
import { CustomTextNode } from "./CustomTextNode";

interface LexicalEditorProps {
  name: string; // RHF 필드명
  placeholder?: string;
}

export default function LexicalEditor({
  name,
  placeholder,
}: LexicalEditorProps) {
  const { setValue, watch } = useFormContext();
  const content = watch(name);

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
    ],

    editorState: content || undefined,
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <ToolbarPlugin />
      <div className="border p-2 bg-white relative">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[150px] outline-none p-2" />
          }
          placeholder={
            <div className="text-gray-400 absolute top-4 left-4 pointer-events-none text-sm">
              {placeholder || "텍스트를 입력하세요."}
            </div>
          }
          ErrorBoundary={(error) => {
            console.error(error);
            return <div>에디터에 오류가 발생했습니다.</div>;
          }}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const json = JSON.stringify(editorState);
              setValue(name, json, { shouldDirty: true });
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
}
