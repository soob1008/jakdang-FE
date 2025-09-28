"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAPI } from "@/shared/lib/api/api.server";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      try {
        const res = await fetchAPI<{ user: string; is_new_user: boolean }>(
          `/auth/verify?token=${token}`
        );

        if (!res.user) return;

        router.push(res.is_new_user ? "/auth/set-slug" : "/admin/compose");
      } catch (err) {
        const message = err instanceof Error ? err.message : "알 수 없는 오류";
        console.error("Error during verification:", message);
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>로그인 확인 중...</p>
    </div>
  );
}
