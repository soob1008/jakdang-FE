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
import React from "react";

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

  const { user: author, page } = await fetchServer<{
    user: Author;
    page: Page;
  }>(`/api/author/${slug}`);

  if (!author) {
    notFound();
  }

  const { user } = await fetchServer<{ user: Author }>(`/api/user`);

  const { profile_published } = author;
  const { blocks_published, style_published } = page || {};

  // ===== Background (color / gradient / image) =====
  const bgMode = style_published?.background_mode ?? "color";
  const bgColor = style_published?.background_color ?? "#ffffff";
  const gStart = style_published?.gradient_start ?? "#a18cd1";
  const gEnd = style_published?.gradient_end ?? "#fbc2eb";
  const bgImage = style_published?.background_image_url || "";

  const wrapperStyle: React.CSSProperties = {};

  if (bgMode === "color") {
    wrapperStyle.backgroundColor = bgColor;
  } else if (bgMode === "gradient") {
    // 180deg: 위→아래. PC/모바일 모두 자연스러운 흐름
    wrapperStyle.backgroundImage = `linear-gradient(180deg, ${gStart} 0%, ${gEnd} 100%)`;
  } else if (bgMode === "image") {
    if (bgImage) {
      wrapperStyle.backgroundImage = `url(${process.env.NEXT_PUBLIC_IMAGE_URL}${bgImage})`;
      wrapperStyle.backgroundSize = "cover"; // 반응형: 화면 비율 관계없이 꽉 차게

      wrapperStyle.backgroundRepeat = "no-repeat";
      wrapperStyle.backgroundPosition = "top"; // 상단 고정
      // backgroundAttachment: fixed 는 모바일 성능/스크롤 이슈로 사용하지 않음
    } else {
      // 이미지 모드인데 URL이 없으면 깔끔한 흰 배경으로
      wrapperStyle.backgroundColor = "#ffffff";
    }
  }

  return (
    <div className="relative min-h-screen px-4 pb-30">
      <div className="fixed inset-0" style={wrapperStyle} />
      <div className="relative max-w-3xl mx-auto w-full pt-8">
        <AuthorHeader user={user} />
        <div className="flex flex-col gap-6 pt-2.5">
          {profile_published && <ProfileBlock profile={profile_published} />}
          {blocks_published ? (
            blocks_published.map((block: Block) => {
              if (block.type === "text") {
                return <TextBlock key={block.id} block={block} />;
              }
              if (block.type === "image") {
                return (
                  <ImageBlock
                    key={block.id}
                    block={block}
                    style={style_published}
                  />
                );
              }
              if (block.type === "link") {
                return (
                  <LinkBlock
                    key={block.id}
                    block={block}
                    style={style_published}
                  />
                );
              }
              if (block.type === "sns") {
                return (
                  <SNSBlock
                    key={block.id}
                    block={block}
                    style={style_published}
                  />
                );
              }
              if (block.type === "work") {
                return (
                  <WorkBlock
                    key={block.id}
                    block={block}
                    style={style_published}
                  />
                );
              }
              if (block.type === "calendar") {
                return (
                  <CalendarBlock
                    key={block.id}
                    block={block}
                    style={style_published}
                  />
                );
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
    </div>
  );
}
