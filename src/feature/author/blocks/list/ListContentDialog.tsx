import { ResponsiveDialog } from "@/shared/ui/ResponsiveDialog";
import { Badge } from "@/shared/ui/badge";
import { WorkItem } from "@/entities/page/model/types";

interface ListContentDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  item?: WorkItem;
}

export default function ListContentDialog({
  open,
  onOpenChange,
  item,
}: ListContentDialogProps) {
  const hasLink = Boolean(item?.url);
  const isRepresentative = item?.is_representative;
  const title = item?.title ?? "제목 없음";
  const description = item?.description?.trim();

  const handleSubmit = () => {
    if (hasLink) {
      window.open(item!.url, "_blank");
    }
  };

  return (
    <ResponsiveDialog
      trigger={undefined}
      open={open}
      onOpenChange={onOpenChange}
      title="상세"
      submitText="링크 열기"
      onSubmit={handleSubmit}
      isSubmit={hasLink}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          {isRepresentative && (
            <Badge variant="primary-outline" className="text-xs">
              대표 항목
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
