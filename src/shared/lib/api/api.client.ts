"use client";

// import { createClient } from "@/shared/lib/supabase/client";
// import { IMAGE_BUCKET_NAME } from "@/shared/lib/const";
import { getCookie } from "@/shared/lib/utils";

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
      "X-CSRFToken": getCookie("csrftoken") || "",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    if (res.status === 403) {
      throw new Error("AUTH_EXPIRED");
    }

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

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/media/upload/image", {
    method: "POST",
    body: formData,
    headers: {
      "X-CSRFToken": getCookie("csrftoken") || "",
    },
    credentials: "include",
  });

  const data = await res.json();
  return { imagePath: data.path };
}

// export async function logout() {
//   await fetch("/api/auth/logout", {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       "X-CSRFToken": getCookie("csrftoken") || "",
//     },
//   });
//   window.dispatchEvent(new Event("session-expired"));
//   throw new Error("세션이 만료되었습니다. 다시 로그인 해주세요.");
//   location.href = "/auth/login";
// }

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
