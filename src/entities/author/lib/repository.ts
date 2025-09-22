"use server";

import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { AuthorTag } from "@/entities/author/model/types";

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

export async function getAuthor(slug: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("users")
    .select(
      `
    *,
    user_tags(*),
    user_links(*),
    user_works(*),
    user_sns(*)
  `
    )
    .eq("slug", slug)
    .single();

  return { user: data, error };
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
  tagline?: string;
  bio?: string;
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
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("사용자 태그 조회 실패:");
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
    console.error("주소 저장에 실패했어요.");
    return { error };
  }

  return { error };
}

export async function updateUserTags(userId: string, tags: AuthorTag[]) {
  const supabase = await createSupabaseServerClient();

  // 1. 기존 태그 조회
  const { data: existingTags = [], error: fetchError } = await supabase
    .from("user_tags")
    .select("tag")
    .eq("user_id", userId);

  if (fetchError) {
    console.error("기존 태그 조회 오류:", fetchError);
    return { error: fetchError };
  }

  const incomingTagSet = new Set(tags.map((t) => t.tag));
  const existingTagSet = new Set(existingTags?.map((t) => t.tag));

  // 2. 삭제할 태그 계산
  const tagsToDelete = [...existingTagSet].filter(
    (tag) => !incomingTagSet.has(tag)
  );

  if (tagsToDelete.length > 0) {
    const { error: deleteError } = await supabase
      .from("user_tags")
      .delete()
      .eq("user_id", userId)
      .in("tag", tagsToDelete);

    if (deleteError) {
      console.error("태그 삭제 오류:", deleteError);
      return { error: deleteError };
    }
  }

  // 3. 삽입할 태그 계산
  const tagsToInsert = tags
    .filter((t) => !existingTagSet.has(t.tag))
    .map((t) => ({
      id: crypto.randomUUID(),
      user_id: userId,
      tag: t.tag,
    }));

  if (tagsToInsert.length > 0) {
    const { error: insertError } = await supabase
      .from("user_tags")
      .insert(tagsToInsert);

    if (insertError) {
      console.error("태그 저장 오류:", insertError);
      return { error: insertError };
    }
  }

  revalidatePath(`/profile`);
  return { error: null };
}

// SNS
export async function getUserSNS(userId: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("user_sns")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("SNS 정보 조회 실패:", error);
    return { data: null, error };
  }

  return { socials: data, error: null };
}

type UpdatableSNSData = {
  platform?: string;
  url?: string;
  is_active?: boolean;
};

export async function updateUserSNS(
  userId: string,
  data: UpdatableSNSData,
  id?: string
) {
  const supabase = await createSupabaseServerClient();

  if (id) {
    console.log("SNS 수정 요청:", { userId, data, id });
    const { error } = await supabase
      .from("user_sns")
      .update(data)
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return { error };
    }

    revalidatePath(`/profile`);
    return { error: null };
  } else {
    const { error } = await supabase.from("user_sns").insert({
      id: crypto.randomUUID(),
      user_id: userId,
      platform: data.platform,
      url: data.url,
    });

    if (error) {
      return { error };
    }

    revalidatePath(`/profile`);
    return { error: null };
  }
}

export async function deleteUserSNS(id: string, userId: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("user_sns")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("SNS 삭제 실패:", error);
    throw new Error("SNS 삭제에 실패했습니다.");
  }

  revalidatePath(`/profile`);
  return { error: null };
}

// 외부 링크
export async function getUserLinks(userId: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("user_links")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("링크 정보 조회 실패:", error);
    return { links: null, error };
  }

  return { links: data, error: null };
}

export async function updateUserLinks(
  userId: string,
  data: { title?: string; url?: string; is_active?: boolean },
  id?: string
) {
  const supabase = await createSupabaseServerClient();

  if (id) {
    const { error } = await supabase
      .from("user_links")
      .update(data)
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return { error };
    }

    revalidatePath(`/profile`);
    return { error: null };
  } else {
    const { error } = await supabase.from("user_links").insert({
      id: crypto.randomUUID(),
      user_id: userId,
      title: data.title,
      url: data.url,
    });

    if (error) {
      return { error };
    }

    revalidatePath(`/profile`);
    return { error: null };
  }
}

export async function deleteUserLink(id: string, userId: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("user_links")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("링크 삭제 실패:", error);
    return { error: new Error("링크 삭제에 실패했습니다.") };
  }

  revalidatePath(`/profile`);
  return { error: null };
}

// 작가 작품
export async function getUserWorks(userId: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("user_works")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("작가 작품 조회 실패:", error);
    return { works: null, error };
  }
  return { works: data, error: null };
}

export async function updateUserWorks(
  userId: string,
  data: {
    title?: string;
    description?: string;
    image_url?: string;
    url?: string;
    is_active?: boolean;
    is_representative?: boolean;
  },
  id?: string
) {
  const supabase = await createSupabaseServerClient();

  if (id) {
    const { error } = await supabase
      .from("user_works")
      .update(data)
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return { error };
    }

    revalidatePath(`/profile`);
    return { error: null };
  } else {
    const { error } = await supabase.from("user_works").insert({
      id: crypto.randomUUID(),
      user_id: userId,
      ...data,
    });

    if (error) {
      return { error };
    }

    revalidatePath(`/profile`);
    return { error: null };
  }
}

export async function deleteUserWork(id: string, userId: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("user_works")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("작품 삭제 실패:", error);
    return { error: new Error("작품 삭제에 실패했습니다.") };
  }

  revalidatePath(`/profile`);
  return { error: null };
}
