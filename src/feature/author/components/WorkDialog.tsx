import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";
import { Badge } from "@/components/ui/badge";
import { AuthorWork } from "@/feature/user/type";

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
  return (
    <ResponsiveDialog
      trigger={undefined}
      open={open}
      onOpenChange={onOpenChange}
      title="작품 상세"
      // isSubmit={false}
      submitText="작품 링크"
      onSubmit={() => {
        window.open(work?.url ?? "", "_blank");
      }}
      isSubmit={!!work?.url}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          {work?.is_representative && (
            <Badge variant="primary-outline" className="text-xs">
              대표작
            </Badge>
          )}
          <h2 className="text-xl font-semibold">{work?.title}</h2>
        </div>

        {work?.description && (
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {work?.description}
          </p>
        )}
      </div>
    </ResponsiveDialog>
  );
}
