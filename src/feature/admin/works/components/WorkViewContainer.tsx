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
import CommentSection from "./CommentSection";
import { Badge } from "@/shared/ui/badge";

type WorkViewContainerProps = {
  workId: string;
  writingId: string;
};

type PaymentInfo = {
  isPaid: boolean;
  price?: string | null;
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
  const paymentInfo: PaymentInfo = {
    isPaid: true,
    price: "1,000원",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b pt-24 pb-30">
      <Header
        title={currentWriting.title}
        subtitle={currentWriting.subtitle}
        author={currentWriting.author_name}
        dateLabel={headerDateLabel}
        onShare={handleShare}
        payment={paymentInfo}
      />

      <main className="mx-auto w-full max-w-3xl">
        <article className="prose prose-neutral max-w-none leading-[1.85] text-gray-800 border-t border-gray-200">
          <section
            className="overflow-hidden prose-base whitespace-pre-wrap pt-6 pb-10 min-h-80 leading-[1.85] prose-p:first-letter:float-left prose-p:first-letter:pr-3 prose-p:first-letter:text-4xl prose-p:first-letter:font-bold prose-p:first-letter:text-gray-700"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <footer className="border-t border-gray-200 pt-4 leading-relaxed text-gray-400">
            <p className="text-xs text-gray-400 mb-10">
              * 본 작품은 {currentWriting.author_name} 님의 작품입니다. 무단
              전재 및 재배포를 금합니다.
            </p>
            <CommentSection writingId={writingId} />
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
        {paymentInfo.isPaid ? <PaymentSection payment={paymentInfo} /> : null}
      </main>
    </div>
  );
}

function PaymentSection({ payment }: { payment: PaymentInfo }) {
  const { isPaid, price } = payment;
  if (!isPaid) return null;

  const badgeVariant = "success";
  const badgeLabel = "유료";
  const priceLabel = price ?? "가격 미정";
  const description = "이 글은 유료로 제공되는 콘텐츠입니다.";
  const buttonLabel = "결제하고 읽기";

  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 shadow-[0_-12px_30px_-20px_rgba(15,23,42,0.25)] backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <Badge variant={badgeVariant} size="xs">
            {badgeLabel}
          </Badge>
          <div className="flex flex-col leading-tight">
            <span className={cn("font-semibold", "text-lg text-gray-900")}>
              {priceLabel}
            </span>
            <span className="text-xs text-gray-500">{description}</span>
          </div>
        </div>
        <Button
          type="button"
          size="lg"
          variant="default"
          className="w-full md:w-auto md:min-w-[160px]"
        >
          {buttonLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}

function Header({
  title,
  subtitle,
  author,
  dateLabel,
  onShare,
  payment,
}: {
  title: string;
  subtitle?: string | null;
  author: string;
  dateLabel: string | null;
  onShare: () => void;
  payment: PaymentInfo;
}) {
  const { isPaid, price } = payment;
  const badgeVariant = isPaid ? "success" : "info";
  const badgeLabel = isPaid ? "유료" : "무료";
  const priceLabel = isPaid ? price ?? "가격 미정" : "무료 공개 중";

  return (
    <header className="mx-auto w-full max-w-3xl px-6 pt-8 pb-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold leading-tight text-gray-900 font-myungjo">
              {title}
            </h1>
            {subtitle ? <p className="mt-4 text-gray-500">{subtitle}</p> : null}
          </div>
          <div className="flex flex-col items-end gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant={badgeVariant} size="xs">
                {badgeLabel}
              </Badge>
              <span
                className={cn(
                  "font-medium",
                  isPaid ? "text-gray-900" : "text-gray-500"
                )}
              >
                {priceLabel}
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full border-gray-200 text-gray-500 hover:text-gray-700"
              onClick={onShare}
            >
              공유
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div>
            <span className="block font-myungjo text-base text-gray-800">
              {author}
            </span>
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
              {dateLabel && <time>{dateLabel}</time>}
            </div>
          </div>
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
