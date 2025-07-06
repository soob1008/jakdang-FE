import { Button } from "@/components/ui/button";
import { Author } from "@/feature/user/type";

interface UserInfoProps {
  author: Author;
}

export default function UserInfo({ author }: UserInfoProps) {
  return (
    <section className="flex justify-between items-center pb-4 border-b border-gray-200">
      <b className="block text-base lg:text-lg">{author.email}</b>
      <Button variant="outline-primary" size="sm">
        내 페이지
      </Button>
    </section>
  );
}
