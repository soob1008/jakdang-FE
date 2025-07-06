import { ProfileDialog } from "@/feature/profile/dialog/ProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Author } from "@/feature/user/type";

interface AuthorInfoProps {
  author: Author;
}

export default function AuthorInfo({ author }: AuthorInfoProps) {
  return (
    <section className="space-y-4 ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">작가 정보</h3>
        <ProfileDialog author={author} />
      </div>
      <div className="flex gap-4 items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/test.png" alt="프로필 이미지" />
          <AvatarFallback>프로필이미지</AvatarFallback>
        </Avatar>
        <div className="text-sm space-y-1">
          <strong className="block font-medium">
            {author?.display_name || "필명"}
          </strong>
          <p className="text-gray-500">@{author?.slug}</p>
        </div>
      </div>
    </section>
  );
}
