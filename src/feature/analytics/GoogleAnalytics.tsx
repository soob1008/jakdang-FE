"use client";

import { pageView } from "@/lib/ga/gtag";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryString = searchParams.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    pageView(url);
  }, [pathname, searchParams]);

  return null;
}
