import { Block } from "@/entities/page/model/types";
import TextBlock from "@/feature/author/blocks/TextBlock";
import ImageBlock from "@/feature/author/blocks/ImageBlock";
import LinkBlock from "@/feature/author/blocks/LinkBlock";
import SNSBlock from "@/feature/author/blocks/SNSBlock";
import ListBlock from "@/feature/author/blocks/list/ListBlock";
import CalendarBlock from "@/feature/author/blocks/CalendarBlock";
import BlankBlock from "@/feature/author/blocks/BlankBlock";
import BookBlock from "@/feature/author/blocks/BookBlock";
import { PageStyle } from "@/entities/page/model/types";

export default function BlockPreview({
  block,
  style,
}: {
  block: Block;
  style: PageStyle;
}) {
  switch (block.type) {
    case "text":
      return <TextBlock block={block} />;

    case "image":
      return <ImageBlock block={block} isPreview style={style} />;

    case "link":
      return <LinkBlock block={block} style={style} />;

    case "sns":
      return <SNSBlock block={block} style={style} />;

    case "work":
      return <div>작품</div>;
    case "list":
      return <ListBlock block={block} isPreview style={style} />;

    case "calendar":
      return <CalendarBlock block={block} style={style} />;

    case "blank":
      return <BlankBlock block={block} />;

    case "book":
      return <BookBlock block={block} style={style} />;
    default:
      return null;
  }
}
