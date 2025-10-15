type WorkViewContainerProps = {
  title: string;
  subtitle?: string;
  authorName: string;
  publishedAt: string;
  contentHtml: string;
  estimatedReadMinutes?: number;
  relatedArticles?: Array<{
    id: string;
    title: string;
    excerpt?: string;
    publishedAt: string;
    href: string;
  }>;
};

export default function WorkViewContainer({
  title,
  subtitle,
  authorName,
  publishedAt,
  contentHtml,
  estimatedReadMinutes,
  relatedArticles,
}: WorkViewContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b  pt-14">
      <header className="mx-auto w-full max-w-3xl px-6 pt-8 pb-12">
        {/* <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-1 text-[11px] uppercase tracking-[0.45em] text-gray-400">
          <span>Jakdang</span>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span>Story</span>
        </div> */}

        <h1 className="text-3xl font-semibold leading-tight text-gray-900 font-myungjo">
          {title}
        </h1>
        {subtitle ? <p className="mt-4 text-gray-500">{subtitle}</p> : null}

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            {/* <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-base font-semibold text-gray-600">
              {authorInitial}
            </span> */}
            <div>
              <span className="block font-myungjo text-base text-gray-800">
                {authorName}
              </span>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                <time>{publishedAt}</time>
                {estimatedReadMinutes ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>{estimatedReadMinutes} min read</span>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 text-xs text-gray-400">
            {/* <button
              type="button"
              className="rounded-full border border-gray-200 bg-white/80 px-3 py-1 hover:border-gray-300 hover:text-gray-600"
            >
              저장
            </button> */}
            <button
              type="button"
              className="rounded-full border border-gray-200 bg-white/80 px-3 py-1 hover:border-gray-300 hover:text-gray-600"
            >
              공유
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 pb-32">
        <article className="prose prose-neutral max-w-none leading-[1.85] text-gray-800 border-gray-200 border-t">
          <section
            className="prose-base whitespace-pre-wrap pt-6 leading-[1.85] prose-p:first-letter:float-left prose-p:first-letter:pr-3 prose-p:first-letter:text-4xl prose-p:first-letter:font-bold prose-p:first-letter:text-gray-700"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <footer className="mt-20 border-t border-gray-200 pt-10 text-[13px] leading-relaxed text-gray-400">
            <p>
              * 본 작품은 {authorName} 님의 작품입니다. 무단 전재 및 재배포를
              금합니다.
            </p>

            {relatedArticles && relatedArticles.length > 0 ? (
              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-gray-400">
                  <span className="h-px w-6 bg-gray-300" />
                  <span>More Stories</span>
                </div>
                <ul className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white/70">
                  {relatedArticles.map((article) => (
                    <li key={article.id} className="group">
                      <a
                        className="block px-6 py-5 transition hover:bg-gray-50"
                        href={article.href}
                      >
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-gray-400">
                          <span>Story</span>
                          <time>{article.publishedAt}</time>
                        </div>
                        <h4 className="mt-2 text-[17px] font-semibold text-gray-800 group-hover:text-gray-900">
                          {article.title}
                        </h4>
                        {article.excerpt ? (
                          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                            {article.excerpt}
                          </p>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </footer>
        </article>
      </main>
    </div>
  );
}
