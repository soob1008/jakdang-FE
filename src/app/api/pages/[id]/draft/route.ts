/* 특정 페이지의 blocks_draft 값을 업데이트 */
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const BlockSchema = z.object({ blocks: z.array(z.any()) });

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createSupabaseServerClient();
  const { id: pageId } = params;

  const body = await req.json();
  const parsedBody = BlockSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("pages")
    .update({
      blocks_draft: parsedBody.data.blocks,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pageId);

  if (error) {
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Page blocks updated successfully" },
    { status: 200 }
  );
}
