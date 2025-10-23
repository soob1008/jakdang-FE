import WorkViewContainer from "@/feature/admin/works/components/WorkViewContainer";
import Footer from "@/shared/components/layout/footer";
import { Header } from "@/shared/components/layout/header";

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

  return (
    <>
      <Header />
      <WorkViewContainer workId={workId} writingId={writingId} />
      <Footer />
    </>
  );
}
