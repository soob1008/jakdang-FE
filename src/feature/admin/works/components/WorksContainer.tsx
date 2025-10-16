"use client";

import { useState } from "react";
import WorkList from "@/feature/admin/works/components/WorkList";
import WorkInfoDialog from "@/feature/admin/works/components/WorkInfoDialog";
import { Work } from "@/entities/work/model/type";
import WorkEpisodeList from "@/feature/admin/works/components/WorkEpisodeList";
import useWorks from "../hooks/useWorks";

export const works: Work[] = [];

export default function WorksContainer() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: works } = useWorks();

  const handleWorkSelect = (work: Work) => {
    setSelectedWork(work);
  };

  const handleEditWork = (work: Work) => {
    setEditingWork(work);
    setIsEditDialogOpen(true);
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
          />
        </div>
      </section>
      {/* 작품 하위 에피소드 리스트 */}
      <WorkEpisodeList selectedWork={selectedWork} />
    </div>
  );
}
