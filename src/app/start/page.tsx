import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import Image from "next/image";

export default function StartPage() {
  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-3.5rem)] lg:justify-center">
      <div className="flex flex-col items-center text-center pt-12 lg:pt-20">
        <Image
          src="/assets/mobile_web.svg"
          alt="모바일 디자인"
          width={300}
          height={300}
          className="mb-6"
        />
        <h2 className="mt-10 text-xl font-semibold text-left lg:text-center lg:text-2xl">
          작가들의 모든 창작이 <br className="lg:hidden" />
          모이고, 드러나고, 당당해지는 공간
        </h2>
      </div>
      <div className="w-full max-w-md mx-auto pb-10">
        <LinkButton
          href="/login"
          label="작가공간 만들러가기"
          className="mt-10"
        />
      </div>
    </div>
  );
}
