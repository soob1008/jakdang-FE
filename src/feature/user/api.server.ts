"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { AuthorTag } from "@/feature/user/type";

/* 
  사용자 정보 조회 함수
  사용자 ID를 받아서 해당 사용자의 정보를 반환
  만약 사용자가 존재하지 않으면 null을 반환
  에러가 발생하면 에러 객체를 반환
  사용 예시: const { data, error } = await getUser("user-id");
*/

export async function getUser(userId: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  return { data, error };
}

export async function createUser({ id, email }: { id: string; email: string }) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("users").insert({
    id,
    email,
  });

  return { error };
}

type UpdatableUserData = {
  display_name?: string;
  slug?: string;
  image_url?: string;
  intro_text?: string;
  profile_image_url?: string;
};

export async function updateUser(id: string, data: UpdatableUserData) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("users").update(data).eq("id", id);

  if (error) {
    console.error("사용자 업데이트 실패:", error);
    return { error };
  }

  revalidatePath(`/profile`); // 해당 유저 페이지 다시 불러옴

  return { error: null };
}

export async function getUserTags(userId: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("user_tags")
    .select("id, tag")
    .eq("user_id", userId);

  if (error) {
    console.error("사용자 태그 조회 실패:", error);
    return { data: [], error };
  }

  return {
    tags: data.map((item) => ({ id: item.id, tag: item.tag })),
    error: null,
  };
}

export async function updateUserSlug(userId: string, slug: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("users")
    .update({ slug })
    .eq("id", userId)
    .throwOnError();

  if (error) {
    toast.error("주소 저장에 실패했어요.");
    return { error };
  }

  return { error };
}

export async function updateUserTags(userId: string, tags: AuthorTag[]) {
  const supabase = await createSupabaseServerClient();

  if (tags.length === 0) {
    return { error: null };
  }

  // 기존 태그 조회
  const { data: existingTags, error: fetchError } = await supabase
    .from("user_tags")
    .select("tag")
    .eq("user_id", userId);

  if (fetchError) {
    console.error("기존 태그 조회 오류:", fetchError);
    return { error: fetchError };
  }

  const existingSet = new Set(existingTags?.map((t) => t.tag));
  const uniqueNewTags = tags.filter((tag) => !existingSet.has(tag.tag));

  if (uniqueNewTags.length === 0) {
    return { error: null };
  }

  const newTags = uniqueNewTags.map((tag) => ({
    id: crypto.randomUUID(), // 임시 ID 생성
    user_id: userId,
    tag: tag.tag,
  }));

  const { error: insertError } = await supabase
    .from("user_tags")
    .insert(newTags)
    .throwOnError();

  if (insertError) {
    console.error("태그 저장 오류:", insertError);
    return { error: insertError };
  }

  revalidatePath(`/profile`);
  return { error: null };
}
