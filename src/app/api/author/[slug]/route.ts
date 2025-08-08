// app/api/author/[slug]/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: { slug: string } }) {
  let { slug } = ctx.params;
  slug = decodeURIComponent(slug);
  slug = slug.startsWith("@") ? slug.slice(1) : slug;

  const supabase = await createSupabaseServerClient();

  // 1) slug로 user 조회
  const { data: user, error: userError } = await supabase
    .from("users")
    .select(
      `
      id, slug, display_name, profile_published
    `
    )
    .eq("slug", slug)
    .maybeSingle();

  if (userError) {
    console.error("[author:get] userError:", userError);
    return NextResponse.json({ error: "사용자 조회 실패" }, { status: 500 });
  }
  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // 2) user.id로 pages 조회 (활성 1개만)
  const { data: pages, error: pagesError } = await supabase
    .from("pages")
    .select(`id, user_id, blocks_published, updated_at`)
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1);

  if (pagesError) {
    console.warn("[author:get] pagesError:", pagesError);
  }

  const page = pages?.[0] ?? null;

  return NextResponse.json(
    { user, page },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
