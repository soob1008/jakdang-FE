"use client";

import WorkEditorForm, {
  type WorkFormValues,
} from "@/feature/admin/works/components/WorkEditorForm";
import useCreateWriting from "../hooks/useCreateWriting";

type WorkNewContainerProps = {
  workId: string;
};

export default function WorkNewContainer({ workId }: WorkNewContainerProps) {
  const { mutateAsync: createWriting } = useCreateWriting();

  const handleSubmit = async (values: WorkFormValues) => {
    await createWriting({ workId, writing: values });
  };

  return (
    <WorkEditorForm
      heading="글 작성"
      submitLabel="작성하기"
      defaultValues={{}}
      onSubmit={handleSubmit}
    />
  );
}
