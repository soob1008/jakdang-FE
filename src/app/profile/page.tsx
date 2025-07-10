import UserInfo from "@/feature/admin/components/UserInfo";
import AuthorInfo from "@/feature/admin/components/AuthorInfo";
import AuthorBio from "@/feature/admin/components/AuthorBio";
import ProfileTags from "@/feature/admin/components/ProfileTags";
import SocialLinks from "@/feature/admin/components/SocialLinks";
import WorkList from "@/feature/admin/components/WorkList";
import LinkList from "@/feature/admin/components/LinkList";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  getUser,
  getUserTags,
  getUserSNS,
  getUserLinks,
  getUserWorks,
} from "@/feature/user/api.server";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: author, error: authorError } = await getUser(user.id);
  const { tags } = await getUserTags(user.id);
  const { socials } = await getUserSNS(user.id);
  const { links } = await getUserLinks(user.id);
  const { works } = await getUserWorks(user.id);

  if (!author) {
    return (
      <div className="text-center text-gray-500">정보를 불러오는 중...</div>
    );
  }

  if (authorError) {
    console.error("Error fetching author data:", authorError);
    redirect("/auth/login");
  }

  return (
    <div className="pt-8 pb-40">
      <h2 className="mb-8 font-bold text-xl">나의 작당일지</h2>
      {/* 사용자 정보 */}
      <UserInfo author={author} />
      <div className="flex flex-col gap-18 mt-10">
        {/* 작가 정보 */}
        <AuthorInfo author={author} />

        {/* 작가 소개 */}
        <AuthorBio userId={author.id} bio={author.bio} />

        {/* 관심 분야 태그 등록 */}
        <ProfileTags userId={author.id} tags={tags ?? []} />

        {/* SNS 링크 등록 */}
        <SocialLinks userId={author.id} socials={socials ?? []} />

        {/* 링크 등록 */}
        <LinkList userId={author.id} links={links ?? []} />

        {/* 작품 등록 */}
        <WorkList userId={author.id} works={works ?? []} />
      </div>
    </div>
  );
}
