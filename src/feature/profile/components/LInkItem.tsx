import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { AuthorLink } from "@/feature/user/type";
import { Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleAction } from "@/feature/common/api/action";
import { updateUserLinks, deleteUserLink } from "@/feature/user/api.server";
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

interface LinkItemProps {
  link: AuthorLink;
  userId: string;
  setSelectedLink: (link: AuthorLink) => void;
  setMode: (mode: "create" | "edit") => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function LinkItem({
  link,
  userId,
  setSelectedLink,
  setMode,
  setIsOpen,
}: LinkItemProps) {
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);

  const handleToggle = async (checked: boolean) => {
    await handleAction(
      () => updateUserLinks(userId, { is_active: checked }, link.id),
      {
        successMessage: `링크가 ${checked ? "활성화" : "비활성화"} 되었습니다.`,
        errorMessage: "링크 활성화 상태 변경에 실패했어요.",
      }
    );
  };

  const handleDelete = async () => {
    await handleAction(() => deleteUserLink(link.id, userId), {
      successMessage: "링크가 삭제되었습니다.",
      errorMessage: "링크 삭제에 실패했어요.",
      onSuccess: () => {
        setIsOpenDeleteAlert(false);
      },
    });
  };

  return (
    <li className="p-4 border border-gray-200 rounded-md text-sm flex flex-col gap-2">
      <span className="font-medium">{link.title}</span>
      {/* 링크 URL */}
      <div className="flex justify-between items-start">
        <a
          href={link.url}
          className="text-muted-foreground hover:text-primary truncate max-w-[80%]"
          target="_blank"
        >
          {link.url}
        </a>
      </div>

      <div className="flex items-center justify-between">
        <Switch checked={link.is_active} onCheckedChange={handleToggle} />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-white"
            onClick={() => {
              setMode("edit");
              setSelectedLink(link);
              setIsOpen(true);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <AlertDialog
            open={isOpenDeleteAlert}
            onOpenChange={setIsOpenDeleteAlert}
          >
            <AlertDialogTrigger>
              <Trash className="w-4 h-4 text-muted-foreground hover:text-gray-900" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>삭제하시겠습니까?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setIsOpenDeleteAlert(false);
                  }}
                >
                  취소
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </li>
  );
}
