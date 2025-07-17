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
import { Skeleton } from "@/components/ui/skeleton";

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
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <div className="relative w-full aspect-[1] overflow-hidden rounded-md shadow-sm">
        {!loaded && (
          <Skeleton className="absolute top-0 left-0 w-full h-full" />
        )}
        <Image
          src={`${
            work.image_url
              ? process.env.NEXT_PUBLIC_IMAGE_URL + work.image_url
              : "/assets/basic_book.jpg"
          }`}
          alt="작품 이미지"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, 50vw"
          onLoad={() => setLoaded(true)}
        />
        {work.is_representative && (
          <Badge className="absolute top-2 left-2" size="xs">
            대표작
          </Badge>
        )}
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
      <div className="pt-4">
        <h4 className="font-semibold truncate">{work.title}</h4>
        <p className="mt-2 h-10 text-sm text-gray-500 line-clamp-2">
          {work.description || "작품 설명이 없습니다."}
        </p>
        <div className="flex mt-4 items-center justify-between">
          {work.url ? (
            <a
              href={work.url}
              className="flex items-center gap-2 text-sm text-gray-500 truncate max-w-[70%] hover:underline"
            >
              외부 링크
              {/* <ExternalLink className="w-3 h-3" /> */}
            </a>
          ) : (
            <div />
          )}
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
