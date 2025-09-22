import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { createDefaultBlock } from "@/feature/admin/block/utils";
import { Block, BlockType } from "@/entities/block/model/types";
import { getTemplateBlocks } from "@/feature/admin/block/utils";
import { TemplateType } from "@/entities/block/model/types";

// 요청 본문에서 type만 받음
const BlockCreateSchema = z.object({
  type: z.string(),
});

// 블럭 생성 API
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params는 URL 파라미터로, 페이지 ID를 포함
): Promise<NextResponse> {
  const supabase = await createSupabaseServerClient();
  const { id: pageId } = await params;

  if (!pageId) {
    return NextResponse.json({ error: "Page ID is required" }, { status: 400 });
  }

  // 요청 본문 파싱
  const body = await req.json();
  const parsed = BlockCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "type is required" }, { status: 400 });
  }

  const type = parsed.data.type as BlockType;

  /**
   * 1) 템플릿 적용 시나리오
   * - type이 템플릿 키(예: "profile")로 들어오면 템플릿 블록 묶음을 생성
   * - 기존 blocks_draft 전부 덮어쓰기
   */
  const templateBlocks = getTemplateBlocks({
    template: type as TemplateType,
    pageId,
  });

  if (templateBlocks && templateBlocks.length > 0) {
    const { error: overwriteError } = await supabase
      .from("pages")
      .update({
        blocks_draft: templateBlocks,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pageId);

    if (overwriteError) {
      return NextResponse.json(
        { error: "Failed to apply template" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Template applied: existing blocks were replaced with the selected template.",
        replaced: true,
        blocks: templateBlocks,
      },
      { status: 200 }
    );
  }

  /**
   * 2) 일반 단일 블록 추가 시나리오
   */
  const newBlock = createDefaultBlock(type);

  const { data, error } = await supabase
    .from("pages")
    .select("blocks_draft")
    .eq("id", pageId)
    .single();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const current = Array.isArray(data?.blocks_draft) ? data!.blocks_draft : [];
  const newPosition = current.length + 1;

  const updatedBlocks = [
    ...current,
    { ...newBlock, position: newPosition, is_active: true },
  ];

  const { error: updateError } = await supabase
    .from("pages")
    .update({
      blocks_draft: updatedBlocks,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pageId);

  if (updateError) {
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Block added successfully", block: newBlock },
    { status: 200 }
  );
}

const BlockUpdateSchema = z.object({
  blocks_draft: z.array(z.any()),
});

// 블럭 수정 API
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params는 URL 파라미터로, 페이지 ID를 포함
) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();

  const parsed = BlockUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid blocks_draft format" },
      { status: 400 }
    );
  }

  const { blocks_draft } = parsed.data;
  const { id: pageId } = await params;

  if (!pageId) {
    return NextResponse.json({ error: "Page ID is required" }, { status: 400 });
  }

  const { error: updateError } = await supabase
    .from("pages")
    .update({
      blocks_draft,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pageId);

  if (updateError) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({
    message: "Blocks updated successfully",
    body,
  });
}

const BlockDeleteSchema = z.object({
  id: z.string(), // 삭제할 블록 id
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params는 URL 파라미터로, 페이지 ID를 포함
) {
  const supabase = await createSupabaseServerClient();
  const { id: pageId } = await params;
  const body = await req.json();

  const parsed = BlockDeleteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { id } = parsed.data;

  const { data, error } = await supabase
    .from("pages")
    .select("blocks_draft")
    .eq("id", pageId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const newBlocks = (data.blocks_draft ?? []).filter(
    (block: Block) => block.id !== id
  );

  const { error: updateError } = await supabase
    .from("pages")
    .update({ blocks_draft: newBlocks, updated_at: new Date().toISOString() })
    .eq("id", pageId);

  if (updateError) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

  return NextResponse.json({ message: "Block deleted" });
}
