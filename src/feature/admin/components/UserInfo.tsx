"use client";
import { Button } from "@/components/ui/button";
import { Author } from "@/feature/user/type";

interface UserInfoProps {
  author: Author;
}

export default function UserInfo({ author }: UserInfoProps) {
  return (
    <section className="flex justify-between items-center pb-4 border-b border-gray-200">
      <b>{author.email}</b>
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => {
          const slug = author.slug || "";
          window.open(`/@${slug}`, "_blank");
        }}
      >
        내 페이지 이동
      </Button>
    </section>
  );
}
