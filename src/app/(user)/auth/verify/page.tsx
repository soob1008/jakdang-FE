"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) return;

    (async () => {
      try {
        const res = await fetch(`/auth/verify?token=${token}`);

        console.log(res);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error during verification:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
      }
    })();
  }, []);

  return <div>토큰: {searchParams.get("token")}</div>;
}
