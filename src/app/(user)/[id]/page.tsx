// import { getAuthor } from "@/feature/user/api.server";
// import Profile from "@/feature/author/Profile";
// import RepresentativeWork from "@/feature/author/RepresentativeWork";
// import WorkList from "@/feature/author/WorkList";
// import Bio from "@/feature/author/Bio";
// import LinkList from "@/feature/author/LinkList";
// import EmpltyText from "@/components/ui/EmptyText";
import ProfileBlock from "@/feature/author/blocks/ProfileBlock";
import { fetchServer } from "@/lib/api/api.server";
import { Author } from "@/feature/user/type";
import { Block, Page } from "@/feature/admin/types";
import TextBlock from "@/feature/author/blocks/TextBlock";

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="pt-8 text-center text-gray-500">
        작가가 존재하지 않습니다.
      </div>
    );
  }

  // const slug = decodeURIComponent(id).replace(/^@/, "");
  // const { user, error } = await getAuthor(slug);
  const { user } = await fetchServer<{ user: Author }>(`/api/user`);

  console.log(user);

  // if (error) {
  //   return (
  //     <div className="pt-8 text-center text-gray-500">
  //       작가 정보를 불러오는 중 오류가 발생했습니다.
  //     </div>
  //   );
  // }

  if (!user) {
    return (
      <div className="pt-8 text-center text-gray-500">
        작가 정보를 불러오는 중...
      </div>
    );
  }

  const { page } = await fetchServer<{ page: Page }>(`/api/pages`);
  const { blocks_published } = page;
  console.log("page:", page);

  // if (!user.bio && !user.user_links?.length && !user.user_works?.length) {
  //   return (
  //     <div className="pt-8 flex flex-col gap-22 pb-40">
  //       <Profile user={user} />
  //       <EmpltyText message="작가의 공간을 준비중입니다." />
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-22 pt-2.5 pb-40">
      {/* <Profile user={user} /> */}
      <ProfileBlock user={user} />
      {blocks_published.map((block: Block) => {
        if (block.type === "text") {
          return <TextBlock key={block.id} block={block} />;
        }
        return <div key={block.id}>블럭</div>;
      })}
      {/* <Bio bio={user.bio} />
      <LinkList links={user.user_links} />
      <RepresentativeWork user={user} />
      <WorkList user={user} /> */}
    </div>
  );
}
