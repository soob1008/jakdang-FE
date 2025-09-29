"use client";

import { createClient } from "@/shared/lib/supabase/client";
import { IMAGE_BUCKET_NAME } from "@/shared/lib/const";
import { getCookie } from "../utils";

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

  const res = await fetch(`/api${url}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 403) {
    await logout();
  }

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

  return { imagePath, error: null };
}

export async function logout() {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken") || "",
    },
  });
  window.dispatchEvent(new Event("session-expired"));
  throw new Error("세션이 만료되었습니다. 다시 로그인 해주세요.");
  location.href = "/auth/login";
}

// export async function fetchClientAPI<TResponse>(
//   input: string,
//   init?: RequestInit
// ): Promise<TResponse> {
//   const res = await fetch(`/api${input}`, {
//     ...init,
//     method: init?.method || "GET",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       ...(init?.headers || {}),
//     },
//   });

//   let data = null;
//   try {
//     data = await res.json();
//   } catch {
//     data = null;
//   }

//   if (res.status === 403) {
//     await fetch("/api/auth/logout", { method: "POST", credentials: "include" });

//     window.dispatchEvent(new Event("session-expired"));
//     throw new Error("세션이 만료되었습니다. 다시 로그인 해주세요.");
//   }

//   if (!res.ok) {
//     const message = data?.error || data?.message || "알 수 없는 오류";
//     throw new Error(message);
//   }

//   return data as TResponse;
// }
