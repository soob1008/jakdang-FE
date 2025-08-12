import { Block } from "@/feature/admin/types";
import TextBlock from "@/feature/author/blocks/TextBlock";
import ImageBlock from "@/feature/author/blocks/ImageBlock";
import LinkBlock from "@/feature/author/blocks/LinkBlock";
import SNSBlock from "@/feature/author/blocks/SNSBlock";
import WorkBlock from "@/feature/author/blocks/work/WorkBlock";
import CalendarBlock from "@/feature/author/blocks/CalendarBlock";
import BlankBlock from "@/feature/author/blocks/BlankBlock";
import { PageStyle } from "@/feature/admin/types";

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
      return <WorkBlock block={block} isPreview style={style} />;

    case "calendar":
      return <CalendarBlock block={block} style={style} />;

    case "blank":
      return <BlankBlock block={block} />;

    default:
      return null;
  }
}
