"use client";

import WorkEditorForm, {
  type WorkFormValues,
} from "@/feature/admin/works/components/WorkEditorForm";
import useWriting from "../hooks/useWriting";
import useUpdateWriting from "../hooks/useUpdateWriting";

type WorkEditContainerProps = {
  workId: string;
  writingId: string;
};

export default function WorkEditContainer({
  workId,
  writingId,
}: WorkEditContainerProps) {
  const { data: writing } = useWriting(workId, writingId);
  const { mutateAsync: updateWriting } = useUpdateWriting();

  const handleSubmit = async (values: WorkFormValues) => {
    await updateWriting({ workId, writingId, writing: values });
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
