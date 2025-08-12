"use client";
import { Button } from "@/components/ui/button";

import PageCustomizer from "./PageCustomizer";
import { useFormContext } from "react-hook-form";
import { Page } from "@/feature/admin/types";
import { apiClient } from "@/lib/api/api.client";
import { handleAction } from "@/lib/api/action";
import { useAutoSaveStyle } from "@/hooks/useAutoSaveStyle";

export default function PageDesignEditor() {
  const { watch } = useFormContext<Page>();

  useAutoSaveStyle(watch("id"));

  const handleSavePage = async () => {
    await handleAction(
      () => apiClient.put(`/api/pages/${watch("id")}/style/publish`),
      {
        successMessage: "내 공간에 반영되었습니다.",
        errorMessage: "저장이 실패되었습니다. 다시 시도해 주세요.",
      }
    );
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
