import { Badge } from "@/components/ui/badge";
import AuthorTagDialog from "@/feature/profile/dialog/TagsDialog";
import { AuthorTag } from "@/feature/user/type";

interface ProfileTagsProps {
  id: string;
  tags: AuthorTag[];
}

export default function ProfileTags({ id, tags }: ProfileTagsProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">관심 분야</h3>
        <AuthorTagDialog id={id} tags={tags} />
      </div>
      <div className="flex items-center gap-2">
        {!tags || tags.length === 0 ? (
          <p className="text-gray-500">관심 분야가 없습니다.</p>
        ) : (
          tags.map((tag) => (
            <Badge key={tag.id} variant="outline">
              #{tag.tag}
            </Badge>
          ))
        )}
      </div>
    </section>
  );
}
