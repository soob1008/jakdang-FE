import {
  FileText,
  ImageIcon,
  Link2,
  CalendarIcon,
  BookOpenText,
  Network,
  AlignVerticalSpaceAround,
} from "lucide-react";

export const BLOCK_LIST = [
  {
    category: "기본 구성",
    blocks: [
      {
        type: "text",
        name: "텍스트",
        description: "간단한 문장을 작성해요",
        icon: FileText,
      },
      {
        type: "image",
        name: "이미지",
        description: "이미지를 업로드하거나 링크를 연결해요",
        icon: ImageIcon,
      },
      {
        type: "blank",
        name: "여백",
        description: "블록 사이에 공간을 만들어요",
        icon: AlignVerticalSpaceAround,
      },
    ],
  },
  {
    category: "링크 연결",
    blocks: [
      {
        type: "link",
        name: "링크",
        description: "외부 링크를 연결해요",
        icon: Link2,
      },
      {
        type: "sns",
        name: "SNS",
        description: "SNS 링크를 연결해요",
        icon: Network,
      },
    ],
  },
  {
    category: "일정 공유",
    blocks: [
      {
        type: "calendar",
        name: "일정",
        description: "일정을 공유해요",
        icon: CalendarIcon,
      },
    ],
  },
  {
    category: "작품 소개",
    blocks: [
      {
        type: "work",
        name: "작품",
        description: "대표 작품을 보여줘요",
        icon: BookOpenText,
      },
    ],
  },
];
