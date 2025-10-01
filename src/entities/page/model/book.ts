import { Block, BlockDataBook } from "@/entities/page/model/types";

export type PageBookMetadata = {
  hasBookBlock: boolean;
  title: string | null;
  description: string | null;
  author: string | null;
  publisher: string | null;
  thumbnailPath: string | null;
};

const DEFAULT_BOOK_METADATA: PageBookMetadata = {
  hasBookBlock: false,
  title: null,
  description: null,
  author: null,
  publisher: null,
  thumbnailPath: null,
};

export function extractBookMetadata(blocks: Block[] | undefined): PageBookMetadata {
  if (!blocks?.length) {
    return DEFAULT_BOOK_METADATA;
  }

  const bookBlock = blocks.find(
    (block): block is Block & { data: BlockDataBook } => block.type === "book"
  );

  if (!bookBlock || !bookBlock.data) {
    return DEFAULT_BOOK_METADATA;
  }

  const bookData = bookBlock.data;

  const info =
    bookData.mode === "search"
      ? bookData.search
      : bookData.mode === "manual"
      ? bookData.manual
      : null;

  return {
    hasBookBlock: true,
    title: info?.title ?? null,
    description: info?.description ?? null,
    author: info?.author ?? null,
    publisher: info?.publisher ?? null,
    thumbnailPath: bookData.thumbnail || null,
  };
}
