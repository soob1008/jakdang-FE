// lib/api/serverFetch.ts
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchServer<TResponse>(
  input: string,
  init?: RequestInit
): Promise<TResponse> {
  const headersList = await headers();
  const cookie = headersList.get("cookie") ?? "";

  const res = await fetch(`${baseUrl}${input}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      cookie,
    },
    next: init?.next,
    cache: init?.cache ?? undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API 요청 실패");
  }

  return res.json();
}
