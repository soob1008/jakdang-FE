"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkDialog } from "@/feature/profile/dialog/WorkDialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function WorkList() {
  const [showAll, setShowAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [mode, setMode] = useState<"create" | "edit">("create");
  // 예시용 더미 데이터 (실제 작품 리스트로 대체)
  const items = [1, 2, 3, 4, 5, 6, 7, 8];
  const visibleItems = showAll ? items : items.slice(0, 6);

  const handleDelete = (id: number) => {
    // TODO: 삭제 처리 로직
    console.log("삭제할 항목:", id);
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">작품 등록</h3>
        <Button
          variant="muted"
          size="sm"
          onClick={() => {
            setMode("create");
            setIsOpen(true);
          }}
          aria-label="Create Link"
        >
          <Plus className="w-4 h-4 mr-1" />
          Create
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {visibleItems.map((item) => (
          <div key={item}>
            <div className="relative w-full aspect-[1] overflow-hidden rounded-md shadow-sm">
              <Image
                src="/test.png"
                alt="작품 이미지"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />

              <Badge className="absolute top-2 left-2">대표작</Badge>

              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  size="icon"
                  variant="outline"
                  className="w-7 h-7 p-1 rounded-full"
                  onClick={() => {
                    setMode("edit");
                    setIsOpen(true);
                  }}
                  aria-label="Edit Work"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-7 h-7 p-1 rounded-full"
                  onClick={() => handleDelete(item)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="mt-2">
              <div className="text-sm font-semibold truncate">
                랑과 나의 사막
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">
                사막에서 만난 새로운 만남과 이별을 담은 우리들의 이야기
              </p>
              <div className="flex mt-2 items-center justify-between">
                <div className="text-xs text-gray-500 truncate max-w-[70%]">
                  https://example.com
                </div>
                <Switch className="ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length > 6 && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "접기" : "더보기"}
          </Button>
        </div>
      )}

      <WorkDialog
        mode={mode}
        open={isOpen}
        onOpenChange={setIsOpen}
        defaultValues={
          mode === "edit"
            ? {
                title: "랑과 나의 사막",
                content:
                  "사막에서 만난 새로운 만남과 이별을 담은 우리들의 이야기",
                link: "https://example.com",
                isRepresentative: true,
              }
            : undefined
        }
        onSubmitSuccess={(data, file) => {
          // 수정 후 로직
          setIsOpen(false);
        }}
      />
    </section>
  );
}
