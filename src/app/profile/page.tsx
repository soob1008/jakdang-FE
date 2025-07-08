import UserInfo from "@/feature/profile/components/UserInfo";
import AuthorInfo from "@/feature/profile/components/AuthorInfo";
import AuthorIntro from "@/feature/profile/components/AuthorIntro";
import ProfileTags from "@/feature/profile/components/ProfileTags";
import SocialLinks from "@/feature/profile/components/SocialLinks";
import WorkList from "@/feature/profile/components/WorkList";
import LinkList from "@/feature/profile/components/LinkList";
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

  console.log("ProfilePage user:", user);

  if (!user) {
    redirect("/auth/login");
  }

  const { data: author, error: authorError } = await getUser(user.id);
  const { tags } = await getUserTags(user.id);
  const { socials } = await getUserSNS(user.id);
  const { links } = await getUserLinks(user.id);
  const { works } = await getUserWorks(user.id);

  if (authorError) {
    console.error("Error fetching author data:", authorError);
    redirect("/auth/login");
  }

  console.log("ProfilePage author:", author);
  console.log("ProfilePage works", works);

  return (
    <div className="pb-40">
      <h2 className="mb-8 font-bold text-xl">나의 작당일지</h2>
      {/* 사용자 정보 */}
      <UserInfo author={author} />
      <div className="flex flex-col gap-18 mt-10">
        {/* 작가 정보 */}
        <AuthorInfo author={author} />

        {/* 작가 한줄 소개 */}
        <AuthorIntro userId={author.id} intro={author.intro_text} />

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
