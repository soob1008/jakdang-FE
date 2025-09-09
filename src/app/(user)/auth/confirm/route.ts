import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUser, createUser } from "@/feature/user/api.server";

const DEFAULT_STYLE = {
  theme_color: "#222222",
  background_mode: "color", // "color" | "image" | "gradient"
  background_color: "#ffffff",
  button_style: "rounded", // "rounded" | "sharp"
} as const;

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
  let finalUserData = userData;

  // 2. 유저 정보 없으면 생성
  if (userError?.code === "PGRST116") {
    if (!user.email) {
      console.error("사용자 이메일 정보가 없습니다.");
      return redirect("/auth/login");
    }

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

    const result = await getUser(user.id);
    finalUserData = result.data;
  }

  // 4. pages 테이블에 해당 유저 페이지가 있는지 확인하고 없으면 생성
  const { data: pages, error: pageError } = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", user.id)
    .limit(1);

  const page = pages?.[0];

  if (pageError) {
    console.error("페이지 정보를 조회하는 데 실패했습니다.", pageError.message);
    return redirect("/auth/login");
  }

  if (!page) {
    const { error } = await supabase.from("pages").insert([
      {
        id: crypto.randomUUID(),
        user_id: user.id,
        title: "내 페이지",
        is_published: false,
        theme_id: null,
        slug: finalUserData.slug,
        style_draft: DEFAULT_STYLE,
        style_published: DEFAULT_STYLE,
        blocks_draft: [],
        blocks_published: [],
      },
    ]);

    if (error) {
      console.error("페이지 생성 실패:", error.message);
      return redirect("/auth/login");
    }
  }

  // 5. slug 설정 안 돼 있으면
  if (!finalUserData?.slug) {
    return redirect("/set-slug");
  }

  // 5. 정상적으로 로그인 완료
  return redirect(`/admin/compose`);
}
