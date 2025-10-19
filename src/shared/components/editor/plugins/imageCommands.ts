import { createCommand } from "lexical";
import type { NodeKey } from "lexical";
import type { ImageAlign } from "../node/ImageNode";

export type InsertImagePayload = {
  file: File;
};

export type UpdateImagePayload = {
  nodeKey: NodeKey;
  width?: number;
  align?: ImageAlign;
};

export const INSERT_IMAGE_COMMAND = createCommand<InsertImagePayload>(
  "EDITOR_INSERT_IMAGE"
);

export const UPDATE_IMAGE_COMMAND = createCommand<UpdateImagePayload>(
  "EDITOR_UPDATE_IMAGE"
);
