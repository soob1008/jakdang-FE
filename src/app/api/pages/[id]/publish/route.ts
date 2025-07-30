import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createSupabaseServerClient();
  const { id: pageId } = await params;

  // 먼저 blocks_draft 값을 가져옵니다.
  const { data: page, error: fetchError } = await supabase
    .from("pages")
    .select("blocks_draft")
    .eq("id", pageId)
    .order("position", { ascending: true })
    .single();

  if (fetchError) {
    return NextResponse.json(
      { message: "페이지를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  // 발행 block_publish 값을 업데이트 합니다.
  const { error: publishError } = await supabase
    .from("pages")
    .update({
      blocks_published: page.blocks_draft,
      status: "published",
      published_at: new Date().toISOString(),
    })
    .eq("id", pageId);

  if (publishError) {
    console.error("Publish error:", publishError);
    return NextResponse.json(
      { message: "페이지 발행에 실패했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "페이지가 성공적으로 발행되었습니다." },
    { status: 200 }
  );
}
