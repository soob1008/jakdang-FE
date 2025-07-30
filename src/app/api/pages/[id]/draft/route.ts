import { createSupabaseServerClient } from "@/lib/supabase/server";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { createDefaultBlock } from "@/feature/admin/block/utils";
import { Block, BlockType } from "@/feature/admin/types";
import { revalidateTag } from "next/cache";

// 요청 본문에서 type만 받음
const BlockCreateSchema = z.object({
  type: z.string(),
});

// 블럭 생성 API
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  const pageId = params.id;

  // 요청 본문 파싱
  const body = await req.json();
  const parsed = BlockCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "type is required" }, { status: 400 });
  }

  const type = parsed.data.type as BlockType;
  const newBlock = createDefaultBlock(type);

  // 기존 blocks_draft 조회
  const { data, error } = await supabase
    .from("pages")
    .select("blocks_draft")
    .eq("id", pageId)
    .single();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const updatedBlocks = [...(data?.blocks_draft ?? []), newBlock];

  // 업데이트
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
  id: z.string(), // 수정할 블록의 id
  data: z.record(z.any()), // 수정할 데이터 (블록 전체)
});

// 블럭 수정 API
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  const pageId = params.id;
  const body = await req.json();

  const parsed = BlockUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { id, data: updatedBlock } = parsed.data;

  const { data, error } = await supabase
    .from("pages")
    .select("blocks_draft")
    .eq("id", pageId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const newBlocks = (data.blocks_draft ?? []).map((block: Block) =>
    block.id === id ? { ...block, ...updatedBlock } : block
  );

  const { error: updateError } = await supabase
    .from("pages")
    .update({ blocks_draft: newBlocks, updated_at: new Date().toISOString() })
    .eq("id", pageId);

  if (updateError) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ message: "Block updated", block: updatedBlock });
}

const BlockDeleteSchema = z.object({
  id: z.string(), // 삭제할 블록 id
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  const pageId = params.id;
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

  revalidateTag("page");

  return NextResponse.json({ message: "Block deleted" });
}
