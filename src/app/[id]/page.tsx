import ProfileContainer from "@/feature/author/container/ProfileContainer";
import Masterpiece from "@/feature/author/Masterpiece";
import WorkList from "@/feature/author/WorkList";

interface AuthorPageProps {
  params: { id: string };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  console.log("AuthorPage id:", params.id);
  const slug = decodeURIComponent(params.id).replace(/^@/, "");
  console.log("Decoded slug:", slug);

  return (
    <>
      <ProfileContainer slug={slug} />
      <Masterpiece />
      <WorkList />
    </>
  );
}
