import WorkViewContainer from "@/feature/admin/works/components/WorkViewContainer";
import Footer from "@/shared/components/layout/footer";
import { Header } from "@/shared/components/layout/header";

export default function AuthorWorksViewPage() {
  return (
    <>
      <Header />
      <WorkViewContainer
        title="작품 제목"
        subtitle="소제목"
        authorName="김작가"
        publishedAt="2023-01-01"
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
