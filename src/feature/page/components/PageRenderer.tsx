import { renderBlock } from "@/entities/page/lib/renderBlock";
import type {
  Block,
  PageStyle,
  BlockDataWork,
} from "@/entities/page/model/types";
import type { Work } from "@/entities/work/model/type";
import WorkBlock from "@/feature/author/blocks/work/WorkBlock";
import { fetchServerAPI } from "@/shared/lib/api/api.server";
interface PageRendererProps {
  blocks: Block[];
  style: PageStyle;
}

export default async function PageRenderer({
  blocks,
  style,
}: PageRendererProps) {
  const workIds = blocks
    .filter((block) => block.type === "work")
    .map((block) => {
      const { work } = block.data as BlockDataWork;
      return work?.id;
    });

  const works: Work[] = workIds.length
    ? await fetchServerAPI<Work[]>(
        `/works?ids=${encodeURIComponent(workIds.join(","))}&is_public=true`
      )
    : [];

  const workMap = new Map(works.map((work) => [work.id, work]));

  return (
    <>
      {blocks.map((block) => {
        if (block.type === "work") {
          const workId = (block.data as BlockDataWork).work?.id;
          const work = workId ? workMap.get(workId) : undefined;

          if (!work) {
            return null;
          }

          return <WorkBlock key={block.id} work={work} />;
        }
        return renderBlock(block, style);
      })}
    </>
  );
}
