"use client";

import { renderBlock } from "@/entities/page/lib/renderBlock";
import useWorks from "@/feature/admin/works/hooks/useWorks";
import type {
  Block,
  PageStyle,
  BlockDataWork,
} from "@/entities/page/model/types";
import WorkBlock from "@/feature/author/blocks/work/WorkBlock";

export default function PageRenderer({
  blocks,
  style,
}: {
  blocks: Block[];
  style: PageStyle;
}) {
  const workIds = blocks
    .filter((b) => b.type === "work")
    .map((b) => (b.data as BlockDataWork).work?.id)
    .filter((id): id is string => id !== undefined);

  const { data: works = [] } = useWorks({ isPublic: true, ids: workIds });
  const workMap = new Map(works.map((w) => [w.id, w]));

  return (
    <>
      {blocks.map((block) => {
        if (block.type === "work") {
          const workId = (block.data as BlockDataWork).work?.id;
          const work = workMap.get(workId || "");
          return work ? <WorkBlock key={block.id} work={work} /> : null;
        }
        return renderBlock(block, style);
      })}
    </>
  );
}
