"use client";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AuthorProfile, AuthorWork } from "@/feature/user/type";
import WorkItem from "./components/WorkItem";
import WorkDialog from "./components/WorkDialog";

interface RepresentativeWorkProps {
  user: AuthorProfile;
}

export default function RepresentativeWork({ user }: RepresentativeWorkProps) {
  const [selectedWork, setSelectedWork] = useState<AuthorWork | null>(null);

  return (
    <section>
      <h2 className="mb-5 font-bold text-lg">대표작</h2>
      <Carousel>
        <CarouselContent>
          {user?.user_works.map((work) => {
            if (work.is_representative === false) return null;
            return (
              <CarouselItem key={work.id} className="basis-2/3 sm:basis-1/3">
                <WorkItem work={work} onClick={() => setSelectedWork(work)} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <WorkDialog
        open={!!selectedWork}
        onOpenChange={(open) => {
          if (!open) setSelectedWork(null);
        }}
        work={selectedWork ?? undefined}
      />
    </section>
  );
}
