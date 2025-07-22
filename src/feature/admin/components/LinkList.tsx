"use client";

import { useState } from "react";
import { LinkDialog } from "@/feature/admin/dialog/LinkDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AuthorLink } from "@/feature/user/type";
import LinkItem from "@/feature/admin/components/LInkItem";
import { LinkValues } from "@/feature/admin/dialog/LinkDialog";
import { handleAction } from "@/feature/common/api/action";
import { updateUserLinks, deleteUserLink } from "@/feature/user/api.server";
import EmptyText from "@/components/ui/EmptyText";

interface LinkListProps {
  userId: string; // 사용자 ID가 필요할 경우 사용
  links: AuthorLink[]; // 외부 링크 목록을 props로 받음
}

export default function LinkList({ userId, links }: LinkListProps) {
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    mode: "create" | "edit";
    selected: AuthorLink | null;
  }>({ open: false, mode: "create", selected: null });

  const handleEdit = (link: AuthorLink) => {
    setDialogState({ open: true, mode: "edit", selected: link });
  };

  const handleCreate = () => {
    setDialogState({ open: true, mode: "create", selected: null });
  };

  const handleSaveLink = async (data: LinkValues) => {
    await handleAction(
      () =>
        updateUserLinks(
          userId,
          { title: data.title, url: data.url },
          dialogState.selected?.id
        ),
      {
        successMessage: "링크가 저장되었습니다.",
        errorMessage: "링크 저장 중 문제가 발생했어요.",
        onSuccess: () => {
          setDialogState({ open: false, mode: "create", selected: null });
        },
      }
    );
  };

  const handleToggle = async (checked: boolean, linkId: string) => {
    await handleAction(
      () => updateUserLinks(userId, { is_active: checked }, linkId),
      {
        successMessage: `링크가 ${checked ? "활성화" : "비활성화"} 되었습니다.`,
        errorMessage: "링크 상태 변경 중 문제가 발생했어요.",
      }
    );
  };

  const handleDelete = async (linkId: string) => {
    await handleAction(() => deleteUserLink(linkId, userId), {
      successMessage: "링크가 삭제되었습니다.",
      errorMessage: "링크 삭제 중 문제가 발생했어요.",
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">외부 링크 등록</h3>
        <Button variant="secondary" size="sm" onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-1" />
          Create
        </Button>
      </div>

      <ul className="flex flex-col gap-3 mt-3">
        {links.length === 0 ? (
          <EmptyText message="외부 링크가 없습니다. " />
        ) : (
          links.map((link) => (
            <LinkItem
              key={link.id}
              link={link}
              onEdit={() => handleEdit(link)}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </ul>

      <LinkDialog
        mode={dialogState.mode}
        open={dialogState.open}
        onOpenChange={(open) => setDialogState((prev) => ({ ...prev, open }))}
        defaultValues={dialogState.selected ?? undefined}
        onSubmitSuccess={handleSaveLink}
      />
    </section>
  );
}
