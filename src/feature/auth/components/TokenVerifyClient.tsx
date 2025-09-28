"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/shared/lib/api/api.server";

export default function VerifyPageClient({ token }: { token?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      try {
        const res = await fetchAPI<{ user: string; is_new_user: boolean }>(
          `/auth/verify?token=${token}`
        );

        if (res.user) {
          router.push(res.is_new_user ? "/auth/set-slug" : "/admin/compose");
        }
      } catch (err) {
        console.error(err);
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
