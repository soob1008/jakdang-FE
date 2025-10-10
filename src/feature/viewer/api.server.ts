"use server";

import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function hasLikedAuthor(authorId: string, viewerId: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("viewer_likes")
    .select("id")
    .eq("author_id", authorId)
    .eq("viewer_id", viewerId)
    .maybeSingle();

  return {
    liked: !!data,
    error,
  };
}

export async function updateLikeAuthor(
  authorId: string,
  viewerId: string,
  slug: string
) {
  const supabase = await createSupabaseServerClient();

  // 1. viewer가 없으면 생성
  await supabase.from("viewer").upsert({ id: viewerId }).select();

  // 2. 이미 좋아요 눌렀는지 확인
  const { data: existing } = await supabase
    .from("viewer_likes")
    .select("id")
    .eq("author_id", authorId)
    .eq("viewer_id", viewerId)
    .maybeSingle();

  if (existing) {
    // 3. 좋아요 취소 - viewer_likes 삭제
    const { error: deleteError } = await supabase
      .from("viewer_likes")
      .delete()
      .eq("id", existing.id);

    if (deleteError) {
      console.error("Error deleting viewer like:", deleteError);
      return { error: deleteError };
    }

    // 4. users.like_count 감소
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("like_count")
      .eq("id", authorId)
      .single();

    if (fetchError || userData === null) {
      console.error("Error fetching like count:", fetchError);
      return { error: fetchError };
    }

    const newCount = Math.max((userData.like_count || 1) - 1, 0); // 0보다 작아지지 않도록

    const { error: decrementError } = await supabase
      .from("users")
      .update({ like_count: newCount })
      .eq("id", authorId);

    if (decrementError) {
      console.error("Error decrementing like count:", decrementError);
      return { error: decrementError };
    }

    revalidatePath(`/@${slug}`);
    return { liked: false };
  } else {
    // 5. 좋아요 추가 - viewer_likes 삽입
    const { error: insertError } = await supabase
      .from("viewer_likes")
      .insert({ author_id: authorId, viewer_id: viewerId });

    if (insertError) {
      console.error("Error inserting viewer like:", insertError);
      return { error: insertError };
    }

    // 6. users.like_count 증가
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("like_count")
      .eq("id", authorId)
      .single();

    if (fetchError || userData === null) {
      console.error("Error fetching like count:", fetchError);
      return { error: fetchError };
    }

    const newCount = (userData.like_count || 0) + 1;

    const { error: incrementError } = await supabase
      .from("users")
      .update({ like_count: newCount })
      .eq("id", authorId);

    if (incrementError) {
      console.error("Error incrementing like count:", incrementError);
      return { error: incrementError };
    }

    revalidatePath(`/@${slug}`);
    return { liked: true };
  }
}
