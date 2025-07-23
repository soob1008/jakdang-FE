import { useState } from "react";
import { Button } from "@/components/ui/button";
import TextOption from "./text/TextOption";
import { ChevronDown, ChevronUp } from "lucide-react";
import ImageOption from "./image/ImageOption";
import WorkOption from "./work/WorkOption";
import CalendarOption from "./calendar/CalendarOption";

interface BlockOptionsProps {
  type: string;
}

export default function BlockOptions({ type }: BlockOptionsProps) {
  const [showOptions, setShowOptions] = useState(true);

  if (type === "link") return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-end">
        <Button
          variant="outline-primary"
          size="sm"
          className="px-0 text-xs"
          onClick={() => setShowOptions((prev) => !prev)}
        >
          옵션{" "}
          {showOptions ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>
      {showOptions && (
        <div className="mt-2 border-t pt-4 space-y-6">
          {type === "text" && <TextOption index={0} />}
          {type === "image" && <ImageOption index={0} />}
          {
            /* 기타 블록 옵션 추가 예정 */ type === "work" && (
              <WorkOption index={0} />
            )
          }
          {type === "calendar" && <CalendarOption index={0} />}
          {/* {type === "link" && <LinkOption index={0} />} */}
        </div>
      )}
    </div>
  );
}
