import { ProfileDialog } from "@/feature/admin/dialog/ProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Author } from "@/feature/user/type";

interface AuthorInfoProps {
  author: Author;
}

export default function AuthorInfo({ author }: AuthorInfoProps) {
  if (!author) {
    return null; // 작가 정보가 없을 경우 아무것도 렌더링하지 않음
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">작가 정보</h3>
        <ProfileDialog author={author} />
      </div>
      <div className="flex gap-4 items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={
              author.profile_image_url
                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${author.profile_image_url}`
                : "assets/profile_default.png"
            }
            alt="프로필 이미지"
            className="object-cover"
          />
          <AvatarFallback>프로필이미지</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center text-sm gap-2">
            <strong className="block font-medium">
              {author?.display_name || "필명"}
            </strong>
            <span className="text-xs text-gray-500">@{author?.slug}</span>
          </div>
          <p className="mt-2 text-gray-500 text-sm">
            {author?.tagline || "작가의 한줄 소개가 없습니다."}
          </p>
        </div>
      </div>
    </section>
  );
}
