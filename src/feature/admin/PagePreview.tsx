"use client";

import { Block } from "@/feature/admin/types";
import { useFormContext, useWatch } from "react-hook-form";
import BlockPreview from "@/feature/admin/block/BlockPreview";

import ProfileBlock from "../author/blocks/ProfileBlock";

export default function PagePreview() {
  const { watch, control } = useFormContext();

  const blocks = useWatch({
    name: "blocks_draft",
    control,
  });

  const profile = watch("profile");

  return (
    <aside className="sticky top-10 h-fit px-4 flex flex-col items-center justify-center">
      <section
        aria-label="모바일 화면 미리보기"
        className="w-[360px] h-[700px] overflow-y-scroll scrollbar-none rounded-[2rem] border border-gray-200 shadow-[0_0_20px_rgba(0,0,0,0.08)] bg-white"
      >
        <div
          className="flex flex-col gap-6 origin-top scale-[0.9] pt-8"
          style={{ height: "calc(100% / 0.9)" }} // scale 영향 상쇄
        >
          {profile.is_active && (
            <article aria-label="프로필 블록">
              <ProfileBlock profile={profile} />
            </article>
          )}

          <div className="flex flex-col gap-6 px-1 pb-16">
            {blocks.map((block: Block, index: number) => (
              <article key={index} aria-label={`콘텐츠 블록 ${index + 1}`}>
                <BlockPreview block={block} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
}
