import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createSupabaseServerClient();

  const { id: userId } = await params;
  const { profile_draft } = await req.json();

  const { error } = await supabase
    .from("users")
    .update({ profile_draft })
    .eq("id", userId);

  if (error) {
    return new Response("Failed to update profile", { status: 500 });
  }

  return new Response("Profile updated successfully", { status: 200 });
}
