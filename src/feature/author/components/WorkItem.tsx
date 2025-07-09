import Image from "next/image";

export default function WorkItem() {
  return (
    <div>
      <div className="relative w-full aspect-[1] overflow-hidden rounded-md shadow-sm">
        <Image
          src="/test.png"
          alt="작품 이미지"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      <div className="mt-2">
        <div className="text-sm font-semibold truncate">랑과 나의 사막</div>
        <p className="text-xs text-gray-500 line-clamp-2">
          사막에서 만난 새로운 만남과 이별을 담은 우리들의 이야기
        </p>
      </div>
    </div>
  );
}
