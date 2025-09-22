"use client";

import { AuthorLink } from "@/entities/author/model/types";
import { EllipsisVertical } from "lucide-react";
import { toast } from "sonner";

interface LinkListProps {
  links: AuthorLink[];
}

export default function LinkList({ links }: LinkListProps) {
  if (!links || links.length === 0) {
    return null; // No links to display
  }

  const handleShare = (link: AuthorLink) => {
    if (navigator.share) {
      navigator
        .share({
          title: link.title,
          url: link.url,
        })
        .then(() => {
          toast.success("링크가 공유되었습니다.");
        })
        .catch((error) => {
          if ((error as Error).name !== "AbortError") {
            toast.error("공유에 실패했어요.");
          }
        });
    } else {
      toast.error("이 브라우저는 공유 기능을 지원하지 않습니다.");
    }
  };

  return (
    <section>
      <h2 className="mb-4 text-lg font-bold">작가의 공간들</h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.id}>
            <div className="flex items-center justify-between w-full p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:border-primary transition-all duration-200 bg-white text-sm font-medium text-gray-700">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center hover:text-primary"
              >
                {link.title}
              </a>

              {/* ... 공유 버튼 */}
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-gray-700 p-1"
                onClick={() => handleShare(link)} // 별도 함수로 처리
              >
                <EllipsisVertical className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
