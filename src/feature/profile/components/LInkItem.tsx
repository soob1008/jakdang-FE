import { Switch } from "@/components/ui/switch";
import { AuthorLink } from "@/feature/user/type";
import { Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinkItemProps {
  link: AuthorLink;
}

export default function LinkItem({ link }: LinkItemProps) {
  return (
    <li className="p-4 border border-gray-200 rounded-md text-sm flex flex-col gap-2">
      {/* 링크 URL */}
      <div className="flex justify-between items-start">
        <a
          href={link.url}
          className="text-muted-foreground hover:text-primary truncate max-w-[80%]"
          target="_blank"
        >
          {link.url}
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
              // setMode("edit");
              // setSelectedLink(item);
              // setIsOpen(true);
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
  );
}
