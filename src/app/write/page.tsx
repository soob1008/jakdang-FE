"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FormProvider, useForm } from "react-hook-form";

export default function WritePage() {
  const form = useForm();
  const { register, watch } = form;

  console.log("form", watch());

  return (
    <>
      <section>
        <h2 className="text-lg font-bold mb-3">초대장 정보 입력</h2>
        <FormProvider {...form}>
          <div className="flex flex-col gap-4">
            <Input
              {...register("title")}
              label="제목"
              placeholder="초대장 제목을 입력해주세요."
            />
            <Input {...register("needs")} label="준비물" />
            <Input {...register("address")} label="장소" />
          </div>
          <Button>초대장 생성</Button>
        </FormProvider>
      </section>
    </>
  );
}
