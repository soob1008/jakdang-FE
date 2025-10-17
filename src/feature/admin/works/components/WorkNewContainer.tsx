"use client";

import WorkEditorForm, {
  type WorkFormValues,
} from "@/feature/admin/works/components/WorkEditorForm";
import useCreateWriting from "../hooks/useCreateWriting";
import { useRouter } from "next/navigation";

type WorkNewContainerProps = {
  // defaultValues?: Partial<WorkFormValues>;
  workId: string;
};

export default function WorkNewContainer({ workId }: WorkNewContainerProps) {
  const router = useRouter();
  const { mutateAsync: createWriting } = useCreateWriting();

  const handleSubmit = async (values: WorkFormValues) => {
    try {
      await createWriting({ workId, writing: values });
    } finally {
      router.push("/admin/works");
    }
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
