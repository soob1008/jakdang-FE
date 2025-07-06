import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUser, createUser } from "@/feature/auth/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (!token_hash || !type) {
    return redirect("/error");
  }

  const supabase = await createSupabaseServerClient();
  const { error, data } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  const user = data.user;

  if (error || !user) {
    console.error("로그인에 실패했습니다. 다시 시도해주세요.");
    return redirect("/auth/login");
  }

  // 1. 기존 사용자 조회
  const { data: userData, error: userError } = await getUser(user.id);

  // 2. 유저 정보 없으면 생성
  if (userError?.code === "PGRST116") {
    if (!user.email) {
      console.error("사용자 이메일 정보가 없습니다.");
      return redirect("/auth/login");
    }

    console.log("user.id", user.id);
    console.log("user.email", user.email);

    const { error: createUserError } = await createUser({
      id: user.id,
      email: user.email,
    });

    if (createUserError) {
      console.error(
        "사용자 정보를 생성하는 데 실패했습니다.",
        createUserError.message,
        createUserError.details
      );
      return redirect("/auth/login");
    }

    return redirect("/set-slug");
  }

  // 3. 유저 조회 중 다른 에러
  if (userError) {
    console.error("사용자 정보를 조회하는 데 실패했습니다.");
    return redirect("/auth/login");
  }

  // 4. slug 설정 안 돼 있으면
  if (!userData?.slug) {
    return redirect("/set-slug");
  }

  // 5. 정상적으로 로그인 완료
  return redirect(`/profile`);
}
