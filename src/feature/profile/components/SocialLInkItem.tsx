import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { AuthorSNS } from "@/feature/user/type";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import { deleteUserSNS, updateUserSNS } from "@/feature/user/api.server";
import { handleAction } from "@/feature/common/api/action";

interface SocialLinkItemProps {
  userId: string;
  social: AuthorSNS;
  setMode: (mode: "create" | "edit") => void;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedLink: (link: { platform: string; url: string }) => void; // 추가
}

export default function SocialLinkItem({
  userId,
  social,
  setMode,
  setIsOpen,
  setSelectedLink,
}: SocialLinkItemProps) {
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);

  const handleToggle = async (checked: boolean) => {
    await handleAction(
      () => updateUserSNS(userId, { is_active: checked }, social.id),
      {
        successMessage: `SNS가 ${checked ? "활성화" : "비활성화"} 되었습니다.`,
        errorMessage: "SNS 활성화 상태 변경에 실패했어요.",
      }
    );
  };

  const handleDelete = async () => {
    await handleAction(() => deleteUserSNS(social.id, userId), {
      successMessage: "SNS가 삭제되었습니다.",
      errorMessage: "SNS 삭제에 실패했어요.",
      onSuccess: () => {
        setIsOpenDeleteAlert(false);
      },
    });
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col gap-2 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground font-medium">
        {social.platform}
      </div>
      <a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary truncate"
      >
        {social.url}
      </a>

      <div className="flex justify-between items-center">
        <Switch checked={social.is_active} onCheckedChange={handleToggle} />

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-white"
            onClick={() => {
              setMode("edit");
              setSelectedLink({
                id: social.id,
                platform: social.platform,
                url: social.url,
              });
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
    </div>
  );
}
