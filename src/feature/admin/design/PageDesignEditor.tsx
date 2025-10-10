"use client";

import { Button } from "@/shared/ui/button";
import PageCustomizer from "./PageCustomizer";
import { useFormContext } from "react-hook-form";
import useAutoSaveDesign from "@/feature/page/hooks/useAutoSaveDesign";
import useUpdatePublished from "@/feature/page/hooks/useUpdatePublished";

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
    <article className="px-4 flex flex-col gap-4 pt-4 pb-24 max-w-[900px] w-full mx-auto md:pl-10 lg:max-w-none">
      <div className="flex items-center justify-between pb-2">
        <h2 className="font-bold">꾸미기</h2>
        <div className="flex items-center gap-2">
          <Button type="button" className="w-fit" onClick={handleSavePage}>
            반영하기
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <PageCustomizer />
      </div>
    </article>
  );
}
