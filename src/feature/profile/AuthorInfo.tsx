import { ProfileDialog } from "@/feature/profile/dialog/ProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AuthorInfo() {
  return (
    <section className="space-y-4 ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">작가 정보</h3>
        <ProfileDialog />
      </div>
      <div className="flex gap-4 items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/test.png" alt="프로필 이미지" />
          <AvatarFallback>프로필이미지</AvatarFallback>
        </Avatar>
        <div className="text-sm space-y-1">
          <strong className="block font-medium">김수빈</strong>
          <p className="text-gray-500">@subin</p>
        </div>
      </div>
    </section>
  );
}
