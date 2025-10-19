"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  COMMAND_PRIORITY_EDITOR,
  $getNodeByKey,
  $createParagraphNode,
  $createTextNode,
  $isElementNode,
} from "lexical";
import { insertImageNode, $isImageNode } from "../node/ImageNode";
import {
  INSERT_IMAGE_COMMAND,
  UPDATE_IMAGE_COMMAND,
  type InsertImagePayload,
  type UpdateImagePayload,
} from "./imageCommands";

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

    const unregisterUpdate = editor.registerCommand(
      UPDATE_IMAGE_COMMAND,
      (payload: UpdateImagePayload) => {
        if (!payload?.nodeKey) return false;
        editor.update(() => {
          const node = $getNodeByKey(payload.nodeKey);
          if (!$isImageNode(node)) return;
          if (payload.width !== undefined) {
            node.setWidth(payload.width);
          }
          if (payload.align !== undefined) {
            node.setAlign(payload.align);

            if (
              payload.align === "text-left" ||
              payload.align === "text-right"
            ) {
              if (node.getWidth() > 60) {
                node.setWidth(60);
              }

              let nextSibling = node.getNextSibling();

              if (!$isElementNode(nextSibling)) {
                const paragraph = $createParagraphNode();
                paragraph.append($createTextNode(""));
                node.insertAfter(paragraph);
                nextSibling = paragraph;
              }

              if ($isElementNode(nextSibling)) {
                nextSibling.selectStart();
              }
            }
          }
        });
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );

    return () => {
      unregisterInsert();
      unregisterUpdate();
    };
  }, [editor, upload]);

  return null;
}
