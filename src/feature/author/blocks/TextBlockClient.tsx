"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { lexicalJsonToHtml } from "@/shared/lib/editor/lexical";

export default function TextBlockClient({ content }: { content: string }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (!content) return;
    const converted = lexicalJsonToHtml(content);
    const safe = DOMPurify.sanitize(converted);
    setHtml(safe);
  }, [content]);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
