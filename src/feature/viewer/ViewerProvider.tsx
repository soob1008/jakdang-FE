// components/ViewerProvider.tsx
"use client";

import { useEffect } from "react";
import { getOrCreateViewerId } from "@/shared/lib/viewer";

export function ViewerProvider() {
  useEffect(() => {
    getOrCreateViewerId();
  }, []);

  return null;
}
