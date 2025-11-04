import {
  Settings,
  Blocks,
  Brush,
  Book,
  CreditCard,
  HandCoins,
} from "lucide-react";

export const MENUS = [
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
    label: "수익",
    items: [
      {
        label: "정산 현황",
        href: "/admin/settlement/summary",
        icon: CreditCard,
      },
      {
        label: "정산 내역",
        href: "/admin/settlement/list",
        icon: HandCoins,
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
