import type { Author } from "@/entities/author/model/types";
import type { Block, Page, BlockDataBook } from "@/entities/block/model/types";

export type BackgroundVM =
  | { mode: "color"; color: string }
  | { mode: "gradient"; start: string; end: string }
  | { mode: "image"; image: string | null };

export type SeoVM = {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
};

export type AuthorPageVM = {
  displayName: string;
  profile?: Author["profile_published"];
  blocks: Block[];
  bg: BackgroundVM;
  seo: SeoVM;
};

export function buildAuthorPageVM(author: Author, page: Page | null) {
  const displayName = author?.display_name ?? "작가";

  // 배경
  const s = page?.style_published;

  const bg: BackgroundVM = () => {
    if (s?.background_mode === "gradient") {
      return {
        mode: "gradient",
        start: s?.gradient_start,
        end: s?.gradient_end,
      };
    } else if (s?.background_mode === "image") {
      return { mode: "image", image: s?.background_image_url };
    }

    return { mode: "color", color: s?.background_color };
  };

  // 책 메타
  const book = page?.blocks_published.find((b) => b.type === "book");
  const bookInfo = extractBookInfo(book?.data as BlockDataBook | null);

  // SEO
  const seoTitle = book
    ? `${bookInfo?.title ?? "책"} - ${displayName}님의 작가 페이지`
    : `${displayName}님의 작가 페이지`;

  const description =
    bookInfo?.description ?? `${displayName}님의 작품과 소식을 만나보세요.`;

  const ogImage =
    bookInfo?.thumbnail ||
    author?.profile_published?.avatar_url ||
    "https://jakdang-storage.s3.ap-northeast-2.amazonaws.com/default/og-image.png";

  return {
    displayName,
    profile: author.profile_published,
    blocks: page?.blocks_published || [],
    bg,
    seo: {
      title: seoTitle,
      description,
      keywords: [
        bookInfo?.title || "책",
        displayName,
        bookInfo?.author || "저자",
        bookInfo?.publisher || "출판사",
      ],
      ogImage,
    },
  };
}

function extractBookInfo(data: BlockDataBook | null) {
  if (!data) return null;

  const { mode, search, manual } = data;

  type BookInfo = {
    title?: string;
    author?: string;
    publisher?: string;
    description?: string;
  };

  let bookInfo: BookInfo | null = null;

  if (mode === "search") {
    bookInfo = search as BookInfo;
  } else if (mode === "manual") {
    bookInfo = manual as BookInfo;
  }

  return bookInfo;
}
