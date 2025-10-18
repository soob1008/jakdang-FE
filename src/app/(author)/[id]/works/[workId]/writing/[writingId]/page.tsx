import { Writing } from "@/entities/work/model/type";
import WorkViewContainer from "@/feature/admin/works/components/WorkViewContainer";
import Footer from "@/shared/components/layout/footer";
import { Header } from "@/shared/components/layout/header";
import { fetchServerAPI } from "@/shared/lib/api/api.server";

type AuthorWorksViewPageProps = {
  params: Promise<{
    id: string;
    workId: string;
    writingId: string;
  }>;
};

export default async function AuthorWorksViewPage({
  params,
}: AuthorWorksViewPageProps) {
  const { workId, writingId } = await params;
  const writing: Writing = await fetchServerAPI(
    `/works/${workId}/writing/${writingId}`
  );

  if (writing == null || writing.is_public === false) {
    return <div>작품을 불러올 수 없습니다.</div>;
  }

  console.log("writing", writing);

  const { title, subtitle, published_at } = writing;

  return (
    <>
      <Header />
      <WorkViewContainer
        title={title}
        subtitle={subtitle}
        authorName="김작가"
        publishedAt={published_at || ""}
        contentHtml="<p>작품 내용</p>"
        estimatedReadMinutes={5}
        relatedArticles={[
          {
            id: "1",
            title: "관련 글 1",
            excerpt: "간단한 요약",
            publishedAt: "2023-01-02",
            href: "https://example.com/related-1",
          },
          {
            id: "2",
            title: "관련 글 2",
            excerpt: "간단한 요약",
            publishedAt: "2023-01-03",
            href: "https://example.com/related-2",
          },
        ]}
      />
      <Footer />
    </>
  );
}
