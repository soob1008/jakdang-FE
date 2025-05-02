import LinkButton from "@/components/ui/LinkButton";

export default function Home() {
  return (
    <div className="flex flex-col gap-[32px] w-full h-full justify-between row-start-2 items-center sm:items-start">
      <section className="relative pt-16">
        <h1 className="text-[40px] font-bold mb-2 ">🎉 Joiny</h1>
        <p className="text-gray-600">
          우리의 소중한 약속을 귀엽고 쉽게 담아보세요.
        </p>
      </section>
      <LinkButton label="초대장 만들러 가기" href="/write" />
    </div>
  );
}
