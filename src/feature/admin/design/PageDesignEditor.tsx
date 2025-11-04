"use client";

import { Button } from "@/shared/ui/button";
import PageCustomizer from "./PageCustomizer";
import { useFormContext } from "react-hook-form";
import useAutoSaveDesign from "@/feature/page/hooks/useAutoSaveDesign";
import useUpdatePublished from "@/feature/page/hooks/useUpdatePublished";
import Title from "@/feature/admin/components/Title";

export default function PageDesignEditor() {
  const { watch } = useFormContext();
  const pageId = watch("id");

  const { mutateAsync: updateBlockPublished } = useUpdatePublished();

  useAutoSaveDesign(pageId);

  const handleSavePage = async () => {
    if (!pageId) {
      return;
    }

    await updateBlockPublished({
      pageId,
    });
  };

  return (
    <article className="flex flex-col gap-4 pb-24 max-w-[900px] w-full mx-auto lg:max-w-none">
      <Title
        title="꾸미기"
        rightContent={
          <Button type="button" className="w-fit" onClick={handleSavePage}>
            반영하기
          </Button>
        }
      />

      <div className="space-y-6">
        <PageCustomizer />
      </div>
    </article>
  );
}
