import ProfileBlock from "@/feature/author/blocks/ProfileBlock";
import TextBlock from "@/feature/author/blocks/TextBlock";
import ImageBlock from "@/feature/author/blocks/ImageBlock";
import LinkBlock from "@/feature/author/blocks/LinkBlock";
import SNSBlock from "@/feature/author/blocks/SNSBlock";
import WorkBlock from "@/feature/author/blocks/work/WorkBlock";
import CalendarBlock from "@/feature/author/blocks/CalendarBlock";
import BlankBlock from "@/feature/author/blocks/BlankBlock";
import BookBlock from "@/feature/author/blocks/BookBlock";
import type { Block, Page, PageStyle } from "@/entities/page/model/types";
import type { Author } from "@/entities/author/model/types";

type AuthorPageBlocksProps = {
  author: Author;
  page: Page;
};

export function AuthorPageBlocks({ author, page }: AuthorPageBlocksProps) {
  const blocks = page.blocks_published ?? [];
  const style: PageStyle | undefined = page.style_published;

  return (
    <div className="flex flex-col gap-12 pt-2.5">
      {author.profile_published && (
        <ProfileBlock
          profile={author.profile_published}
          displayName={author.display_name ?? ""}
        />
      )}
      {blocks.length ? (
        blocks.map((block) => renderBlock(block, style))
      ) : (
        <p className="pt-18 text-center text-gray-500">
          작가님의 콘텐츠가 준비 중입니다.
        </p>
      )}
    </div>
  );
}

function renderBlock(block: Block, style?: PageStyle) {
  switch (block.type) {
    case "text":
      return <TextBlock key={block.id} block={block} />;
    case "image":
      return <ImageBlock key={block.id} block={block} style={style} />;
    case "link":
      return <LinkBlock key={block.id} block={block} style={style} />;
    case "sns":
      return <SNSBlock key={block.id} block={block} style={style} />;
    case "work":
      return <WorkBlock key={block.id} block={block} style={style} />;
    case "calendar":
      return <CalendarBlock key={block.id} block={block} style={style} />;
    case "blank":
      return <BlankBlock key={block.id} block={block} />;
    case "book":
      return <BookBlock key={block.id} block={block} style={style} />;
    default:
      return (
        <div key={block.id} className="text-center text-sm text-gray-500">
          지원하지 않는 블럭입니다.
        </div>
      );
  }
}
