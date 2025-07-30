import { BlockDefault, BlockType } from "@/feature/admin/types";

export function createDefaultBlock(type: BlockType): BlockDefault {
  switch (type) {
    case "text":
      return {
        type,
        name: "텍스트",
        data: {
          title: "",
          text: "",
          align: "left",
          font_size: "base",
        },
      };
    case "image":
      return {
        type,
        name: "이미지",
        data: {
          url: "",
          alt: "",
        },
      };
    case "link":
      return {
        type,
        name: "링크",

        data: {
          links: [],
        },
      };
    // case "sns":
    //   return {
    //     type,
    //     name: "SNS",
    //     data: {
    //       links: [],
    //     },
    //   };
    // case "calendar":
    //   return {
    //     type,
    //     name: "일정",
    //     data: {
    //       items: [],
    //       displayMode: "list",
    //     },
    //   };
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
    // case "work":
    //   return {
    //     id: nanoid(),
    //     type,
    //     name: "작품",
    //     data: {
    //       workIds: [],
    //       layout: "grid",
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
