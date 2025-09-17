// lib/api/serverFetch.ts
import { headers } from "next/headers";
import { notFound } from "next/navigation";

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

  if (!res.ok && res.status === 401) {
    // Unauthorized, handle as needed (e.g., redirect to login)
    throw new Error("Unauthorized access");
  }
  if (!res.ok && res.status === 404) {
    // Not Found, handle as needed (e.g., show 404 page)
    notFound();
  }
  if (!res.ok && res.status === 500) {
    // Internal Server Error, handle as needed (e.g., show error page)
    throw new Error("Internal server error");
  }

  return res.json();
}
