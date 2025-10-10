"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleAction } from "@/shared/lib/api/action";
import { apiClient } from "@/shared/lib/api/api.client";

export default function VerifyPageClient({ token }: { token?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      await handleAction(
        () =>
          apiClient.get<{ is_new_user: boolean }>(
            `/auth/verify?token=${token}`
          ),
        {
          errorMessage: "로그인에 실패했습니다. 다시 확인해주세요.",
          onError: () => {
            router.push("/auth/login");
          },
          onSuccess: (res) => {
            router.push(res.is_new_user ? "/set-slug" : "/admin/compose");
          },
        }
      );
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>로그인 확인 중...</p>
    </div>
  );
}
