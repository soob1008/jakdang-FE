"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function TextBlockEdit({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data`;

  return (
    <div className="space-y-6">
      <FormField
        name={`${namePrefix}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>제목</FormLabel>
            <FormControl>
              <Input placeholder="제목을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 텍스트 입력 */}
      <FormField
        name={`${namePrefix}.content`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>내용</FormLabel>
            <FormControl>
              <Textarea placeholder="내용을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
