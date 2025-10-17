"use client";

import WorkEditorForm, {
  type WorkFormValues,
} from "@/feature/admin/works/components/WorkEditorForm";
import useWriting from "../hooks/useWriting";

type WorkEditContainerProps = {
  // defaultValues?: Partial<WorkFormValues>;
  // onSubmit?: (values: WorkFormValues) => Promise<void> | void;
  workId: string;
  writingId: string;
};

export default function WorkEditContainer({
  workId,
  writingId,
}: // defaultValues,
// onSubmit,
WorkEditContainerProps) {
  const { data: writing } = useWriting(workId, writingId);

  console.log("writing:", writing);

  const handleSubmit = async (values: WorkFormValues) => {
    // await updateWriting({ workId, writingId, writing: values });
  };

  return (
    <WorkEditorForm
      heading="글 수정"
      submitLabel="수정하기"
      defaultValues={writing ?? {}}
      onSubmit={handleSubmit}
    />
  );
}
