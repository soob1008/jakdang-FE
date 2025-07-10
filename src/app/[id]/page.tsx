import { getAuthor } from "@/feature/user/api.server";
import Profile from "@/feature/author/Profile";
import RepresentativeWork from "@/feature/author/RepresentativeWork";
import WorkList from "@/feature/author/WorkList";
import Bio from "@/feature/author/Bio";
import LinkList from "@/feature/author/LinkList";

interface AuthorPageProps {
  params: { id: string };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  if (!params || !params.id) {
    return (
      <div className="text-center text-gray-500">
        작가 정보를 불러오는 중...
      </div>
    );
  }
  const slug = decodeURIComponent(params.id).replace(/^@/, "");
  const { user, error } = await getAuthor(slug);

  if (!user || error) {
    return (
      <div className="text-center text-gray-500">
        작가 정보를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-22 pb-40">
      <Profile user={user} />
      <Bio bio={user.bio} />
      <LinkList links={user.user_links} />
      <RepresentativeWork user={user} />
      <WorkList user={user} />
    </div>
  );
}
