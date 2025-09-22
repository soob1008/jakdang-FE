import ProfileBlock from "@/feature/author/blocks/ProfileBlock";
import { fetchServer } from "@/shared/lib/api/api.server";
import { Author } from "@/entities/author/model/types";
import { Block, Page } from "@/entities/block/model/types";
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
import BookBlock from "@/feature/author/blocks/BookBlock";
import Link from "next/link";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { Metadata } from "next";
import { BlockDataBook } from "@/entities/block/model/types";

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

type MetadataProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { id: slug } = await params;

  const { user: author, page } = await fetchServer<{
    user: Author;
    page: Page;
  }>(`/api/author/${slug}`);

  const blocks = page?.blocks_published || [];
  const book = blocks.find((block) => block.type === "book");
  const { mode, search, manual, thumbnail } =
    (book?.data as BlockDataBook) || {};

  type BookInfo = {
    title?: string;
    author?: string;
    publisher?: string;
    description?: string;
    thumbnail?: string;
  };

  let bookInfo: BookInfo | null = null;

  if (mode === "search") {
    bookInfo = search as BookInfo;
  } else if (mode === "manual") {
    bookInfo = manual as BookInfo;
  }

  const title = bookInfo?.title ?? null;
  const description = bookInfo?.description ?? null;
  const bookAuthor = bookInfo?.author ?? null;
  const publisher = bookInfo?.publisher ?? null;

  return {
    title: book
      ? `${title || "책"} - ${author?.display_name || "작가"}님의 작가 페이지`
      : `${author?.display_name || "작가"}님의 작가 페이지`,
    keywords: [
      title || "책",
      author?.display_name || "작가",
      bookAuthor || "저자",
      publisher || "출판사",
    ],
    description:
      description ||
      `${author?.display_name || "작가"}님의 작품과 소식을 만나보세요.`,
    openGraph: {
      title: title || `${author?.display_name || "작가"}님의 작가 페이지`,
      description:
        description ||
        `${author?.display_name || "작가"}님의 작품과 소식을 만나보세요.`,
      images: thumbnail
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${thumbnail}`
        : `${process.env.NEXT_PUBLIC_IMAGE_URL}${
            author?.profile_published?.avatar_url || "/og-jakdang.jpg"
          }`,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id: slug } = await params;

  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

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

  const { profile_published, display_name } = author;
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
      {!session && (
        <div className="fixed bottom-14 left-1/2 transform -translate-x-1/2 z-11 w-[80%] px-6 py-3 rounded-full text-sm bg-white shadow-lg text-center">
          <Link
            href="/auth/login"
            className="text-sm font-medium whitespace-nowrap"
          >
            나만의 작가 페이지를 무료로 시작하세요.
          </Link>
        </div>
      )}
      <div className="relative max-w-3xl mx-auto w-full pt-8">
        <AuthorHeader user={user} />
        <div className="flex flex-col gap-12 pt-2.5">
          {profile_published && (
            <ProfileBlock
              profile={profile_published}
              displayName={display_name ?? ""}
            />
          )}
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

              if (block.type === "book") {
                return (
                  <BookBlock
                    key={block.id}
                    block={block}
                    style={style_published}
                  />
                );
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
