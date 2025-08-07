import Image from "next/image";
import clsx from "clsx";
import { Block, BlockDataImage } from "@/feature/admin/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ImageBlockProps {
  block: Block;
}

export default function ImageBlock({ block }: ImageBlockProps) {
  if (!block.is_active) return null;

  const {
    images,
    style = "single",
    display = "fill",
    columns = 1,
  } = block.data as BlockDataImage;

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
        <p className="text-gray-500">이미지가 없습니다.</p>
      </div>
    );
  }

  const imageClass = display === "fill" ? "object-cover" : "object-contain";

  const renderImage = (
    img: (typeof images)[number],
    idx: number,
    className?: string
  ) => {
    const content = (
      <div
        key={idx}
        className={clsx(
          "relative w-full h-64 rounded overflow-hidden",
          className
        )}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${img.url}`}
          alt={img.alt || "이미지"}
          fill
          className={clsx("transition-all", imageClass)}
        />
      </div>
    );

    return img.link ? (
      <a
        key={idx}
        href={img.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    ) : (
      content
    );
  };

  if (style === "single") {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">{renderImage(images[0], 0)}</div>
      </div>
    );
  }

  if (style === "grid") {
    const colClass =
      {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
      }[columns] || "grid-cols-1";

    return (
      <div className={clsx("grid gap-4", colClass)}>
        {images.map((img, idx) => renderImage(img, idx))}
      </div>
    );
  }

  if (style === "carousel") {
    return (
      <Carousel className="w-full max-w-6xl mx-auto">
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="basis-1/2 md:basis-1/3">
              {renderImage(img, idx, "h-64")}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  return null;
}
