import {
  BlockDefault,
  BlockType,
  Block,
  TemplateType,
} from "@/feature/admin/types";

export function createDefaultBlock(type: BlockType): BlockDefault {
  switch (type) {
    case "text":
      return {
        id: crypto.randomUUID(),
        type,
        name: "텍스트",
        data: {
          content: "",
        },
      };
    case "image":
      return {
        id: crypto.randomUUID(),
        type,
        name: "이미지",
        data: {
          images: [],
          style: "single", // 기본값은 single
          columns: "1", // 기본값은 1열
          display: "fill",
        },
      };
    case "link":
      return {
        id: crypto.randomUUID(),
        type,
        name: "링크",
        data: {
          links: [],
        },
      };
    case "sns":
      return {
        id: crypto.randomUUID(),
        type,
        name: "SNS",
        data: {
          sns_links: [],
        },
      };
    case "work":
      return {
        id: crypto.randomUUID(),
        type,
        name: "작품",
        data: {
          works: [],
          layout: "grid",
        },
      };
    case "calendar":
      return {
        id: crypto.randomUUID(),
        type,
        name: "일정",
        data: {
          dates: [],
          layout: "calendar",
        },
      };
    case "blank":
      return {
        id: crypto.randomUUID(),
        type,
        name: "여백",
        data: {
          height: 60, // 기본 높이 60px
        },
      };
    case "book":
      return {
        id: crypto.randomUUID(),
        type,
        name: "책",
        data: {
          thumbnail: "",
          mode: "search",
          search: {
            title: "",
            author: "",
            publisher: "",
          },
          manual: {
            title: "",
            author: "",
            publisher: "",
          },
        },
      };
    // case "event":
    //   return {
    //     id: nanoid(),
    //     type,
    //     name: "이벤트",
    //     data: {
    //       title: "",
    //       date: "",
    //       location: "",
    //       description: "",
    //       registrationLink: "",
    //     },
    //   };

    // case "challenge":
    //   return {
    //     id: nanoid(),
    //     type,
    //     name: "챌린지",
    //     data: {
    //       challengeId: null,
    //       layout: "calendar",
    //     },
    //   };
    default:
      throw new Error(`Unsupported block type: ${type}`);
  }
}

type GetTemplateBlocksArgs = {
  template: TemplateType;
  /** 저장 시 페이지에 연결하고 싶으면 전달, 아니면 생략 */
  pageId?: string;
};

