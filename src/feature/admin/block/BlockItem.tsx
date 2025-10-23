"use client";

import { useEffect, useState } from "react";
import { GripVertical, ChevronDown, ChevronUp, Trash } from "lucide-react";
import { Switch } from "@/shared/ui/switch";
import { Button } from "@/shared/ui/button";
import { FormField, FormItem, FormControl } from "@/shared/ui/form";
import BlockOptions from "./BlockOptions";
import TextBlockEdit from "./text/TextBlockEdit";
import { BlockItemType } from "@/entities/page/model/types";
import ImageBlockEdit from "./image/ImageBlockEdit";
import LinkBlockEdit from "./link/LinkBlockEdit";
import SNSBlockEdit from "./sns/SNSBlockEdit";
import ListBlockEdit from "./list/ListBlockEdit";
import CalendarBlockEdit from "./calendar/CalendarBlockEdit";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/ui/alert-dialog";
import BlankBlockEdit from "./blank/BlankBlockEdit";
import BookBlockEdit from "./book/BookBlockEdit";
import WorkBlockEdit from "./work/WorkBlockEdit";
import useWorks from "@/feature/admin/works/hooks/useWorks";

interface BlockItemProps {
  index: number;
  block: BlockItemType;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  onDelete: () => void;
}

export default function BlockItem({
  index,
  block,
  dragHandleProps,
  onDelete,
}: BlockItemProps) {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: works } = useWorks({
    isPublic: true,
  });

  useEffect(() => {
    const id = localStorage.getItem("selected-block-id");
    setSelectedBlockId(
      id !== null && id !== undefined && id !== "" ? id : null
    );
  }, []);

  const isOpen = selectedBlockId === block.id;

  const handleToggle = () => {
    const next = isOpen ? null : block.id;
    localStorage.setItem("selected-block-id", next ?? "");
    setSelectedBlockId(next ?? null);
  };

  return (
    <section className="bg-white rounded-lg shadow-sm">
      {/* 헤더 영역 */}
      <div
        className="flex items-center justify-between p-3 border-b"
        {...dragHandleProps}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
          <h4 className="font-semibold">
            {block.name || block.type.toUpperCase()}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <FormField
            name={`blocks_draft.${index}.is_active`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id={`blocks_draft.${index}.is_active`}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button type="button" variant="ghost" size="sm">
                <Trash className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>정말 이 블럭을 삭제할까요?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    onDelete();
                  }}
                >
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToggle}
          >
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* 내용 영역 */}
      {isOpen && (
        <div className="px-4 py-6 space-y-2">
          {block.type === "text" && <TextBlockEdit index={index} />}
          {block.type === "image" && <ImageBlockEdit index={index} />}
          {block.type === "link" && <LinkBlockEdit index={index} />}
          {block.type === "sns" && <SNSBlockEdit index={index} />}
          {block.type === "list" && <ListBlockEdit index={index} />}
          {block.type === "calendar" && <CalendarBlockEdit index={index} />}
          {block.type === "blank" && <BlankBlockEdit index={index} />}
          {block.type === "book" && <BookBlockEdit index={index} />}
          {block.type === "work" && (
            <WorkBlockEdit index={index} works={works ?? []} />
          )}
          {/* 다른 블록들도 필요 시 추가 */}
          <BlockOptions type={block.type} index={index} />
        </div>
      )}
    </section>
  );
}
