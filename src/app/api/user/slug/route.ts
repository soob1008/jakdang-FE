import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";

const bodySchema = z.object({
  slug: z
    .string()
    .min(5, "5자 이상 입력해주세요.")
    .max(20, "20자 이하로 입력해주세요.")
    .regex(/^[a-z0-9]+$/, "영문 소문자 또는 숫자만 사용할 수 있어요."),
});

// PATCH /api/user/slug
export async function PATCH(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: sessionData } = await supabase.auth.getUser();

  if (!sessionData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = sessionData.user.id;
  const body = await req.json();
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { slug } = parsed.data;

  // 중복 확인
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("slug", slug)
    .neq("id", userId)
    .maybeSingle();

  if (existingUser) {
    return NextResponse.json(
      { error: "이미 사용 중인 주소입니다." },
      { status: 409 }
    );
  }

  // 사용자 정보 업데이트
  const { error: userUpdateError } = await supabase
    .from("users")
    .update({ slug })
    .eq("id", userId);

  if (userUpdateError) {
    return NextResponse.json(
      { error: "사용자 업데이트 실패" },
      { status: 500 }
    );
  }

  // 연결된 페이지 slug도 함께 업데이트
  const { error: pageUpdateError } = await supabase
    .from("pages")
    .update({ slug })
    .eq("user_id", userId);

  if (pageUpdateError) {
    console.error("페이지 slug 업데이트 실패:", pageUpdateError.message);
  }

  return NextResponse.json({ message: "slug 업데이트 완료", slug });
}
