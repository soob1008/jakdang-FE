"use client";

import WorkEditorForm, {
  type WorkFormValues,
} from "@/feature/admin/works/components/WorkEditorForm";

type WorkEditContainerProps = {
  defaultValues?: Partial<WorkFormValues>;
  onSubmit?: (values: WorkFormValues) => Promise<void> | void;
};

export default function WorkEditContainer({
  defaultValues,
  onSubmit,
}: WorkEditContainerProps) {
  return (
    <WorkEditorForm
      heading="글 수정"
      submitLabel="수정하기"
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
}

