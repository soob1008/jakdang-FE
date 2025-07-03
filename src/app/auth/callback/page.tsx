// app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session) {
        console.error("로그인 실패 ❌", error);
        // router.replace("/auth/login");
        return;
      }

      const user = session.user;

      // 사용자 정보 조회
      //   const { data: profile, error: profileError } = await supabase
      //     .from("profiles")
      //     .select("nickname")
      //     .eq("id", user.id)
      //     .single();

      //   if (profileError) {
      //     console.error("프로필 정보 조회 실패 ❌", profileError);
      //     router.replace("/auth/login");
      //     return;
      //   }

      if (user) {
        // 최초 닉네임 설정이 되어있지 않으면 닉네임 설정 페이지로 이동
        router.replace("/set-nickname");
      } else {
        // 닉네임이 있다면 대시보드로 이동
        router.replace("/dashboard");
      }
    };

    handleLogin();
  }, [router]);

  return <p className="text-center mt-20">로그인 처리 중입니다...</p>;
}
