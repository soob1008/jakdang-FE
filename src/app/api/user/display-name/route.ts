// src/app/api/user/display-name/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";

const bodySchema = z.object({
  display_name: z
    .string()
    .min(1, "이름을 입력해주세요.")
    .max(50, "이름은 50자 이내여야 합니다."),
});

export async function PATCH(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: sessionData } = await supabase.auth.getUser();

  if (!sessionData?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = sessionData.user.id;
  const body = await req.json();
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { display_name } = parsed.data;

  const { error } = await supabase
    .from("users")
    .update({ display_name })
    .eq("id", userId);

  if (error) {
    return NextResponse.json(
      { error: "사용자 이름 업데이트 실패" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "이름이 성공적으로 업데이트되었습니다",
    display_name,
  });
}
