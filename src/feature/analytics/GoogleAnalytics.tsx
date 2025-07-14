"use client";

import { pageView } from "@/lib/ga/gtag";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;

    pageView(url);
  }, [pathname, searchParams]);

  return null;
}
