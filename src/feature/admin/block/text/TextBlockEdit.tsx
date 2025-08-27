"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import LexicalEditor from "@/components/editor/LexicalEditor";

export default function TextBlockEdit({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data`;

  return (
    <div className="space-y-4">
      <FormField
        name={`${namePrefix}.content`}
        render={() => (
          <FormItem>
            <FormLabel>내용</FormLabel>
            <FormControl>
              <LexicalEditor name={`${namePrefix}.content`} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
