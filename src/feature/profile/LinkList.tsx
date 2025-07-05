import { LinkDialog } from "@/feature/profile/dialog/LinkDialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash, Pencil } from "lucide-react";

export default function LinkList() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base lg:text-lg">외부 링크 등록</h3>
        <LinkDialog />
      </div>

      <ul className="flex flex-col gap-3 mt-3">
        <li className="p-4 border border-gray-200 rounded-md text-sm flex flex-col gap-2">
          {/* 상단: 링크 + 스위치 */}
          <div className="flex justify-between items-start">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary truncate max-w-[80%]"
            >
              https://example.com
            </a>
          </div>

          <div className="flex items-center justify-between">
            <Switch />
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
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
      </ul>
    </section>
  );
}
