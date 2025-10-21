"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import useWriting from "../hooks/useWriting";
import useWritings from "../hooks/useWritings";
import { lexicalJsonToHtml } from "@/shared/lib/editor/lexical";
import { shareLink } from "@/shared/lib/share";
import { ResponsiveDialog } from "@/shared/ui/ResponsiveDialog";
import { Button } from "@/shared/ui/button";

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

  const [isAllOpen, setAllOpen] = useState(false);
  const { data: writings = [] } = useWritings({ workId });

  const { visibleWritings, moreCount } = useMemo(() => {
    const topFive = writings.slice(0, 5);
    return {
      visibleWritings: topFive,
      moreCount: Math.max(writings.length - topFive.length, 0),
    } as const;
  }, [writings]);

  const { data: writing } = useWriting(workId, writingId);

  if (!writing || writing.is_public === false) {
    return <div className="min-h-screen">작품을 불러올 수 없습니다.</div>;
  }

  const htmlContent = lexicalJsonToHtml(writing.content as string) || "";

  const handleShare = async () => {
    await shareLink();
  };

  const buildHref = (targetId: string) =>
    slug
      ? `/@${slug}/works/${workId}/writing/${targetId}`
      : `/works/${workId}/writing/${targetId}`;

  return (
    <div className="min-h-screen bg-gradient-to-b pt-24 pb-30">
      <header className="mx-auto w-full max-w-3xl px-6 pt-8 pb-12">
        <h1 className="text-3xl font-semibold leading-tight text-gray-900 font-myungjo">
          {writing.title}
        </h1>
        {writing.subtitle ? (
          <p className="mt-4 text-gray-500">{writing.subtitle}</p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <div>
              <span className="block font-myungjo text-base text-gray-800">
                {writing.author_name}
              </span>
              {writing.published_at && (
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                  <time>{format(writing.published_at, "yyyy-MM-dd")}</time>
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
              * 본 작품은 {writing.author_name} 님의 작품입니다. 무단 전재 및
              재배포를 금합니다.
            </p>

            {writings.length > 0 && (
              <>
                <div className="mt-12 space-y-6">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-gray-400">
                    <span className="h-px w-6 bg-gray-300" />
                    <span>ALL WORKS</span>
                  </div>
                  <ul className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white/70">
                    {visibleWritings.map((item) => {
                      const isActive = item.id === writingId;
                      return (
                        <li key={item.id} className="group">
                          <Link
                            className="block px-6 py-5 transition hover:bg-gray-50"
                            href={buildHref(item.id)}
                          >
                            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-gray-400">
                              <span>Story</span>
                              {isActive && (
                                <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700">
                                  현재 글
                                </span>
                              )}
                            </div>
                            <h4 className="mt-2 text-[17px] font-semibold text-gray-800 group-hover:text-gray-900">
                              {item.title}
                            </h4>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <ResponsiveDialog
                  trigger={
                    moreCount > 0 ? (
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="xl"
                          className="mt-4 w-full gap-1 text-xs text-primary hover:text-primary"
                          onClick={() => setAllOpen(true)}
                        >
                          전체 글 목록 보기
                        </Button>
                      </div>
                    ) : null
                  }
                  open={isAllOpen}
                  onOpenChange={setAllOpen}
                  title="전체 글 목록"
                  isSubmit={false}
                >
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                      총 {writings.length}개의 글이 등록되어 있습니다.
                    </p>
                    <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
                      {writings.map((item) => {
                        const isActive = item.id === writingId;
                        return (
                          <li key={item.id}>
                            <Link
                              className="flex items-start justify-between gap-4 px-4 py-3 transition hover:bg-gray-50"
                              href={buildHref(item.id)}
                              onClick={() => setAllOpen(false)}
                            >
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                  {item.title}
                                </p>
                                <span className="mt-1 inline-block text-[11px] uppercase tracking-[0.2em] text-gray-400">
                                  Story
                                </span>
                              </div>
                              {isActive && (
                                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
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
              </>
            )}
          </footer>
        </article>
      </main>
    </div>
  );
}
