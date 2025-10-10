import { ResponsiveDialog } from "@/shared/ui/ResponsiveDialog";
import { Badge } from "@/shared/ui/badge";
import { AuthorWork } from "@/entities/author/model/types";

interface WorkDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  work?: AuthorWork;
}

export default function WorkDialog({
  open,
  onOpenChange,
  work,
}: WorkDialogProps) {
  const hasLink = Boolean(work?.url);
  const isRepresentative = work?.is_representative;
  const title = work?.title ?? "제목 없음";
  const description = work?.description?.trim();

  const handleSubmit = () => {
    if (hasLink) {
      window.open(work!.url, "_blank");
    }
  };

  return (
    <ResponsiveDialog
      trigger={undefined}
      open={open}
      onOpenChange={onOpenChange}
      title="작품 상세"
      submitText="작품 링크"
      onSubmit={handleSubmit}
      isSubmit={hasLink}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          {isRepresentative && (
            <Badge variant="primary-outline" className="text-xs">
              대표작
            </Badge>
          )}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        {description && (
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {description}
          </p>
        )}
      </div>
    </ResponsiveDialog>
  );
}
