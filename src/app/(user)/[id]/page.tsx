import ProfileBlock from "@/feature/author/blocks/ProfileBlock";
import { fetchServer } from "@/lib/api/api.server";
import { Author } from "@/feature/user/type";
import { Block, Page } from "@/feature/admin/types";
import TextBlock from "@/feature/author/blocks/TextBlock";
import ImageBlock from "@/feature/author/blocks/ImageBlock";
import LinkBlock from "@/feature/author/blocks/LinkBlock";
import SNSBlock from "@/feature/author/blocks/SNSBlock";
import WorkBlock from "@/feature/author/blocks/work/WorkBlock";
import CalendarBlock from "@/feature/author/blocks/CalendarBlock";
import BlankBlock from "@/feature/author/blocks/BlankBlock";
import AuthorHeader from "@/feature/author/AuthorHeader";
import { notFound } from "next/navigation";

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id: slug } = await params;

  if (!slug) {
    return (
      <div className="pt-8 text-center text-gray-500">
        작가가 존재하지 않습니다.
      </div>
    );
  }
  console.log("slug", slug);

  const { user, page } = await fetchServer<{ user: Author; page: Page }>(
    `/api/author/${slug}`
  );

  if (!user) {
    notFound();
  }

  const { profile_published } = user;
  const { blocks_published } = page || {};

  console.log("데이터 나와라", user.profile_published, page);

  return (
    <div>
      <AuthorHeader />
      <div className="flex flex-col gap-6 pt-2.5 pb-40">
        {profile_published && <ProfileBlock profile={profile_published} />}
        {blocks_published ? (
          blocks_published.map((block: Block) => {
            if (block.type === "text") {
              return <TextBlock key={block.id} block={block} />;
            }

            if (block.type === "image") {
              return <ImageBlock key={block.id} block={block} />;
            }

            if (block.type === "link") {
              return <LinkBlock key={block.id} block={block} />;
            }

            if (block.type === "sns") {
              return <SNSBlock key={block.id} block={block} />;
            }

            if (block.type === "work") {
              return <WorkBlock key={block.id} block={block} />;
            }

            if (block.type === "calendar") {
              return <CalendarBlock key={block.id} block={block} />;
            }

            if (block.type === "blank") {
              return <BlankBlock key={block.id} block={block} />;
            }
            return <div key={block.id}>블럭</div>;
          })
        ) : (
          <p className="pt-18 text-center text-gray-500">
            작가님의 콘텐츠가 준비 중입니다.
          </p>
        )}
      </div>
    </div>
  );
}
