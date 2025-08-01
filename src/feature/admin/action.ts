"use server";
import { revalidateTag } from "next/cache";

export async function revalidateUserInfo() {
  revalidateTag("user"); // 해당 경로를 실제 사용하는 경로로
}
