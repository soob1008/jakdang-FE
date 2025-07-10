import EmptyText from "@/components/ui/EmptyText";
import { AuthorBioDialog } from "@/feature/admin/dialog/AuthorBioDialog";

interface AuthorBioProps {
  userId: string;
  bio: string;
}

export default function AuthorBio({ userId, bio }: AuthorBioProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">소개</h3>
        <AuthorBioDialog userId={userId} bio={bio} />
      </div>
      {bio ? (
        <p className="text-gray-500 whitespace-pre-line">{bio}</p>
      ) : (
        <EmptyText message="작가 소개가 없습니다." />
      )}
    </section>
  );
}
