"use client";
import { useForm, FormProvider } from "react-hook-form";
import PagePreview from "@/feature/admin/PagePreview";
import PageDesignEditor from "@/feature/admin/design/PageDesignEditor";

export default function AdminDesignPage() {
  const form = useForm({
    //resolver: zodResolver(),
    defaultValues: {
      design: {},
    },
  });
  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 h-full">
        <PageDesignEditor />

        {/* 우측 프리뷰 */}
        <PagePreview />
      </div>
    </FormProvider>
  );
}
