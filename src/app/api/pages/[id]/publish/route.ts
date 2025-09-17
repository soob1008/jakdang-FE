import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createSupabaseServerClient();
  const { id: pageId } = await params;
  const { blocks_draft, profile_draft, style_draft } = await req.json();

  // pages 테이블 업데이트 (blocks_published)
  const { error: pageError } = await supabase
    .from("pages")
    .update({ blocks_published: blocks_draft, style_published: style_draft })
    .eq("id", pageId);

  if (pageError) {
    return NextResponse.json({ error: "페이지 반영 실패" }, { status: 500 });
  }

  // users 테이블 업데이트 (profile_published)
  const { data: pageData } = await supabase
    .from("pages")
    .select("user_id")
    .eq("id", pageId)
    .single();

  const { error: userError } = await supabase
    .from("users")
    .update({ profile_published: profile_draft })
    .eq("id", pageData?.user_id);

  if (userError) {
    return NextResponse.json({ error: "프로필 반영 실패" }, { status: 500 });
  }

  return NextResponse.json({ message: "발행 완료" });
}
