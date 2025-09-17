import Image from "next/image";
import clsx from "clsx";
import { Block, BlockDataImage } from "@/feature/admin/types";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import { PageStyle } from "@/feature/admin/types";

interface ImageBlockProps {
  block: Block;
  style: PageStyle;
  isPreview?: boolean;
}

export default function ImageBlock({
  block,
  isPreview,
  style,
}: ImageBlockProps) {
  if (!block.is_active) return null;

  const {
    images,
    style: imageStyle = "single",
    display = "fill",
    columns = 1,
  } = block.data as BlockDataImage;

  if (!images || images.length === 0) {
    return null;
  }

  const imageClass = display === "fill" ? "object-cover" : "object-contain";

  const renderImage = (
    img: (typeof images)[number],
    idx: number,
    extraClass?: string
  ) => {
    const content = (
      <div
        // 컨테이너 쿼리 사용 시 부모에 container-type 필요
        className={clsx(
          "relative w-full overflow-hidden min-h-40",
          // 기본 4:3 → md에서 16:9 (미디어쿼리)
          "aspect-[4/3] md:aspect-[16/9]",
          style?.button_style === "sharp" ? "rounded-none" : "rounded-lg",
          // 프리뷰 환경에선 컨테이너 쿼리도 추가로 대응
          isPreview ? "@md:aspect-[16/9]" : "",
          extraClass
        )}
      >
        <Image
          src={`${
            img.url
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${img.url}`
              : "/assets/basic_book.jpg"
          }`}
          alt={img.alt || `이미지 ${idx + 1}`}
          fill
          className={clsx("transition-all", imageClass)}
          // 반응형 렌더링 최적화
          sizes="(min-width: 1280px) 1024px, (min-width: 768px) 80vw, 100vw"
          // 우선순위는 필요 시 상위에서 결정
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
      <div key={idx}>{content}</div>
    );
  };

  if (imageStyle === "single") {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">{renderImage(images[0], 0)}</div>
      </div>
    );
  }

  if (imageStyle === "grid") {
    // 데스크톱 기준 columns 값, 모바일/태블릿은 자동 축소
    const desktopCols =
      { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3" }[
        columns
      ] || "lg:grid-cols-1";

    return (
      <div
        className={clsx("grid gap-4 grid-cols-2 md:grid-cols-3", desktopCols)}
      >
        {images.map((img, idx) => renderImage(img, idx))}
      </div>
    );
  }

  if (imageStyle === "carousel") {
    return (
      <div style={{ containerType: "inline-size" }}>
        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent>
            {images.map((img, idx) => (
              <CarouselItem
                key={idx}
                className={clsx(
                  "px-2 basis-1/2 min-h-40",
                  isPreview ? " @md:basis-1/3 " : "md:basis-1/3 lg:basis-1/4"
                )}
              >
                {renderImage(img, idx)}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  return null;
}
