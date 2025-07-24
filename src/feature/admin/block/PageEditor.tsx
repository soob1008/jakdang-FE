"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import BlockItem from "./BlockItem";
import { Block } from "./BlockItem";
import BlockDialog from "./BlockDialog";

export default function PageEditor() {
  const { control } = useFormContext();
  const { fields } = useFieldArray({ control, name: "blocks" });

  const [openBlockDialog, setOpenBlockDialog] = useState(true);

  return (
    <article className="pr-2 flex flex-col gap-4 pt-4 pl-10 pb-24 max-w-[900px] w-full mx-auto lg:max-w-none">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-lg font-bold">구성하기</h2>
        <div className="flex items-center gap-2">
          <BlockDialog
            open={openBlockDialog}
            onOpenChange={setOpenBlockDialog}
            trigger={
              <Button type="button" className="w-fit" variant="outline">
                블록 추가하기
              </Button>
            }
          />

          <Button type="button" className="w-fit">
            저장하기
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((block, index) => {
          return (
            <BlockItem key={block.id} index={index} block={block as Block} />
          );
        })}
      </div>
    </article>
  );
}
