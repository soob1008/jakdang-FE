import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { AuthorLink } from "@/feature/user/type";
import { Trash, Pencil } from "lucide-react";
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

interface LinkItemProps {
  link: AuthorLink;
  onEdit: () => void;
  onToggle: (checked: boolean, linkId: string) => Promise<void>;
  onDelete: (linkId: string) => Promise<void>;
}

export default function LinkItem({
  link,
  onEdit,
  onToggle,
  onDelete,
}: LinkItemProps) {
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);

  return (
    <li className="p-4 border border-gray-200 rounded-md text-sm flex flex-col gap-2">
      <span className="font-medium">{link.title}</span>
      <div className="flex justify-between items-start">
        <a
          href={link.url}
          target="_blank"
          className="truncate max-w-[80%] text-muted-foreground hover:text-primary"
        >
          {link.url}
        </a>
      </div>

      <div className="flex items-center justify-between">
        <Switch
          checked={link.is_active}
          onCheckedChange={(checked) => onToggle(checked, link.id)}
        />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Pencil className="w-4 h-4 text-muted-foreground hover:text-gray-900" />
          </Button>
          <AlertDialog
            open={isOpenDeleteAlert}
            onOpenChange={setIsOpenDeleteAlert}
          >
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash className="w-4 h-4 text-muted-foreground hover:text-gray-900" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>삭제하시겠습니까?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(link.id)}>
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
