import { Pencil, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { AuthorSNS } from "@/feature/user/type";
import { Button } from "@/components/ui/button";

interface SocialLinkItemProps {
  social: AuthorSNS;
  setMode: (mode: "create" | "edit") => void;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedLink: (link: { platform: string; url: string }) => void; // 추가
}

export default function SocialLinkItem({
  social,
  setMode,
  setIsOpen,
  setSelectedLink,
}: SocialLinkItemProps) {
  return (
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
        {social.platform}
      </div>

      {/* 링크 주소 */}
      <a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary truncate"
      >
        {social.url}
      </a>

      <div className="flex justify-between items-center">
        <Switch />
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            onClick={() => {
              setMode("edit");
              setSelectedLink({ platform: social.platform, url: social.url }); // ✅ 전달
              setIsOpen(true);
            }}
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
  );
}
