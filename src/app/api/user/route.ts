import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// GET /api/user
export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ user: null });
  }

  const userId = user.id;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (userError) {
    return NextResponse.json(
      { error: "유저 정보를 불러오지 못했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({ user: userData });
}

// DELETE /api/user
export async function DELETE() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user.id;

  // 1. users 테이블 삭제
  const { error: userDeleteError } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (userDeleteError) {
    return NextResponse.json(
      { error: "유저 삭제에 실패했습니다." },
      { status: 500 }
    );
  }

  await supabase.auth.signOut();

  // 3. Supabase 인증 계정도 삭제 (서버 키 필요 - 보안상 별도 백엔드 또는 Edge function에서 권장)
  // 예시: Supabase Admin API 사용 (서버 전용 키 필요)
  const authDeleteRes = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`,
      },
    }
  );

  if (!authDeleteRes.ok) {
    return NextResponse.json({ error: "Auth 계정 삭제 실패" }, { status: 500 });
  }

  return NextResponse.json({ message: "회원이 탈퇴되었습니다." });
}
