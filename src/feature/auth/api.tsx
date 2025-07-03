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

export async function duplicateCheck(userId: string, slug: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    toast.error("중복 확인 중 오류가 발생했습니다.");
    return { exists: false, error };
  }

  // 같은 slug가 있고, 그게 다른 유저의 것이라면 중복
  const exists = data !== null && data.id !== userId;

  return { exists, error: null };
}

export async function updateUserSlug(userId: string, slug: string) {
  const { error } = await supabase
    .from("users")
    .update({ slug })
    .eq("id", userId)
    .throwOnError();

  if (error) {
    toast.error("주소 저장에 실패했어요.");
    return { error };
  }

  return { error };
}
