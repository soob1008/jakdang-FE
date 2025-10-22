"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import useWriting from "../hooks/useWriting";
import useWritings from "../hooks/useWritings";
import { lexicalJsonToHtml } from "@/shared/lib/editor/lexical";
import { shareLink } from "@/shared/lib/share";
import { ResponsiveDialog } from "@/shared/ui/ResponsiveDialog";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

type WorkViewContainerProps = {
  workId: string;
  writingId: string;
};

export default function WorkViewContainer({
  workId,
  writingId,
}: WorkViewContainerProps) {
  const params = useParams();
  const slugParam = params?.id;
  const slug = Array.isArray(slugParam)
    ? slugParam[0]
    : (slugParam as string | undefined);
  const { data: allWritings = [] } = useWritings({ workId });

  const { visibleWritings, hasMore } = useMemo(() => {
    const topFive = allWritings.slice(0, 5);
    const existsInTop = topFive.some((item) => item.id === writingId);
    const current = allWritings.find((item) => item.id === writingId);

    const combined =
      existsInTop || !current ? topFive : [...topFive.slice(0, 4), current];

    const unique = Array.from(
      new Map(combined.map((item) => [item.id, item])).values()
    );

    return {
      visibleWritings: unique,
      hasMore: allWritings.length > unique.length,
    } as const;
  }, [allWritings, writingId]);

  const { data: currentWriting } = useWriting(workId, writingId);

  if (!currentWriting || currentWriting.is_public === false) {
    return <div className="min-h-screen">작품을 불러올 수 없습니다.</div>;
  }

  const htmlContent = lexicalJsonToHtml(currentWriting.content as string) || "";

  const formatDateLabel = (value?: Date | string | null) => {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return format(date, "yyyy.MM.dd");
  };

  const headerDateLabel =
    formatDateLabel(currentWriting.published_at ?? currentWriting.created_at) ??
    null;

  const buildHref = (targetId: string) =>
    slug
      ? `/${slug}/works/${workId}/writing/${targetId}`
      : `/works/${workId}/writing/${targetId}`;

  const handleShare = async () => {
    await shareLink();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b pt-24 pb-30">
      <header className="mx-auto w-full max-w-3xl px-6 pt-8 pb-12">
        <h1 className="text-3xl font-semibold leading-tight text-gray-900 font-myungjo">
          {currentWriting.title}
        </h1>
        {currentWriting.subtitle ? (
          <p className="mt-4 text-gray-500">{currentWriting.subtitle}</p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <div>
              <span className="block font-myungjo text-base text-gray-800">
                {currentWriting.author_name}
              </span>
              {headerDateLabel && (
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                  <time>{headerDateLabel}</time>
                </div>
              )}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 text-xs text-gray-400">
            <button
              type="button"
              className="rounded-full border border-gray-200 bg-white/80 px-3 py-1 hover:border-gray-300 hover:text-gray-600"
              onClick={handleShare}
            >
              공유
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 pb-32">
        <article className="prose prose-neutral max-w-none leading-[1.85] text-gray-800 border-gray-200 border-t">
          <section
            className="overflow-hidden prose-base whitespace-pre-wrap pt-6 leading-[1.85] prose-p:first-letter:float-left prose-p:first-letter:pr-3 prose-p:first-letter:text-4xl prose-p:first-letter:font-bold prose-p:first-letter:text-gray-700"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <footer className="mt-20 border-t border-gray-200 pt-10 text-[13px] leading-relaxed text-gray-400">
            <p>
              * 본 작품은 {currentWriting.author_name} 님의 작품입니다. 무단
              전재 및 재배포를 금합니다.
            </p>

            {allWritings.length > 0 && (
              <div className="mt-12 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    이 작품의 글
                  </h3>
                  {hasMore && (
                    <ResponsiveDialog
                      trigger={
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-1 text-xs text-primary hover:text-primary"
                        >
                          전체 글{" "}
                          {allWritings.filter((item) => item.is_public).length}
                          개 보기
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Button>
                      }
                      title="전체 글 목록"
                      isSubmit={false}
                    >
                      <div className="space-y-4">
                        <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                          {allWritings.map((item) => {
                            const isActive = item.id === writingId;
                            const dateLabel = formatDateLabel(
                              item.created_at ?? item.published_at ?? null
                            );
                            if (item.is_public === false) {
                              return null;
                            }
                            return (
                              <li key={item.id}>
                                <Link
                                  href={buildHref(item.id)}
                                  className={cn(
                                    "flex items-center justify-between rounded-lg border px-3 py-2 transition",
                                    isActive
                                      ? "border-primary/60 bg-primary/5"
                                      : "border-gray-200 hover:border-primary/40 hover:bg-primary/5"
                                  )}
                                >
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                      {item.title}
                                    </p>
                                    {dateLabel && (
                                      <p className="mt-1 text-xs text-gray-500">
                                        {dateLabel}
                                      </p>
                                    )}
                                  </div>
                                  {isActive && (
                                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                                      현재 글
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </ResponsiveDialog>
                  )}
                </div>

                <ul className="space-y-2">
                  {visibleWritings.map((item) => {
                    const isActive = item.id === writingId;
                    const dateLabel = formatDateLabel(
                      item.created_at ?? item.published_at ?? null
                    );

                    if (item.is_public === false) {
                      return null;
                    }
                    return (
                      <li key={item.id}>
                        <Link
                          href={buildHref(item.id)}
                          className={cn(
                            "group flex items-center justify-between rounded-xl border px-4 py-3 transition",
                            isActive
                              ? "border-primary/60 bg-primary/5"
                              : "border-gray-200 hover:border-primary/40 hover:bg-primary/5"
                          )}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-primary">
                              {item.title}
                            </p>
                            {dateLabel && (
                              <p className="mt-1 text-xs text-gray-500">
                                {dateLabel}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {isActive && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                                현재 글
                              </span>
                            )}
                            <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </footer>
        </article>
      </main>
    </div>
  );
}
