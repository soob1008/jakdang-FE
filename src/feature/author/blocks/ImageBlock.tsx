import Image from "next/image";
import clsx from "clsx";
import { Block, BlockDataImage } from "@/feature/admin/types";

interface ImageBlockProps {
  block: Block;
}

export default function ImageBlock({ block }: ImageBlockProps) {
  if (!block.is_active) return null;

  const { images, direction, columns, link } = block.data as BlockDataImage;

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
        <p className="text-gray-500">이미지가 없습니다.</p>
      </div>
    );
  }

  // 방향에 따른 flex 설정
  const directionClass =
    direction === "horizontal" ? "flex-row gap-4" : "flex-col gap-4";

  // columns 값에 따라 grid 클래스 적용
  const gridClass = columns
    ? `grid grid-cols-${columns} gap-4`
    : direction === "horizontal"
    ? "flex gap-4"
    : "flex flex-col gap-4";

  // 이미지 렌더링
  const renderImage = (img: (typeof images)[number], idx: number) => {
    const imageElement = (
      <div
        key={idx}
        className="relative w-full h-64 rounded-lg overflow-hidden"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${img.url}`}
          alt={img.alt || "이미지"}
          fill
          className="object-contain"
        />
      </div>
    );

    return link ? (
      <a key={idx} href={link} target="_blank" rel="noopener noreferrer">
        {imageElement}
      </a>
    ) : (
      imageElement
    );
  };

  // 이미지가 한 장이면 중앙 정렬
  if (images.length === 1) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-xl">{renderImage(images[0], 0)}</div>
      </div>
    );
  }

  return (
    <div
      className={clsx(images.length > 1 ? gridClass : "flex justify-center")}
    >
      {images.map((img, idx) => renderImage(img, idx))}
    </div>
  );
}
