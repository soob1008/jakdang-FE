import {
  FileText,
  ImageIcon,
  Link2,
  CalendarIcon,
  Medal,
  BookOpenText,
  ListChecks,
  Network,
} from "lucide-react";

export const BLOCK_LIST = [
  {
    category: "기본",
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
        type: "link",
        name: "링크",
        description: "외부 링크를 연결해요",
        icon: Link2,
      },
    ],
  },
  {
    category: "정보",
    blocks: [
      {
        type: "sns",
        name: "SNS",
        description: "SNS 링크를 연결해요",
        icon: Network,
      },
      {
        type: "calendar",
        name: "일정",
        description: "일정을 공유해요",
        icon: CalendarIcon,
      },
      {
        type: "event",
        name: "이벤트",
        description: "진행 중인 이벤트를 보여줘요",
        icon: ListChecks,
      },
    ],
  },
  {
    category: "콘텐츠",
    blocks: [
      {
        type: "work",
        name: "작품",
        description: "대표 작품을 보여줘요",
        icon: BookOpenText,
      },
      {
        type: "challenge",
        name: "챌린지",
        description: "진행 중인 챌린지를 보여줘요",
        icon: Medal,
      },
    ],
  },
];
