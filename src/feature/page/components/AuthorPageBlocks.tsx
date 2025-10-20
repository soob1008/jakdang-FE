import ProfileBlock from "@/feature/author/blocks/ProfileBlock";
import PageRenderer from "@/feature/page/components/PageRenderer";
import type { Page, PageStyle } from "@/entities/page/model/types";
import type { Author } from "@/entities/author/model/types";

type AuthorPageBlocksProps = {
  author: Author;
  page: Page;
};

export default async function AuthorPageBlocks({
  author,
  page,
}: AuthorPageBlocksProps) {
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
        <PageRenderer blocks={blocks} style={style || {}} />
      ) : (
        <p className="pt-18 text-center text-gray-500">
          작가님의 콘텐츠가 준비 중입니다.
        </p>
      )}
    </div>
  );
}
