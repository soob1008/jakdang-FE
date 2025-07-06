import { AuthorIntroDialog } from "@/feature/profile/dialog/AuthorIntroDialog";

interface AuthorIntroProps {
  id: string;
  intro: string;
}

export default function AuthorIntro({ id, intro }: AuthorIntroProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">한 줄 문장</h3>
        <AuthorIntroDialog id={id} intro={intro} />
      </div>
      <p className="text-gray-500">{intro || "한 줄 문장이 없습니다."}</p>
    </section>
  );
}
