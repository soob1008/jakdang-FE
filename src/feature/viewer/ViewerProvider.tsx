// components/ViewerProvider.tsx
"use client";

import { useEffect } from "react";
import { getOrCreateViewerId } from "@/lib/viewer";

export function ViewerProvider() {
  useEffect(() => {
    getOrCreateViewerId();
  }, []);

  return null;
}
