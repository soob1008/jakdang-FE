import { Block } from "@/entities/page/model/types";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const BlockSchema = z.object({
  block: z.object({
    id: z.string(),
    type: z.string(),
    data: z.any(),
    name: z.string().optional(),
    is_active: z.boolean().optional(),
  }),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; blockId: string }> }
) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();
  const parsed = BlockSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid block" }, { status: 400 });
  }

  const { id: pageId, blockId } = await params;
  const { block } = parsed.data;

  const { data, error } = await supabase
    .from("pages")
    .select("blocks_draft")
    .eq("id", pageId)
    .single();

  if (error || !data?.blocks_draft) {
    console.error("Error fetching page blocks:", error);
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const updatedBlocks = (data.blocks_draft as Block[]).map((b) =>
    b.id === blockId ? { ...b, ...block } : b
  );

  const { error: updateError } = await supabase
    .from("pages")
    .update({
      blocks_draft: updatedBlocks,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pageId);

  if (updateError) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ message: "Block updated", block });
}
