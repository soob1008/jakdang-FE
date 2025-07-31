import { createClient } from "@/lib/supabase/client";
import { IMAGE_BUCKET_NAME } from "@/lib/const";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
}

async function request<TResponse, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const { body, headers = {}, method = "GET" } = options;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "API 요청 실패");
  }

  return res.json() as Promise<TResponse>;
}

export const apiClient = {
  get: <TResponse>(url: string, headers?: HeadersInit) =>
    request<TResponse>(url, { method: "GET", headers }),

  post: <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    headers?: HeadersInit
  ) => request<TResponse, TBody>(url, { method: "POST", body, headers }),

  put: <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    headers?: HeadersInit
  ) => request<TResponse, TBody>(url, { method: "PUT", body, headers }),

  patch: <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    headers?: HeadersInit
  ) => request<TResponse, TBody>(url, { method: "PATCH", body, headers }),

  delete: <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    headers?: HeadersInit
  ) => request<TResponse, TBody>(url, { method: "DELETE", body, headers }),
};

export async function uploadImage(file: File, userId: string) {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop()?.toLowerCase();
  const filePath = `/${userId}/${Date.now()}/${fileExt || "image"}`;

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
