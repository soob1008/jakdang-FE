import ProfileContainer from "@/feature/author/container/ProfileContainer";
import WorkList from "@/feature/author/WorkList";
import RepresentativeWorkContainer from "@/feature/author/container/RepresentativeWorkContainer";

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
      <RepresentativeWorkContainer slug={slug} />
      <WorkList />
    </>
  );
}
