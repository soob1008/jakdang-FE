import type {
  Block,
  BlockDataWork,
} from "@/entities/page/model/types";
import type { Work } from "@/entities/work/model/type";

export function collectWorkIds(blocks: Block[]): string[] {
  const ids = new Set<string>();
  blocks.forEach((block) => {
    if (block.type !== "work") return;
    const data = block.data as BlockDataWork | undefined;
    const workId = data?.work?.id;
    if (workId) ids.add(workId);
  });
  return Array.from(ids);
}

export function mapWorksById(works: Work[] = []): Map<string, Work> {
  return works.reduce((map, work) => {
    map.set(work.id, work);
    return map;
  }, new Map<string, Work>());
}

export function attachWorkToBlock(block: Block, worksById: Map<string, Work>): Block {
  if (block.type !== "work") return block;

  const data = block.data as BlockDataWork | undefined;
  if (!data?.work?.id) return block;

  const matched = worksById.get(data.work.id);
  if (!matched) return block;

  return {
    ...block,
    data: {
      ...data,
      work: matched,
    },
  };
}

export function attachWorksToBlocks(blocks: Block[], worksById: Map<string, Work>): Block[] {
  if (!worksById.size) return blocks;
  return blocks.map((block) => attachWorkToBlock(block, worksById));
}
