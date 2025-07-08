"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkDialog } from "@/feature/profile/dialog/WorkDialog";
import { AuthorWork } from "@/feature/user/type";
import WorkItem from "@/feature/profile/components/WorkItem";
import { handleAction } from "@/feature/common/api/action";
import { updateUserWorks, deleteUserWork } from "@/feature/user/api.server";
import { WorkValues } from "@/feature/profile/dialog/WorkDialog";

interface WorkListProps {
  userId: string;
  works: AuthorWork[];
}

export default function WorkList({ userId, works }: WorkListProps) {
  const [disalogState, setDialogState] = useState<{
    open: boolean;
    mode: "create" | "edit";
    selected: AuthorWork | null;
  }>({
    open: false,
    mode: "create",
    selected: null,
  });

  const handleEdit = (work: AuthorWork) => {
    setDialogState({ open: true, mode: "edit", selected: work });
  };

  const handleCreate = () => {
    setDialogState({ open: true, mode: "create", selected: null });
  };

  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? works : works.slice(0, 6);

  const handleSaveWork = async (data: WorkValues) => {
    await handleAction(
      () =>
        updateUserWorks(
          userId,
          {
            title: data.title,
            description: data.description,
            image_url: data.image_url,
            url: data.url,
            is_representative: data.is_representative,
          },
          disalogState.selected?.id
        ),
      {
        successMessage: "작품이 저장되었습니다.",
        errorMessage: "작품 저장 중 문제가 발생했어요.",
        onSuccess: () => {
          setDialogState({ open: false, mode: "create", selected: null });
        },
      }
    );
  };

  const handleToggle = async (checked: boolean, workId: string) => {
    await handleAction(
      () => updateUserWorks(userId, { is_active: checked }, workId),
      {
        successMessage: `작품이 ${checked ? "활성화" : "비활성화"} 되었습니다.`,
        errorMessage: "작품 상태 변경 중 문제가 발생했어요.",
      }
    );
  };

  const handleDelete = async (workId: string) => {
    await handleAction(() => deleteUserWork(workId, userId), {
      successMessage: "작품이 삭제되었습니다.",
      errorMessage: "작품 삭제 중 문제가 발생했어요.",
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">작품 등록</h3>
        <Button
          variant="muted"
          size="sm"
          onClick={handleCreate}
          aria-label="Create Link"
        >
          <Plus className="w-4 h-4 mr-1" />
          Create
        </Button>
      </div>

      {works.length === 0 ? (
        <p className="text-sm text-center text-muted-foreground">
          작품이 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {visibleItems.map((work) => (
            <WorkItem
              key={work.id}
              work={work}
              onEdit={() => handleEdit(work)}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {works.length > 6 && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "접기" : "더보기"}
          </Button>
        </div>
      )}

      <WorkDialog
        userId={userId}
        mode={disalogState.mode}
        open={disalogState.open}
        onOpenChange={(open) => setDialogState((prev) => ({ ...prev, open }))}
        defaultValues={disalogState.selected ?? undefined}
        onSubmitSuccess={handleSaveWork}
      />
    </section>
  );
}
