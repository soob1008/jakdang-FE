import { fetchServerAPI } from "@/shared/lib/api/api.server";
import { Author } from "@/entities/author/model/types";

export async function getSessionUser(): Promise<Author | null> {
  try {
    return await fetchServerAPI<Author>("/users/me");
  } catch {
    return null;
  }
}

