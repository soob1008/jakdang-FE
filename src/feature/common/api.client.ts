import { createClient } from "@/lib/supabase/client";
import { IMAGE_BUCKET_NAME } from "@/lib/const";

export async function uploadImage(file: File, userId: string) {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop()?.toLowerCase();
  const filePath = `/${userId}/${Date.now()}/${fileExt || "image"}`;

  console.log("업로드할 파일 경로:", filePath);
  console.log("업로드할 파일 이름:", file.name);

  // 이미지 업로드
  const { data, error } = await supabase.storage
    .from(IMAGE_BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  console.log("업로드 결과:", data, error);
  if (error) {
    console.error("이미지 업로드 실패:", error);
    return { error };
  }

  // 상대 경로만 추출하여 리턴
  const imagePath = `/${data.path}`;

  console.log("저장할 상대 경로:", imagePath);
  return { imagePath, error: null };
}
