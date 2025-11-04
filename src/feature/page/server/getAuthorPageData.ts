import { getAuthorBySlug } from "@/entities/author/api/getAuthorBySlug";
import { getPublishedPageBySlug } from "@/entities/page/api/getPublishedPageBySlug";
import { decodeAuthorSlug } from "@/entities/page/model/slug";
import type { Author } from "@/entities/author/model/types";
import type { Page } from "@/entities/page/model/types";
import { notFound } from "next/navigation";

export type AuthorPageServerData = {
  slug: string;
  author: Author;
  page: Page;
};

export async function getAuthorPageData(
  idParam: string
): Promise<AuthorPageServerData> {
  const slug = decodeAuthorSlug(idParam);

  if (!slug) {
    notFound();
  }

  const [author, page] = await Promise.all([
    getAuthorBySlug(slug),
    getPublishedPageBySlug(slug),
  ]);

  return { slug, author, page };
}
