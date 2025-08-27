import { Block, BlockDataBook, PageStyle } from "@/feature/admin/types";
import Image from "next/image";
import { format } from "date-fns";
import { autoContrast } from "@/lib/utils";

interface BookBlockProps {
  block: Block;
  style: PageStyle;
}

export default function BookBlock({ block, style }: BookBlockProps) {
  if (block.is_active === false) return null;

  const { mode, search, manual, thumbnail } = block.data as BlockDataBook;
  const book = mode === "search" ? search : manual;
  const textColor = autoContrast(style?.background_color || "#ffffff");

  if (!book) return null;

  return (
    <div>
      {/* 썸네일 */}
      <div className="flex items-center justify-center">
        <div className="w-1/3 aspect-[2/3] border relative bg-gray-100 rounded overflow-hidden">
          {thumbnail ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${thumbnail}`}
              alt={book.title || "book"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* 책 정보 */}
      <div
        className={`flex-1 mt-6 text-[var(--text-color)]`}
        style={{
          ["--text-color" as string]: textColor,
        }}
      >
        <h2 className="font-bold text-xl ">{book.title}</h2>
        <div className="flex flex-col gap-1 mt-2">
          {/* 저자 & 출판사 */}
          {(book.author || book.publisher) && (
            <div className="flex items-center">
              {book.author && <p className="text-sm ">저자 : {book.author}</p>}
              {book.author && book.publisher && (
                <span className="block mx-2">|</span>
              )}
              {book.publisher && (
                <p className="text-sm ">출판사 : {book.publisher}</p>
              )}
            </div>
          )}

          {/* 발행일 & ISBN */}
          {(book.publish_date || book.isbn) && (
            <div className="flex items-center">
              {book.publish_date && (
                <p className="text-sm ">
                  발행일 : {format(new Date(book.publish_date), "yyyy-MM-dd")}
                </p>
              )}
              {book.isbn && book.publish_date && (
                <span className="block mx-2">|</span>
              )}
              {book.isbn && <p className="text-sm ">ISBN : {book.isbn}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
