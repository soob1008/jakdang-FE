import ProfileContainer from "@/feature/author/container/ProfileContainer";
import WorkList from "@/feature/author/WorkList";
import RepresentativeWorkContainer from "@/feature/author/container/RepresentativeWorkContainer";
import IntroContainer from "@/feature/author/container/IntroContainer";

interface AuthorPageProps {
  params: { id: string };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  console.log("AuthorPage id:", params.id);
  const slug = decodeURIComponent(params.id).replace(/^@/, "");
  console.log("Decoded slug:", slug);

  return (
    <div className="flex flex-col gap-22 pb-40">
      <ProfileContainer slug={slug} />
      <IntroContainer />
      <RepresentativeWorkContainer slug={slug} />
      <WorkList />
    </div>
  );
}
