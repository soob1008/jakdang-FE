import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

// 로그인 요청 함수
export async function loginWithMagicLink(email: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm`,
    },
  });

  if (error) {
    toast("로그인 요청에 실패했습니다.");
  }

  return error;
}

export async function duplicateCheck(userId: string, slug: string) {
  const supabase = createClient();

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
