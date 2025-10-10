"use server";

import { fetchServerAPI } from "@/shared/lib/api/api.server";
import { Page } from "@/entities/page/model/types";

export async function getPublishedPageBySlug(slug: string) {
  return fetchServerAPI<Page>(`/pages/author/${slug}`);
}

