// pages/api/save-style-draft.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";

/**
 * POST /api/save-style-draft
 * { pageId: string, style: object, merge?: boolean }
 *
 * - merge=false(기본): style_draft를 전달된 style로 통째로 교체
 * - merge=true: 기존 style_draft와 얕은 병합(Object spread)
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createSupabaseServerClient();
    const body = await req.json();
    const pageId = (await params).id;
    const { style_draft, merge = false } = body ?? {};

    if (!pageId) {
      return NextResponse.json(
        { error: "pageId is required" },
        { status: 400 }
      );
    }
    if (!style_draft || typeof style_draft !== "object") {
      return NextResponse.json(
        { error: "style object is required" },
        { status: 400 }
      );
    }

    // RLS 고려: 요청자가 이 페이지를 업데이트할 수 있어야 함

    if (merge) {
      // 1) 기존 draft 조회
      const { data: existing, error: fetchErr } = await supabase
        .from("pages")
        .select("id, style_draft")
        .eq("id", pageId)
        .single();

      if (fetchErr) throw fetchErr;

      const nextDraft = { ...(existing?.style_draft ?? {}), ...style_draft };

      // 2) 병합 저장
      const { error: updateErr } = await supabase
        .from("pages")
        .update({ style_draft: nextDraft })
        .eq("id", pageId);

      if (updateErr) throw updateErr;

      return NextResponse.json({ success: true, style_draft: nextDraft });
    }

    // 교체 저장
    const { error: replaceErr } = await supabase
      .from("pages")
      .update({ style_draft })
      .eq("id", pageId);

    if (replaceErr) throw replaceErr;

    return NextResponse.json({ success: true, style_draft });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save style draft" },
      { status: 500 }
    );
  }
}
