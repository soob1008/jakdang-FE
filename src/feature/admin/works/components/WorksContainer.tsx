"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import WorkList from "@/feature/admin/works/components/WorkList";
import WorkInfoDialog from "@/feature/admin/works/components/WorkInfoDialog";
import { Work } from "@/entities/work/model/type";
import WorkWritingList from "@/feature/admin/works/components/WorkWritingList";
import useWorks from "../hooks/useWorks";
import useDeleteWork from "../hooks/useDeleteWork";
import useUpdateWork from "../hooks/useUpdateWork";
import useDeleteWriting from "../hooks/useDeleteWriting";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SELECTED_WORK_PARAM = "selectedWorkId";

export default function WorksContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [isWorkDeleteDialogOpen, setIsWorkDeleteDialogOpen] = useState(false);
  const [workToDelete, setWorkToDelete] = useState<Work | null>(null);

  const [isWritingDeleteDialogOpen, setIsWritingDeleteDialogOpen] =
    useState(false);
  const [writingToDelete, setWritingToDelete] = useState<{
    workId: string;
    writingId: string;
    title: string;
  } | null>(null);

  const { data: works } = useWorks();
  const { mutateAsync: deleteWork, isPending: isDeleting } = useDeleteWork();
  const { mutateAsync: updateWork, isPending: isUpdating } = useUpdateWork();

  const { mutateAsync: deleteWriting, isPending: isDeletingWriting } =
    useDeleteWriting();

  // ----- Derived data -----
  const worksList = useMemo(() => works ?? [], [works]);

  const selectedWork = useMemo(
    () =>
      selectedWorkId
        ? worksList.find((item) => item.id === selectedWorkId) ?? null
        : null,
    [selectedWorkId, worksList]
  );

  const editingWork = useMemo(
    () =>
      editingWorkId
        ? worksList.find((item) => item.id === editingWorkId) ?? null
        : null,
    [editingWorkId, worksList]
  );

  const selectedWorkIdParam = searchParams.get(SELECTED_WORK_PARAM);

  const updateSelectedWorkParam = useCallback(
    (workId: string | null) => {
      if (selectedWorkIdParam === workId) return;

      const params = new URLSearchParams(searchParams.toString());
      if (workId) {
        params.set(SELECTED_WORK_PARAM, workId);
      } else {
        params.delete(SELECTED_WORK_PARAM);
      }

      const nextPath =
        params.size > 0 ? `${pathname}?${params.toString()}` : pathname;

      router.replace(nextPath, { scroll: false });
    },
    [pathname, router, searchParams, selectedWorkIdParam]
  );

  // ----- Work actions -----
  const clearSelectedWork = useCallback(() => {
    setSelectedWorkId(null);
    updateSelectedWorkParam(null);
  }, [updateSelectedWorkParam]);

  const handleWorkSelect = (work: Work) => {
    setSelectedWorkId(work.id);
    updateSelectedWorkParam(work.id);
  };

  const handleEditWork = (work: Work) => {
    setEditingWorkId(work.id);
    setIsEditDialogOpen(true);
  };

  const handleRequestDeleteWork = (work: Work) => {
    setWorkToDelete(work);
    setIsWorkDeleteDialogOpen(true);
  };

  const handleWorkDialogToggle = useCallback(
    (open: boolean) => {
      setIsEditDialogOpen(open);
      if (!open) {
        setEditingWorkId(null);
      }
    },
    []
  );

  const handleCloseDeleteWorkDialog = () => {
    setIsWorkDeleteDialogOpen(false);
    setWorkToDelete(null);
  };

  const handleDeleteWork = async () => {
    if (!workToDelete) return;

    try {
      await deleteWork(workToDelete.id);
      toast.success("작품이 삭제되었습니다.");

      if (selectedWork?.id === workToDelete.id) {
        clearSelectedWork();
      }

      if (editingWork?.id === workToDelete.id) {
        setEditingWorkId(null);
        setIsEditDialogOpen(false);
      }

      setIsWorkDeleteDialogOpen(false);
      setWorkToDelete(null);
    } catch {
      toast.error("작품 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // ----- Writing actions -----
  const handleRequestDeleteWriting = (
    workId: string,
    writingId: string,
    title: string
  ) => {
    setWritingToDelete({ workId, writingId, title });
    setIsWritingDeleteDialogOpen(true);
  };

  const handleDeleteWriting = async () => {
    if (!writingToDelete) return;

    try {
      await deleteWriting({
        workId: writingToDelete.workId,
        writingId: writingToDelete.writingId,
      });
      setIsWritingDeleteDialogOpen(false);
      setWritingToDelete(null);
    } catch {
      // onError에서 토스트 처리
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

  // ----- Effects -----
  useEffect(() => {
    if (!selectedWorkIdParam) {
      setSelectedWorkId((prev) => (prev === null ? prev : null));
      return;
    }

    setSelectedWorkId((prev) =>
      prev === selectedWorkIdParam ? prev : selectedWorkIdParam
    );
  }, [selectedWorkIdParam]);

  useEffect(() => {
    if (!selectedWorkId) return;

    const exists = worksList.some((item) => item.id === selectedWorkId);
    if (!exists) {
      clearSelectedWork();
    }
  }, [clearSelectedWork, selectedWorkId, worksList]);

  useEffect(() => {
    if (!editingWorkId) return;
    if (!works) return;
    if (editingWork) return;

    setEditingWorkId(null);
    setIsEditDialogOpen(false);
  }, [editingWork, editingWorkId, works]);

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
            setOpen={handleWorkDialogToggle}
            work={editingWork}
          />
        </div>

        {/* 작품 리스트 */}
        <div className="">
          <WorkList
            works={worksList}
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
      <WorkWritingList
        selectedWork={selectedWork}
        onDeleteWriting={handleRequestDeleteWriting}
      />

      <AlertDialog
        open={isWorkDeleteDialogOpen}
        onOpenChange={(open) => {
          setIsWorkDeleteDialogOpen(open);
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
            <AlertDialogCancel onClick={handleCloseDeleteWorkDialog}>
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

      <AlertDialog
        open={isWritingDeleteDialogOpen}
        onOpenChange={(open) => {
          setIsWritingDeleteDialogOpen(open);
          if (!open) {
            setWritingToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>삭제하시겠습니까?</AlertDialogTitle>
            {writingToDelete && (
              <AlertDialogDescription>
                {writingToDelete.title} 글을 삭제하면 복구할 수 없습니다.
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsWritingDeleteDialogOpen(false);
                setWritingToDelete(null);
              }}
            >
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteWriting}
              disabled={isDeletingWriting || !writingToDelete}
            >
              {isDeletingWriting ? "삭제 중..." : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
