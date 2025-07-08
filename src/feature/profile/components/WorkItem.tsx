import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash } from "lucide-react";
import { AuthorWork } from "@/feature/user/type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface WorkItemProps {
  work: AuthorWork;
  onEdit: () => void;
  onToggle: (checked: boolean, workId: string) => Promise<void>;
  onDelete: (workId: string) => Promise<void>;
}

export default function WorkItem({
  work,
  onEdit,
  onToggle,
  onDelete,
}: WorkItemProps) {
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);

  return (
    <div>
      <div className="relative w-full aspect-[1] overflow-hidden rounded-md shadow-sm">
        <Image
          src="/test.png"
          alt="작품 이미지"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <Badge className="absolute top-2 left-2">대표작</Badge>
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="icon"
            variant="outline"
            className="w-7 h-7 p-1 rounded-full"
            onClick={onEdit}
            aria-label="Edit Work"
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <AlertDialog
            open={isOpenDeleteAlert}
            onOpenChange={setIsOpenDeleteAlert}
          >
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="w-7 h-7 p-1 rounded-full"
                aria-label="Delete Work"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>삭제하시겠습니까?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(work.id)}>
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="mt-2">
        <div className="text-sm font-semibold truncate">랑과 나의 사막</div>
        <p className="text-xs text-gray-500 line-clamp-2">
          사막에서 만난 새로운 만남과 이별을 담은 우리들의 이야기
        </p>
        <div className="flex mt-2 items-center justify-between">
          <div className="text-xs text-gray-500 truncate max-w-[70%]">
            https://example.com
          </div>
          <Switch
            className="ml-2"
            checked={work.is_active}
            onCheckedChange={(checked) => onToggle(checked, work.id)}
          />
        </div>
      </div>
    </div>
  );
}
