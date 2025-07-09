import { getAuthor } from "@/feature/user/api.server";
import Profile from "@/feature/author/Profile";
import RepresentativeWork from "@/feature/author/RepresentativeWork";
import WorkList from "@/feature/author/WorkList";
import Intro from "@/feature/author/Intro";
import LinkList from "@/feature/author/LinkList";

interface AuthorPageProps {
  params: { id: string };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const slug = decodeURIComponent(params.id).replace(/^@/, "");
  const { user } = await getAuthor(slug);

  if (!user) {
    return (
      <div className="text-center text-gray-500">
        작가 정보를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-22 pb-40">
      <Profile user={user} />
      <Intro />
      <LinkList links={user.user_links} />
      <RepresentativeWork user={user} />
      <WorkList user={user} />
    </div>
  );
}
