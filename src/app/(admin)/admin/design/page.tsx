"use client";

import { FormProvider } from "react-hook-form";
import PagePreview from "@/feature/admin/PagePreview";
import PageDesignEditor from "@/feature/admin/design/PageDesignEditor";
import { useAdminDesignForm } from "@/feature/admin/design/hooks/useAdminDesignForm";

export default function AdminDesignPage() {
  const { form } = useAdminDesignForm();

  return (
    <FormProvider {...form}>
      <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] mt-4">
        <div className="order-2 lg:order-1">
          <PageDesignEditor />
        </div>
        <div className="order-1 lg:order-2">
          <PagePreview />
        </div>
      </div>
    </FormProvider>
  );
}
