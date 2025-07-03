import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
    toast("로그인 요청에 실패했습니다.");
  }

  return error;
}

/* 
  사용자 정보 조회 함수
  사용자 ID를 받아서 해당 사용자의 정보를 반환
  만약 사용자가 존재하지 않으면 null을 반환
  에러가 발생하면 에러 객체를 반환
  사용 예시: const { data, error } = await getUser("user-id");
*/
export async function getUser(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  return { data, error };
}

export async function createUser({ id, email }: { id: string; email: string }) {
  const { error } = await supabase.from("users").insert({
    id,
    email,
  });

  return { error };
}
