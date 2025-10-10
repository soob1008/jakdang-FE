import { Block, BlockDataBlank } from "@/entities/page/model/types";

interface BlankBlockProps {
  block: Block;
}

export default function BlankBlock({ block }: BlankBlockProps) {
  const { height } = block.data as BlockDataBlank;

  return <div style={{ height }}></div>;
}
