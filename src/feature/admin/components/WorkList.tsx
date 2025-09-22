"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { WorkDialog } from "@/feature/admin/dialog/WorkDialog";
import { AuthorWork } from "@/entities/author/model/types";
import WorkItem from "@/feature/admin/components/WorkItem";
import { handleAction } from "@/shared/lib/api/action";
import {
  updateUserWorks,
  deleteUserWork,
} from "@/entities/author/lib/repository";
import { WorkValues } from "@/feature/admin/dialog/WorkDialog";
import EmptyText from "@/shared/ui/EmptyText";

interface WorkListProps {
  userId: string;
  works: AuthorWork[];
}

export default function WorkList({ userId, works }: WorkListProps) {
  const [disalogState, setDialogState] = useState({
    open: false,
    mode: "create" as "create" | "edit",
    selected: null as AuthorWork | null,
  });

  const [showAll, setShowAll] = useState(false);
  const [sortedWorks, setSortedWorks] = useState<AuthorWork[]>(works);

  const visibleItems = showAll ? sortedWorks : sortedWorks.slice(0, 6);

  const handleEdit = (work: AuthorWork) => {
    setDialogState({ open: true, mode: "edit", selected: work });
  };

  const handleCreate = () => {
    setDialogState({ open: true, mode: "create", selected: null });
  };

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

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const updated = [...sortedWorks];
    const [moved] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, moved);
    setSortedWorks(updated);

    // TODO: 순서 저장 API 연결 시 여기에 호출
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">작품 등록</h3>
        <Button variant="secondary" size="sm" onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-1" />
          Create
        </Button>
      </div>

      {sortedWorks.length === 0 ? (
        <EmptyText message="작품이 없습니다." />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="works" direction="horizontal">
            {(provided) => (
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-6"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {visibleItems.map((work, index) => (
                  <Draggable draggableId={work.id} index={index} key={work.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <WorkItem
                          work={work}
                          onEdit={() => handleEdit(work)}
                          onToggle={handleToggle}
                          onDelete={handleDelete}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
