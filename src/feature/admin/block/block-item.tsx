"use client";

import { GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { BlockType } from "@/feature/admin/types";

interface BlockItemProps {
  type: BlockType;
}

const blockMeta: Record<BlockType, { title: string }> = {
  text: { title: "글 블록" },
  image: { title: "이미지 블록" },
  work: { title: "작품 블록" },
  link: { title: "링크모음 블록" },
  notice: { title: "공지/일정 블록" },
  challenge: { title: "글쓰기 챌린지 블록" },
  series: { title: "연재리스트 블록" },
};

export default function BlockItem({ type }: BlockItemProps) {
  const [open, setOpen] = useState(true);
  const { title } = blockMeta[type];

  return (
    <section className="bg-white rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-gray-400" />
          <h4 className="font-semibold">{title}</h4>
        </div>
        <button
          className="text-gray-500 hover:text-black"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Collapsible Options Area */}
      {open && (
        <div className="px-5 pb-5">
          <BlockOptions type={type} />
        </div>
      )}
    </section>
  );
}

function BlockOptions({ type }: { type: BlockType }) {
  switch (type) {
    case "text":
      return <p className="text-sm text-gray-500">문장을 입력할 수 있어요.</p>;
    case "image":
      return <p className="text-sm text-gray-500">이미지를 업로드하세요.</p>;
    case "work":
      return <p className="text-sm text-gray-500">대표 작품을 설정하세요.</p>;
    case "link":
      return <p className="text-sm text-gray-500">링크들을 모아보세요.</p>;
    case "notice":
      return (
        <p className="text-sm text-gray-500">일정이나 공지를 작성하세요.</p>
      );
    case "challenge":
      return <p className="text-sm text-gray-500">챌린지 목표를 설정하세요.</p>;
    case "series":
      return (
        <p className="text-sm text-gray-500">연재할 콘텐츠를 연결해보세요.</p>
      );
    default:
      return null;
  }
}
