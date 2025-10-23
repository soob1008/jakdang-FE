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
import Loading from "@/shared/components/loading";
import type { Writing } from "@/entities/work/model/type";

type WorkViewContainerProps = {
  workId: string;
  writingId: string;
};

export default function WorkViewContainer({
  workId,
  writingId,
}: WorkViewContainerProps) {
  const slug = getSlugFromParams(useParams());

  const { data: writings = [], isLoading: isListLoading } = useWritings({
    workId,
  });
  const { data: currentWriting, isLoading: isWritingLoading } = useWriting(
    workId,
    writingId
  );

  const publicWritings = useMemo(
    () => writings.filter((item) => item.is_public !== false),
    [writings]
  );

  const { visible, remaining } = useMemo(
    () => buildWritingLists(publicWritings, writingId, 5),
    [publicWritings, writingId]
  );

  if (isListLoading || isWritingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!currentWriting) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        작품을 불러올 수 없습니다.
      </div>
    );
  }

  if (currentWriting.is_public === false) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        비공개된 글입니다.
      </div>
    );
  }

  const htmlContent = lexicalJsonToHtml(currentWriting.content as string) || "";
  const headerDateLabel = formatDateLabel(
    currentWriting.published_at ?? currentWriting.created_at
  );

  const handleShare = async () => {
    await shareLink();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b pt-24 pb-30">
      <Header
        title={currentWriting.title}
        subtitle={currentWriting.subtitle}
        author={currentWriting.author_name}
        dateLabel={headerDateLabel}
        onShare={handleShare}
      />

      <main className="mx-auto w-full max-w-3xl px-6 pb-32">
        <article className="prose prose-neutral max-w-none leading-[1.85] text-gray-800 border-t border-gray-200">
          <section
            className="overflow-hidden prose-base whitespace-pre-wrap pt-6 leading-[1.85] prose-p:first-letter:float-left prose-p:first-letter:pr-3 prose-p:first-letter:text-4xl prose-p:first-letter:font-bold prose-p:first-letter:text-gray-700"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <footer className="mt-20 border-t border-gray-200 pt-10 text-[13px] leading-relaxed text-gray-400">
            <p>
              * 본 작품은 {currentWriting.author_name} 님의 작품입니다. 무단
              전재 및 재배포를 금합니다.
            </p>

            {publicWritings.length > 0 && (
              <WritingCollections
                slug={slug}
                workId={workId}
                activeWritingId={writingId}
                visible={visible}
                remaining={remaining}
              />
            )}
          </footer>
        </article>
      </main>
    </div>
  );
}

function Header({
  title,
  subtitle,
  author,
  dateLabel,
  onShare,
}: {
  title: string;
  subtitle?: string | null;
  author: string;
  dateLabel: string | null;
  onShare: () => void;
}) {
  return (
    <header className="mx-auto w-full max-w-3xl px-6 pt-8 pb-12">
      <h1 className="text-3xl font-semibold leading-tight text-gray-900 font-myungjo">
        {title}
      </h1>
      {subtitle ? <p className="mt-4 text-gray-500">{subtitle}</p> : null}

      <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <div>
            <span className="block font-myungjo text-base text-gray-800">
              {author}
            </span>
            {dateLabel && (
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                <time>{dateLabel}</time>
              </div>
            )}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs text-gray-400">
          <button
            type="button"
            className="rounded-full border border-gray-200 bg-white/80 px-3 py-1 hover:border-gray-300 hover:text-gray-600"
            onClick={onShare}
          >
            공유
          </button>
        </div>
      </div>
    </header>
  );
}

function WritingCollections({
  slug,
  workId,
  activeWritingId,
  visible,
  remaining,
}: {
  slug?: string;
  workId: string;
  activeWritingId: string;
  visible: readonly Writing[];
  remaining: readonly Writing[];
}) {
  const total = visible.length + remaining.length;
  const buildHref = (id: string) => buildWritingHref(slug, workId, id);
  const hasMore = remaining.length > 0;

  return (
    <div className="mt-12 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">이 작품의 글</h3>
        {hasMore && (
          <ResponsiveDialog
            trigger={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1 text-xs text-primary hover:text-primary"
              >
                전체 글 {total}개 보기
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            }
            title="전체 글 목록"
            isSubmit={false}
          >
            <WritingList
              writings={[...visible, ...remaining]}
              activeId={activeWritingId}
              buildHref={buildHref}
              scrollable
            />
          </ResponsiveDialog>
        )}
      </div>

      <WritingList
        writings={visible}
        activeId={activeWritingId}
        buildHref={buildHref}
      />
    </div>
  );
}

function WritingList({
  writings,
  activeId,
  buildHref,
  scrollable = false,
}: {
  writings: readonly Writing[];
  activeId: string;
  buildHref: (id: string) => string;
  scrollable?: boolean;
}) {
  if (!writings.length) {
    return (
      <p className="text-xs text-muted-foreground">
        아직 등록된 공개 글이 없습니다.
      </p>
    );
  }

  return (
    <ul
      className={cn(
        "space-y-2",
        scrollable && "space-y-0 max-h-[420px] overflow-y-auto pr-1"
      )}
    >
      {writings.map((item) => {
        const isActive = item.id === activeId;
        const dateLabel = formatDateLabel(
          item.created_at ?? item.published_at ?? null
        );

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
                  <p className="mt-1 text-xs text-gray-500">{dateLabel}</p>
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
  );
}

function getSlugFromParams(params: ReturnType<typeof useParams>) {
  const slugParam = params?.id;
  if (!slugParam) return undefined;
  return Array.isArray(slugParam) ? slugParam[0] : (slugParam as string);
}

function formatDateLabel(value?: Date | string | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return format(date, "yyyy.MM.dd");
}

function buildWritingHref(
  slug: string | undefined,
  workId: string,
  writingId: string
) {
  return slug
    ? `/${slug}/works/${workId}/writing/${writingId}`
    : `/works/${workId}/writing/${writingId}`;
}

function buildWritingLists(
  writings: Writing[],
  activeId: string,
  limit: number
) {
  if (!writings.length) {
    return { visible: [], remaining: [] } as const;
  }

  const top = writings.slice(0, limit);
  const active = writings.find((item) => item.id === activeId);
  const withActive =
    active && !top.some((item) => item.id === active.id)
      ? [...top.slice(0, limit - 1), active]
      : top;

  const uniqueVisible = Array.from(
    new Map(withActive.map((item) => [item.id, item])).values()
  );

  const remaining = writings.filter(
    (item) => !uniqueVisible.some((visible) => visible.id === item.id)
  );

  return { visible: uniqueVisible, remaining } as const;
}
