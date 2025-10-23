import { createCommand } from "lexical";
export type InsertImagePayload = {
  file: File;
};

export const INSERT_IMAGE_COMMAND = createCommand<InsertImagePayload>(
  "EDITOR_INSERT_IMAGE"
);
