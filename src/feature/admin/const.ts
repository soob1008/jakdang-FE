import { Settings, Blocks, Brush, Book } from "lucide-react";

export const MENUS = [
  {
    label: "콘텐츠",
    items: [
      {
        label: "작품관리",
        href: "/admin/works",
        icon: Book,
      },
    ],
  },
  {
    label: "페이지",
    items: [
      {
        label: "구성하기",
        href: "/admin/compose",
        icon: Blocks,
      },
      {
        label: "꾸미기",
        href: "/admin/design",
        icon: Brush,
      },
    ],
  },
  {
    label: "설정",
    items: [
      {
        label: "설정",
        href: "/admin/setting",
        icon: Settings,
      },
    ],
  },
];
