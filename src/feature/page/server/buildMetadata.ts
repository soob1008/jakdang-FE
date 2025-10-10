import type { Metadata } from "next";
import type { Author } from "@/entities/author/model/types";
import type { Page } from "@/entities/page/model/types";
import { extractBookMetadata } from "@/entities/page/model/book";

type AuthorPageMetadataParams = {
  author: Author;
  page: Page;
};

export function buildAuthorPageMetadata({
  author,
  page,
}: AuthorPageMetadataParams): Metadata {
  const displayName = author?.display_name ?? "작가";
  const defaultDescription = `${displayName}님의 작품과 소식을 만나보세요.`;
  const { blocks_published: blocks } = page ?? {};

  const { hasBookBlock, title, description, author: bookAuthor, publisher, thumbnailPath } =
    extractBookMetadata(blocks);

  const resolvedDescription = description ?? defaultDescription;
  const keywords = [title ?? "책", displayName ?? "작가", bookAuthor ?? "저자", publisher ?? "출판사"];

  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";
  const thumbnail = thumbnailPath
    ? `${imageBase}${thumbnailPath}`
    : `${imageBase}${author?.profile_published?.avatar_url || "/og-jakdang.jpg"}`;

  const pageTitle = hasBookBlock
    ? `${title || "책"} - ${displayName}님의 작가 페이지`
    : `${displayName}님의 작가 페이지`;

  const openGraphTitle = title || `${displayName}님의 작가 페이지`;

  return {
    title: pageTitle,
    keywords,
    description: resolvedDescription,
    openGraph: {
      title: openGraphTitle,
      description: resolvedDescription,
      images: thumbnail,
    },
  };
}

