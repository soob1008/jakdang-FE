// app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getUser, createUser } from "@/feature/auth/api";
import { toast } from "sonner";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("로그인 실패 ");
        router.replace("/auth/login");
      }

      const user = session.user;

      // users 테이블에서 유저정보 조회
      const { data: userData, error: userError } = await getUser(user.id);

      // 최초 로그인 시 유저 정보가 없으면
      if (userError && userError.code === "PGRST116") {
        if (!user.email) {
          toast("유저 이메일 정보가 없습니다.");
          router.replace("/auth/login");
          return;
        }

        // 유저 정보 등록
        const { error: createUserError } = await createUser({
          id: user.id,
          email: user.email,
        });

        if (createUserError) {
          toast(`유저 정보 등록 실패: ${createUserError.message}`);
          router.replace("/auth/login");
          return;
        }

        router.replace("/set-slug");
        return;
      }

      if (!userData?.slug) {
        // 최초 닉네임 설정이 되어있지 않으면 닉네임 설정 페이지로 이동
        router.replace("/set-slug");
      } else {
        router.replace(`/profile/@${userData.slug}`);
      }
    };

    handleLogin();
  }, [router]);

  return <p className="text-center mt-20">로그인 처리 중입니다...</p>;
}
