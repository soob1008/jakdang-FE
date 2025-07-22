import Preview from "@/feature/admin/preview";
import { Button } from "@/components/ui/button";
import BlockItem from "@/feature/admin/block/block-item";

export default function AdminBlockPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6  h-full">
      {/* 좌측 콘텐츠 (스크롤 영역) */}
      <article className="pr-2 flex flex-col gap-4 pt-4 pl-10 pb-24 max-w-[900px] w-full mx-auto lg:max-w-none">
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-xl font-gong font-medium">페이지 구성</h2>
          <Button className="w-fit">추가하기</Button>
        </div>
        {[
          "text",
          "image",
          "link",
          "work",
          "notice",
          "challenge",
          "series",
          "text",
          "image",
          "link",
          "work",
          "notice",
          "challenge",
          "series",
        ].map((type, i) => (
          <BlockItem key={i} type={type as any} />
        ))}
      </article>

      {/* 우측 프리뷰 (고정) */}
      <Preview />
    </div>
  );
}
