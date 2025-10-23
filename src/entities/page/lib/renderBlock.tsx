import TextBlock from "@/feature/author/blocks/TextBlock";
import ImageBlock from "@/feature/author/blocks/ImageBlock";
import LinkBlock from "@/feature/author/blocks/LinkBlock";
import SNSBlock from "@/feature/author/blocks/SNSBlock";
import ListBlock from "@/feature/author/blocks/list/ListBlock";
import CalendarBlock from "@/feature/author/blocks/CalendarBlock";
import BlankBlock from "@/feature/author/blocks/BlankBlock";
import BookBlock from "@/feature/author/blocks/BookBlock";
import type { Block, BlockType, PageStyle } from "@/entities/page/model/types";

const blockComponents: Partial<
  Record<BlockType, React.ComponentType<{ block: Block; style: PageStyle }>>
> = {
  text: TextBlock,
  blank: BlankBlock,
  image: ImageBlock,
  link: LinkBlock,
  sns: SNSBlock,
  list: ListBlock,
  calendar: CalendarBlock,
  book: BookBlock,
};

export function renderBlock(block: Block, style: PageStyle) {
  const Component = blockComponents[block.type];

  if (!Component) {
    return (
      <div key={block.id} className="text-center text-sm text-gray-500">
        지원하지 않는 블럭입니다.
      </div>
    );
  }

  return <Component key={block.id} block={block} style={style} />;
}
