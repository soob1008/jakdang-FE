import { AuthorIntroDialog } from "@/feature/profile/dialog/AuthorIntroDialog";

export default function AuthorIntro() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">한 줄 문장</h3>
        <AuthorIntroDialog />
      </div>
      <p className="text-gray-500">
        우연히 마주친 문장이 당신을 닮았으면 좋겠어요.
      </p>
    </section>
  );
}
