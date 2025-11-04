import { Block, BlockDataText } from "@/entities/page/model/types";
import TextBlockClient from "./TextBlockClient";

interface TextBlockProps {
  block: Block;
}

export default function TextBlock({ block }: TextBlockProps) {
  const { content } = block.data as BlockDataText;

  return <TextBlockClient content={content} />;
}
