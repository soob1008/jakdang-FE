import { Block } from "@/feature/admin/types";
import Image from "next/image";
import { format } from "date-fns";

interface BookBlockProps {
  block: Block;
}

export default function BookBlock({ block }: BookBlockProps) {
  const { mode, search, manual, thumbnail } = block.data;
  const book = mode === "search" ? search : manual;

  if (!book) return null;
  console.log("BookBlock render", block);

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
      <div className="flex-1 mt-6">
        <h2 className="font-bold text-xl">{book.title}</h2>
        <div className="flex flex-col gap-2 mt-2">
          {/* 저자 & 출판사 */}
          {(book.author || book.publisher) && (
            <div className="flex items-center">
              {book.author && (
                <p className="text-sm text-gray-700">저자 : {book.author}</p>
              )}
              {book.author && book.publisher && (
                <span className="block mx-2">|</span>
              )}
              {book.publisher && (
                <p className="text-sm text-gray-700">
                  출판사 : {book.publisher}
                </p>
              )}
            </div>
          )}

          {/* 발행일 & ISBN */}
          {(book.publish_date || book.isbn) && (
            <div className="flex items-center">
              {book.publish_date && (
                <p className="text-sm text-gray-700">
                  발행일 : {format(new Date(book.publish_date), "yyyy-MM-dd")}
                </p>
              )}
              {book.isbn && book.publish_date && (
                <span className="block mx-2">|</span>
              )}
              {book.isbn && (
                <p className="text-sm text-gray-700">ISBN : {book.isbn}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
