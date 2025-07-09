"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SocialDialog from "@/feature/admin/dialog/SocialDialog";
import { useState } from "react";
import { AuthorSNS } from "@/feature/user/type";
import SocialLinkItem from "@/feature/admin/components/SocialLInkItem";

interface SocialLinksProps {
  userId: string;
  socials: AuthorSNS[];
}

export default function SocialLinks({ userId, socials }: SocialLinksProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedLink, setSelectedLink] = useState<{
    id?: string;
    platform: string;
    url: string;
  } | null>(null);

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">SNS</h3>
        <Button
          variant="muted"
          size="sm"
          onClick={() => {
            setMode("create");
            setSelectedLink(null);
            setIsOpen(true);
          }}
          aria-label="Create Social Link"
        >
          <Plus className="w-4 h-4 mr-1" />
          Create
        </Button>
      </div>

      {socials.length === 0 ? (
        <p className="text-sm text-center text-muted-foreground">
          등록된 SNS 가 없습니다.
        </p>
      ) : (
        <div className="flex flex-col gap-3 mt-3">
          {socials.map((social) => (
            <SocialLinkItem
              key={social.id}
              userId={userId}
              social={social}
              setMode={setMode}
              setIsOpen={setIsOpen}
              setSelectedLink={setSelectedLink}
            />
          ))}
        </div>
      )}

      <SocialDialog
        mode={mode}
        open={isOpen}
        onOpenChange={setIsOpen}
        defaultValues={selectedLink ?? undefined}
        userId={userId}
      />
    </section>
  );
}
