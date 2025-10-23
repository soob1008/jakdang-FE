import { ResponsiveDialog } from "@/shared/ui/ResponsiveDialog";
import { Badge } from "@/shared/ui/badge";
import { ListItem } from "@/entities/page/model/types";
import Image from "next/image";

interface ListContentDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  item?: ListItem;
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
        {item?.image_url && (
          <div className="overflow-hidden w-full rounded-md max-h-76 ">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image_url}`}
              alt={item?.title || "리스트 항목 이미지"}
              width={400}
              height={300}
              className="object-contain max-h-76 mx-auto"
            />
          </div>
        )}

        {description && (
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {description}
          </p>
        )}
      </div>
    </ResponsiveDialog>
  );
}
