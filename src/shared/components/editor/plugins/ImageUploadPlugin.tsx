"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { COMMAND_PRIORITY_EDITOR } from "lexical";
import { insertImageNode } from "../node/ImageNode";
import { INSERT_IMAGE_COMMAND, type InsertImagePayload } from "./imageCommands";

type ImageUploadPluginProps = {
  upload: (file: File) => Promise<string | null | undefined>;
};

export function ImageUploadPlugin({ upload }: ImageUploadPluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterInsert = editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: InsertImagePayload) => {
        const file = payload?.file;
        if (!file) return false;

        void (async () => {
          const imagePath = await upload(file);
          if (!imagePath) return;
          editor.update(() => {
            insertImageNode(imagePath);
          });
        })();

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    return () => {
      unregisterInsert();
    };
  }, [editor, upload]);

  return null;
}
