"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { ResponsiveDialog } from "@/shared/ui/ResponsiveDialog";
import { Work } from "@/entities/work/model/type";

interface WorkBlockProps {
  work: Work;
}

export default function WorkBlock({ work }: WorkBlockProps) {
  const params = useParams();
  const slug = params?.id;

  const { writings = [] } = work || {};

  const visibleWritings = useMemo(() => writings.slice(0, 3), [writings]);
  const hasMore = writings.length > 3;

  if (!work?.id) return null;

  const { thumbnail, title: workTitle, description } = work;

  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const coverSrc = thumbnail
    ? `${imageBase}${thumbnail}`
    : "/assets/basic_book.jpg";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="relative aspect-[3/2] sm:aspect-[16/9]">
        <Image
          src={coverSrc}
          alt={workTitle || "Work Cover"}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="px-5 sm:px-6 py-6 sm:py-7 space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          {workTitle || "제목 없음"}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-gray-600 whitespace-pre-line line-clamp-4">
            {description}
          </p>
        )}

        <div className="space-y-3">
          <h5 className="text-sm font-semibold text-gray-900">글 목록</h5>

          {visibleWritings.length > 0 ? (
            <ul className="space-y-2">
              {visibleWritings.map((writing, idx) => (
                <li key={writing.id}>
                  <Link
                    href={{
                      pathname: "/[slug]/works/[workId]/writing/[writingId]",
                      query: {
                        slug: slug || "",
                        workId: work.id,
                        writingId: writing.id,
                      },
                    }}
                    as={`/${slug}/works/${work.id}/writing/${writing.id}`}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-2.5 transition hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5"
                  >
                    <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xs font-semibold text-[var(--accent)]">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900 line-clamp-1 hover:text-[var(--accent)]">
                      {writing.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">
              아직 등록된 글이 없습니다. 작품에 글을 추가해 주세요.
            </p>
          )}
        </div>

        {hasMore && (
          <div className="pt-1">
            <ResponsiveDialog
              trigger={
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full h-9 px-4 hover:text-primary hover:bg-gray-50"
                >
                  더보기
                </Button>
              }
              title="전체 글 목록"
              isSubmit={false}
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  총 {writings.length}개의 글이 등록되어 있습니다.
                </p>
                <div className="grid gap-3">
                  {writings.map((writing, idx) => (
                    <Link
                      key={writing.id}
                      href={{
                        pathname: "/[slug]/works/[workId]/writing/[writingId]",
                        query: {
                          slug: slug || "",
                          workId: work.id,
                          writingId: writing.id,
                        },
                      }}
                      as={`/${slug}/works/${work.id}/writing/${writing.id}`}
                      className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/5"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xs font-semibold text-[var(--accent)]">
                        {idx + 1}
                      </span>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-gray-900 hover:text-[var(--accent)]">
                          {writing.title}
                        </p>
                        {writing.subtitle && (
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {writing.subtitle}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </ResponsiveDialog>
          </div>
        )}
      </div>
    </section>
  );
}
