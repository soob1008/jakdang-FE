"use client";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/shared/ui/form";
import LexicalEditor from "@/shared/components/editor/LexicalEditor";

export default function TextBlockEdit({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data`;

  return (
    <div className="space-y-4 border-l border-r border-b">
      <FormField
        name={`${namePrefix}.content`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <LexicalEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="내용을 입력하세요"
                height={320}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
