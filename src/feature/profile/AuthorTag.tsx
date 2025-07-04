import { Badge } from "@/components/ui/badge";
import AuthorTagDialog from "@/feature/profile/dialog/AuthorTagDialog";

export default function AuthorTag() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">관심 분야</h3>
        <AuthorTagDialog />
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline">#판타지</Badge>
      </div>
    </section>
  );
}
