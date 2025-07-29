import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function POST(req: Request) {
  const supabase = createClient();

  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "아이디가 없습니다." }, { status: 400 });
  }

  // 기존 페이지 있는지 확인
  const { data: existingPages, error: fetchError } = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", userId)
    .limit(1);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (existingPages.length > 0) {
    // 이미 페이지가 존재하는 경우
    return NextResponse.json(
      { message: "이미 페이지가 존재합니다." },
      { status: 200 }
    );
  }

  const { data: newPage, error: createError } = await supabase
    .from("pages")
    .insert({
      id: crypto.randomUUID(),
      user_id: userId,
      title: "내 페이지",
      is_public: true,
      blocks: [],
      style: {
        backgroundColor: "#ffffff",
        textColor: "#000000",
      },
    })
    .select("*");

  if (createError || !newPage || newPage.length === 0) {
    return NextResponse.json(
      { error: createError ? createError.message : "페이지 생성 실패" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "페이지가 성공적으로 생성되었습니다.", page: newPage[0] },
    { status: 201 }
  );
}
