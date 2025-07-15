import { getAuthor } from "@/feature/user/api.server";
import Profile from "@/feature/author/Profile";
import RepresentativeWork from "@/feature/author/RepresentativeWork";
import WorkList from "@/feature/author/WorkList";
import Bio from "@/feature/author/Bio";
import LinkList from "@/feature/author/LinkList";
import EmpltyText from "@/components/ui/EmptyText";

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="text-center text-gray-500">작가가 존재하지 않습니다.</div>
    );
  }

  const slug = decodeURIComponent(id).replace(/^@/, "");
  const { user, error } = await getAuthor(slug);

  if (error) {
    return (
      <div className="text-center text-gray-500">
        작가 정보를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-500">
        작가 정보를 불러오는 중...
      </div>
    );
  }

  if (!user.bio && !user.user_links?.length && !user.user_works?.length) {
    return (
      <div className="flex flex-col gap-22 pb-40">
        <Profile user={user} />
        <EmpltyText message="작가의 공간을 준비중입니다." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-22 pt-8 pb-40">
      <Profile user={user} />
      <Bio bio={user.bio} />
      <LinkList links={user.user_links} />
      <RepresentativeWork user={user} />
      <WorkList user={user} />
    </div>
  );
}
