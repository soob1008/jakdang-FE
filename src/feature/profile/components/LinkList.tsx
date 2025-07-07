"use client";

import { useState } from "react";
import { LinkDialog } from "@/feature/profile/dialog/LinkDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AuthorLink } from "@/feature/user/type";
import LinkItem from "@/feature/profile/components/LInkItem";
import { LinkValues } from "@/feature/profile/dialog/LinkDialog";
import { handleAction } from "@/feature/common/api/action";
import { updateUserLinks } from "@/feature/user/api.server";

interface LinkListProps {
  userId: string; // 사용자 ID가 필요할 경우 사용
  links: AuthorLink[]; // 외부 링크 목록을 props로 받음
}

export default function LinkList({ userId, links }: LinkListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedLink, setSelectedLink] = useState<AuthorLink | null>(null);

  // 링크 저장

  const handleSaveLink = async (data: LinkValues) => {
    await handleAction(
      () =>
        updateUserLinks(
          userId,
          {
            title: data.title,
            url: data.url,
          },
          selectedLink?.id
        ),
      {
        successMessage: "링크가 저장되었습니다.",
        errorMessage: "링크 저장 중 문제가 발생했어요.",
        onSuccess: () => {
          // 모달 닫기 및 상태 초기화
          setIsOpen(false);
          setSelectedLink(null);
          setMode("create");
        },
      }
    );
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">외부 링크 등록</h3>
        <Button
          variant="muted"
          size="sm"
          onClick={() => {
            setMode("create");
            setSelectedLink(null);
            setIsOpen(true);
          }}
          aria-label="Create Link"
        >
          <Plus className="w-4 h-4 mr-1" />
          Create
        </Button>
      </div>

      <div className="flex flex-col gap-3 mt-3">
        {links.length === 0 ? (
          <p className="text-center text-muted-foreground">
            등록된 링크가 없습니다.
          </p>
        ) : (
          links.map((link) => (
            <LinkItem
              key={link.id}
              userId={userId}
              link={link}
              setSelectedLink={setSelectedLink}
              setMode={setMode}
              setIsOpen={setIsOpen}
            />
          ))
        )}
      </div>

      <LinkDialog
        mode={mode}
        open={isOpen}
        onOpenChange={setIsOpen}
        defaultValues={selectedLink ?? undefined}
        onSubmitSuccess={handleSaveLink}
      />
    </section>
  );
}
