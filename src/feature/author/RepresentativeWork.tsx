import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AuthorProfile } from "@/feature/user/type";

interface RepresentativeWorkProps {
  user: AuthorProfile;
}

export default function RepresentativeWork({ user }: RepresentativeWorkProps) {
  return (
    <section className="mt-20">
      <h2 className="mb-3 font-bold text-lg">대표작</h2>
      <Carousel>
        <CarouselContent>
          {user.user_works.map((work) => (
            <CarouselItem key={work.id} className="basis-2/3 sm:basis-1/3">
              <div className="bg-gray-300 aspect-square" />
              <div className="mt-2 text-sm font-semibold">{work.title}</div>
              <p className="text-xs text-gray-500 line-clamp-2">
                {work.description}
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
