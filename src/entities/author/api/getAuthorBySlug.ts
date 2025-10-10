"use server";

import { fetchServerAPI } from "@/shared/lib/api/api.server";
import { Author } from "@/entities/author/model/types";

export async function getAuthorBySlug(slug: string) {
  return fetchServerAPI<Author>(`/users/author/${slug}`);
}

