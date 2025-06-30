import { supabase } from "@/lib/supabase";

// 로그인 요청 함수
export async function loginWithMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error("로그인 요청 실패", error.message);
    alert("로그인 요청에 실패했습니다.");
  } else {
    alert("메일함을 확인해주세요! 로그인 링크를 보냈습니다.");
  }

  return error;
}
