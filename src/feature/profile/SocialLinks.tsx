"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import SocialDialog from "@/feature/profile/dialog/SocialDialog";
import { useState } from "react";

export default function SocialLinks() {
  const link = "https://twitter.com";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">SNS</h3>
        <SocialDialog open={isOpen} setIsOpen={setIsOpen} />
      </div>

      <ul className="flex flex-col gap-3 mt-3">
        <li className="border border-gray-200 rounded-md p-4 flex flex-col gap-2 text-sm">
          {/* 플랫폼명 */}
          <div className="flex items-center gap-2 text-muted-foreground font-medium">
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

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary truncate"
          >
            {link}
          </a>

          <div className="flex justify-between items-center ">
            <Switch />
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                onClick={() => setIsOpen(true)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 text-muted-foreground"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}
