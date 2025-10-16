"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { Work } from "@/entities/work/model/type";
import { uploadImage } from "@/shared/lib/api/api.client";
import { handleAction } from "@/shared/lib/api/action";
import Image from "next/image";
import useCreateWork from "../hooks/useCreateWork";
import useUpdateWork from "../hooks/useUpdateWork";

type WorkInfoDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  work?: Work | null;
};

export default function WorkInfoDialog({
  open,
  setOpen,
  work,
}: WorkInfoDialogProps) {
  const isEditMode = !!work;
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<string | undefined>();

  const { mutateAsync: createWork } = useCreateWork();
  const { mutateAsync: updateWork } = useUpdateWork();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    if (work) {
      setTitle(work.title ?? "");
      setThumbnail(work.thumbnail ?? undefined);
    } else {
      resetForm();
    }
  }, [work, open]);

  const resetForm = () => {
    setTitle("");
    setThumbnail(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (isEditMode) {
        await updateWork({ id: work.id, title, thumbnail } as Work);
      } else {
        await createWork({ title, thumbnail });
        resetForm();
      }
      setOpen(false);
    } catch {}
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleAction(() => uploadImage(file), {
      successMessage: "썸네일이 업로드되었습니다.",
      errorMessage: "이미지 업로드 실패",
      onSuccess: ({ imagePath }) => {
        setThumbnail(imagePath);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button>새 작품</Button>
        </DialogTrigger>
      )}

      <DialogContent className="w-[90%] max-w-2xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "작품 수정" : "새 작품 추가"}</DialogTitle>
          <DialogDescription className="text-gray-500 text-sm">
            생성된 작품 하위에 콘텐츠를 자유롭게 구성할 수 있습니다.
            <br />
            목차로 구성해 단일 작품으로 만들거나, 여러 편을 이어 시리즈 형태로
            전개할 수도 있습니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 mt-2">
          {/* 작품 제목 입력 */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              작품 제목
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="작품 제목을 입력하세요."
            />
          </div>

          {/* 썸네일 업로드 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">작품 썸네일</p>

            <div className="flex items-center gap-4">
              <div className="relative w-40 h-28 bg-gray-100 border rounded overflow-hidden flex items-center justify-center">
                {thumbnail ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${thumbnail}`}
                    alt="썸네일 미리보기"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">미리보기 없음</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => inputRef.current?.click()}
                  className="w-fit"
                >
                  이미지 선택
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  className="hidden"
                  onChange={handleUpload}
                />
                <p className="text-xs text-gray-500">
                  권장 비율 3:2 (예: 600×400px)
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!title.trim()}>
              {isEditMode ? "수정하기" : "등록하기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
