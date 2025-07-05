"use client";

import { useState } from "react";
import { LinkDialog, LinkValues } from "@/feature/profile/dialog/LinkDialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash, Pencil, Plus } from "lucide-react";

export default function LinkList() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedLink, setSelectedLink] = useState<LinkValues | null>(null);

  // 예시 링크 목록
  const linkItems: LinkValues[] = [
    { label: "브런치", url: "https://brunch.co.kr/@me" },
    { label: "깃허브", url: "https://github.com/me" },
  ];

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

      <ul className="flex flex-col gap-3 mt-3">
        {linkItems.map((item, idx) => (
          <li
            key={idx}
            className="p-4 border border-gray-200 rounded-md text-sm flex flex-col gap-2"
          >
            {/* 링크 URL */}
            <div className="flex justify-between items-start">
              <a
                href={item.url}
                className="text-muted-foreground hover:text-primary truncate max-w-[80%]"
                target="_blank"
              >
                {item.url}
              </a>
            </div>

            <div className="flex items-center justify-between">
              <Switch />
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  onClick={() => {
                    setMode("edit");
                    setSelectedLink(item);
                    setIsOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-gray-100"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <LinkDialog
        mode={mode}
        open={isOpen}
        onOpenChange={setIsOpen}
        defaultValues={selectedLink ?? undefined}
        onSubmitSuccess={(data) => {
          console.log("저장된 링크:", data);
          setIsOpen(false);
        }}
      />
    </section>
  );
}
