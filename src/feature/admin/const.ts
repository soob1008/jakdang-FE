import { Settings, Blocks, Brush } from "lucide-react";

export const MENUS = [
  {
    label: "나의 공간",
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
  // {
  //   label: "활동",
  //   items: [
  //     {
  //       label: "챌린지 관리",
  //       href: "/admin/challenge",
  //       icon: Medal,
  //     },
  //     {
  //       label: "이벤트 관리",
  //       href: "/admin/event",
  //       icon: Tickets,
  //     },
  //   ],
  // },
  {
    label: "설정",
    items: [
      {
        label: "Setting",
        href: "/admin/setting",
        icon: Settings,
      },
    ],
  },
];
