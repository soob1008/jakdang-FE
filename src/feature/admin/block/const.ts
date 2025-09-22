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
import { BlockType, TemplateType } from "@/entities/block/model/types";

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
    category: "요소",
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
      {
        type: "calendar",
        name: "일정",
        description: "일정을 공유해요",
        icon: CalendarIcon,
      },
      {
        type: "work",
        name: "리스트",
        description: "대표 작품을 보여줘요",
        icon: LayoutList,
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
