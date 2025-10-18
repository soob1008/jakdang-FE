import {
  FileText,
  ImageIcon,
  Link2,
  CalendarIcon,
  BookOpenText,
  Network,
  AlignVerticalSpaceAround,
  User,
  LayoutList,
} from "lucide-react";
import { BlockType, TemplateType } from "@/entities/page/model/types";

interface BlockList {
  category: string;
  blocks: {
    type: BlockType | TemplateType;
    name: string;
    description?: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    imageSrc?: string;
  }[];
}

export const BLOCK_LIST: BlockList[] = [
  {
    category: "기본 요소",
    blocks: [
      {
        type: "text",
        name: "텍스트",
        icon: FileText,
      },
      {
        type: "image",
        name: "이미지",
        icon: ImageIcon,
      },
      {
        type: "blank",
        name: "여백",
        icon: AlignVerticalSpaceAround,
      },
      {
        type: "link",
        name: "링크",
        icon: Link2,
      },
      {
        type: "list",
        name: "리스트",
        icon: LayoutList,
      },
      {
        type: "sns",
        name: "SNS",
        icon: Network,
      },
      {
        type: "calendar",
        name: "일정",
        icon: CalendarIcon,
      },
      {
        type: "book",
        name: "책",
        description: "",
        icon: BookOpenText,
      },
    ],
  },
  {
    category: "콘텐츠",
    blocks: [
      {
        type: "work",
        name: "작품",
        description: "내가 등록한 작품 목록이 표시됩니다.",
        icon: FileText,
      },
    ],
  },
  {
    category: "템플릿",
    blocks: [
      {
        type: "profile",
        name: "프로필",
        icon: User,
        imageSrc: "/assets/template/profile.jpg",
      },
      {
        type: "magazine",
        name: "매거진",
        icon: User,
        imageSrc: "/assets/template/magazine.jpg",
      },
    ],
  },
];
