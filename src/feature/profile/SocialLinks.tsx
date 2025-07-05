"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import SocialDialog from "@/feature/profile/dialog/SocialDialog";
import { useState } from "react";

export default function SocialLinks() {
  const link = "https://twitter.com";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">SNS 링크</h3>
        <SocialDialog open={isOpen} setIsOpen={setIsOpen} />
      </div>

      <ul className="flex flex-col gap-3 mt-3">
        <li className="border border-gray-200 rounded-md px-4 py-2 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              {/* 아이콘 + 이름 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              Twitter
            </div>

            {/* 오른쪽: Switch + 수정 버튼 */}
            <div className="flex items-center gap-2">
              <Switch />
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                onClick={() => setIsOpen(true)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 하단 링크 */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary truncate"
          >
            {link}
          </a>
        </li>
      </ul>
    </section>
  );
}
