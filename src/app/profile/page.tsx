import UserInfo from "@/feature/profile/components/UserInfo";
import AuthorInfo from "@/feature/profile/components/AuthorInfo";
import AuthorIntro from "@/feature/profile/components/AuthorIntro";
import ProfileTags from "@/feature/profile/components/ProfileTags";
import SocialLinks from "@/feature/profile/components/SocialLinks";
import WorkList from "@/feature/profile/components/WorkList";
import LinkList from "@/feature/profile/components/LinkList";

export default function ProfilePage() {
  return (
    <div className="space-y-10 pb-40">
      {/* 사용자 정보 */}
      <UserInfo />

      {/* 작가 정보 */}
      <AuthorInfo />

      {/* 작가 한줄 소개 */}
      <AuthorIntro />

      {/* 관심 분야 태그 등록 */}
      <ProfileTags />

      {/* SNS 링크 등록 */}
      <SocialLinks />

      {/* 링크 등록 */}

      <LinkList />

      {/* 작품 등록 */}
      <WorkList />
    </div>
  );
}
