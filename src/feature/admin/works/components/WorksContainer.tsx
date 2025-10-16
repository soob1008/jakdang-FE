"use client";

import { useState } from "react";
import WorkList from "@/feature/admin/works/components/WorkList";
import WorkInfoDialog from "@/feature/admin/works/components/WorkInfoDialog";
import { Work } from "@/entities/work/model/type";
import WorkEpisodeList from "@/feature/admin/works/components/WorkEpisodeList";
import useWorks from "../hooks/useWorks";
import useDeleteWork from "../hooks/useDeleteWork";
import useUpdateWork from "../hooks/useUpdateWork";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/ui/alert-dialog";
import { toast } from "sonner";

export default function WorksContainer() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const [workToDelete, setWorkToDelete] = useState<Work | null>(null);

  const { data: works } = useWorks();
  const { mutateAsync: deleteWork, isPending: isDeleting } = useDeleteWork();
  const { mutateAsync: updateWork, isPending: isUpdating } = useUpdateWork();

  const handleWorkSelect = (work: Work) => {
    setSelectedWork(work);
  };

  const handleEditWork = (work: Work) => {
    setEditingWork(work);
    setIsEditDialogOpen(true);
  };

  const handleRequestDeleteWork = (work: Work) => {
    setWorkToDelete(work);
    setIsOpenDeleteAlert(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteAlert(false);
  };

  const handleDeleteWork = async () => {
    if (!workToDelete) return;

    try {
      await deleteWork(workToDelete.id);
      toast.success("작품이 삭제되었습니다.");

      if (selectedWork?.id === workToDelete.id) {
        setSelectedWork(null);
      }

      if (editingWork?.id === workToDelete.id) {
        setEditingWork(null);
        setIsEditDialogOpen(false);
      }

      setIsOpenDeleteAlert(false);
      setWorkToDelete(null);
    } catch {
      toast.error("작품 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleToggleWorkPublic = async (work: Work, isPublic: boolean) => {
    try {
      await updateWork({
        ...work,
        is_public: isPublic,
      });
    } catch {
      // 이미 useUpdateWork에서 토스트를 통해 에러를 처리합니다.
    }
  };

  return (
    <div className="flex gap-6 px-10 mt-4">
      <section className="flex-1">
        {/* 작품 제목 및 추가 */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="font-semibold">작품 관리</h2>
            <p className="text-gray-500 text-sm">
              작품을 생성하고, 하위 콘텐츠를 추가하거나 수정할 수 있습니다.
            </p>
          </div>
          {/* 작품 추가 다이얼로그 */}
          <WorkInfoDialog
            open={isEditDialogOpen}
            setOpen={setIsEditDialogOpen}
            work={editingWork}
          />
        </div>

        {/* 작품 리스트 */}
        <div className="">
          <WorkList
            works={works || []}
            selectedWork={selectedWork}
            onSelectWork={handleWorkSelect}
            onEditWork={handleEditWork}
            onDeleteWork={handleRequestDeleteWork}
            onTogglePublic={handleToggleWorkPublic}
            isUpdating={isUpdating}
          />
        </div>
      </section>
      {/* 작품 하위 에피소드 리스트 */}
      <WorkEpisodeList selectedWork={selectedWork} />

      <AlertDialog
        open={isOpenDeleteAlert}
        onOpenChange={(open) => {
          setIsOpenDeleteAlert(open);
          if (!open) {
            setWorkToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>삭제하시겠습니까?</AlertDialogTitle>
            {workToDelete && (
              <AlertDialogDescription>
                {workToDelete.title} 작품을 삭제하면 복구할 수 없습니다.
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDeleteDialog}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteWork}
              disabled={isDeleting || !workToDelete}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
