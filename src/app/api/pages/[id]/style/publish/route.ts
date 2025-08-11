import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * POST /api/pages/[id]/publish-style
 *
 * Copies `style_draft` -> `style_published` for the given page id.
 * Returns the updated row's `id`, `style_published`, and optional timestamps.
 *
 * RLS: ensure the caller has UPDATE permission on `pages`.
 */
export async function PUT(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const pageId = (await params).id;
  if (!pageId) {
    return NextResponse.json({ error: "Missing page id" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();

  // 1) Read current draft
  const { data: page, error: fetchErr } = await supabase
    .from("pages")
    .select("id, style_draft")
    .eq("id", pageId)
    .single();

  if (fetchErr) {
    return NextResponse.json({ error: fetchErr.message }, { status: 500 });
  }
  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  // Guard: nothing to publish
  if (!page.style_draft || Object.keys(page.style_draft).length === 0) {
    return NextResponse.json(
      { error: "No draft style to publish" },
      { status: 400 }
    );
  }

  // 2) Write draft -> published
  const { data: updated, error: updateErr } = await supabase
    .from("pages")
    .update({
      style_published: page.style_draft,
      // Optional: track timestamps if your table has these columns
      // published_at: new Date().toISOString(),
      // updated_at: new Date().toISOString(),
    })
    .eq("id", pageId)
    .select("id, style_published")
    .single();

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 });
  }

  return NextResponse.json({
    id: updated.id,
    style_published: updated.style_published,
  });
}

/*
// --- Optional: single-statement approach via RPC ---
// Create this SQL function in Supabase (SQL editor):
//
// create or replace function publish_page_style(p_id uuid)
// returns setof pages as $$
//   update pages p
//   set style_published = p.style_draft,
//       updated_at = now()
//   where p.id = p_id
//   returning *;
// $$ language sql security definer;
//
// Then call it in this route instead of select+update:
// const { data, error } = await supabase.rpc('publish_page_style', { p_id: pageId });
*/
