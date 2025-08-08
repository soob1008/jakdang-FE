import { Block } from "@/feature/admin/types";
import TextBlock from "@/feature/author/blocks/TextBlock";
import ImageBlock from "@/feature/author/blocks/ImageBlock";
import LinkBlock from "@/feature/author/blocks/LinkBlock";
import SNSBlock from "@/feature/author/blocks/SNSBlock";
import WorkBlock from "@/feature/author/blocks/work/WorkBlock";
import CalendarBlock from "@/feature/author/blocks/CalendarBlock";
import BlankBlock from "@/feature/author/blocks/BlankBlock";

export default function BlockPreview({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <TextBlock block={block} />;

    case "image":
      return <ImageBlock block={block} isPreview />;

    case "link":
      return <LinkBlock block={block} />;

    case "sns":
      return <SNSBlock block={block} />;

    case "work":
      return <WorkBlock block={block} isPreview />;

    case "calendar":
      return <CalendarBlock block={block} />;

    case "blank":
      return <BlankBlock block={block} />;

    default:
      return null;
  }
}
