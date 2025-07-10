import { Badge } from "@/components/ui/badge";
import AuthorTagDialog from "@/feature/admin/dialog/TagsDialog";
import { AuthorTag } from "@/feature/user/type";
import EmpltyText from "@/components/ui/EmptyText";

interface ProfileTagsProps {
  userId: string;
  tags: AuthorTag[];
}

export default function ProfileTags({ userId, tags }: ProfileTagsProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">관심 분야</h3>
        <AuthorTagDialog userId={userId} tags={tags} />
      </div>

      {!tags || tags.length === 0 ? (
        <EmpltyText message="관심 분야가 없습니다." />
      ) : (
        <div className="flex items-center gap-2">
          {tags.map((tag) => (
            <Badge key={tag.id} variant="outline" size="xs">
              #{tag.tag}
            </Badge>
          ))}
        </div>
      )}
    </section>
  );
}