/** 템플릿 블록 묶음(예시데이터 포함) 생성 */
export function getTemplateBlocks(args: GetTemplateBlocksArgs): Block[] | null {
  const { template, pageId } = args;

  switch (template) {
    case "profile": {
      const blocks: Block[] = [
        // 1) SNS 아이콘 (최상단)
        {
          ...createDefaultBlock("sns"),
          is_active: true,
          data: {
            sns_links: [
              {
                platform: "instagram",
                url: "",
                label: "Instagram",
              },
              {
                platform: "threads",
                url: "",
                label: "Threads",
              },
              {
                platform: "brunch",
                url: "",
                label: "Brunch",
              },
              {
                platform: "email",
                url: "",
                label: "Email",
              },
            ],
          },
        } as Block,

        // 2) 소개 텍스트 (선택)
        {
          ...createDefaultBlock("text"),
          is_active: true,
          data: {
            content: "",
          },
        } as Block,

        {
          ...createDefaultBlock("text"),
          is_active: true,
          data: {
            content: "",
          },
        } as Block,

        // 3) 대표작 카드 (3~6개 권장)
        {
          ...createDefaultBlock("work"),
          is_active: true,
          data: {
            title: "대표작",
            works: [
              {
                id: `work-${crypto.randomUUID()}`,
                title: "작품 제목1",
                is_active: true,
                is_representative: true,
                short_description: "작품 간략 설명",
                description: "작품 상세 설명을 여기에 입력하세요.",
                url: "https://your-work-link.com",
              },
              {
                id: `work-${crypto.randomUUID()}`,
                title: "작품 제목2",
                is_active: true,
                is_representative: true,
                short_description: "작품 간략 설명",
                description: "작품 상세 설명을 여기에 입력하세요.",
                url: "https://your-work-link.com",
              },
              {
                id: `work-${crypto.randomUUID()}`,
                title: "작품 제목3",
                is_active: true,
                is_representative: true,
                short_description: "작품 간략 설명",
                description: "작품 상세 설명을 여기에 입력하세요.",
                url: "https://your-work-link.com",
              },
            ],
            layout: "grid", // 카드 레이아웃
          },
        } as Block,

        // 4) 작품 리스트 (필수)
        {
          ...createDefaultBlock("work"),
          is_active: true,
          data: {
            title: "작품",
            layout: "list",
            works: [
              {
                id: `work-${crypto.randomUUID()}`,
                title: "작품 제목1",
                is_active: true,
                is_representative: true,
                short_description: "작품 간략 설명",
                description: "작품 상세 설명을 여기에 입력하세요.",
                url: "https://your-work-link.com",
              },
              {
                id: `work-${crypto.randomUUID()}`,
                title: "작품 제목2",
                is_active: true,
                is_representative: true,
                short_description: "작품 간략 설명",
                description: "작품 상세 설명을 여기에 입력하세요.",
                url: "https://your-work-link.com",
              },
            ],
          },
        } as Block,

        {
          ...createDefaultBlock("link"),
          is_active: true,
          data: {
            links: [
              {
                url: "https://your-portfolio.com",
                label: "포트폴리오",
              },
              {
                url: "https://your-contact.com",
                label: "글 보러가기",
              },
            ],
          },
        } as Block,
      ];

      // position, page_id 보정
      return normalizeBlocks(blocks, pageId);
    }
    case "magazine": {
      const blocks: Block[] = [
        {
          ...createDefaultBlock("text"),
          is_active: true,
          data: {
            content: "",
          },
        } as Block,
        {
          ...createDefaultBlock("image"),
          is_active: true,
          data: {
            style: "single",
            display: "fill",
            columns: "1",
            images: [
              {
                position: 1,
              },
            ],
          },
        } as Block,
        {
          ...createDefaultBlock("text"),
          is_active: true,
          data: {
            content: "",
          },
        } as Block,
        {
          ...createDefaultBlock("text"),
          is_active: true,
          data: {
            content: "",
          },
        } as Block,
        {
          ...createDefaultBlock("work"),
          is_active: true,
          data: {
            title: "",
            works: [
              {
                id: `work-${crypto.randomUUID()}`,
                title: "작품 제목1",
                is_active: true,
                is_representative: true,
                short_description: "작품 간략 설명",
                description: "작품 상세 설명을 여기에 입력하세요.",
                url: "https://your-work-link.com",
              },
              {
                id: `work-${crypto.randomUUID()}`,
                title: "작품 제목2",
                is_active: true,
                is_representative: true,
                short_description: "작품 간략 설명",
                description: "작품 상세 설명을 여기에 입력하세요.",
                url: "https://your-work-link.com",
              },
            ],
            layout: "grid", // 카드 레이아웃
          },
        } as Block,
        {
          ...createDefaultBlock("text"),
          is_active: true,
          data: {
            content: "",
          },
        } as Block,
        {
          ...createDefaultBlock("image"),
          is_active: true,
          data: {
            style: "carousel", // 이미지 슬라이드
            display: "fill",
            columns: "2",
            images: [
              {
                position: 1,
              },
              {
                position: 2,
              },
              {
                position: 3,
              },
            ],
          },
        } as Block,
        {
          ...createDefaultBlock("text"),
          is_active: true,
          data: {
            content: "",
          },
        } as Block,
        {
          ...createDefaultBlock("text"),
          is_active: true,
          data: {
            content: "",
          },
        } as Block,
        {
          ...createDefaultBlock("link"),
          is_active: true,
          data: {
            links: [
              {
                url: "https://your-magazine.com",
                label: "전체 글 보러가기",
              },
            ],
          },
        } as Block,
      ];

      return normalizeBlocks(blocks, pageId);
    }

    default:
      return null;
  }
}

/** position, page_id 세팅 유틸 */
function normalizeBlocks(blocks: Block[], pageId?: string): Block[] {
  return blocks.map((b, i) => ({
    ...b,
    position: i + 1,
    ...(pageId ? { page_id: pageId } : {}),
    is_active: b.is_active ?? true,
  }));
}
