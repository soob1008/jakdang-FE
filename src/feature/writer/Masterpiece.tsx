import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Masterpiece() {
  return (
    <section className="mt-20">
      <h2 className="mb-3 font-bold text-lg">대표작</h2>
      <Carousel>
        <CarouselContent>
          {[1, 2, 3, 4].map((item) => (
            <CarouselItem key={item} className="basis-2/3 sm:basis-1/3">
              <div className="bg-gray-300 aspect-square" />
              <div className="mt-2 text-sm font-semibold">랑과 나의 사막</div>
              <p className="text-xs text-gray-500">
                사막에서 만난 새로운 만남과 이별을 담은 우리들의 이야기
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
