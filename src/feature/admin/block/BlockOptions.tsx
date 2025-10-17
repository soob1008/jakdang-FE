import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import ImageOption from "./image/ImageOption";
import ListOption from "./list/ListOption";
import CalendarOption from "./calendar/CalendarOption";

interface BlockOptionsProps {
  type: string;
  index: number;
}

export default function BlockOptions({ type, index }: BlockOptionsProps) {
  const [showOptions, setShowOptions] = useState(false);

  if (
    type === "link" ||
    type === "sns" ||
    type === "challenge" ||
    type === "event" ||
    type === "blank" ||
    type === "book" ||
    type === "text"
  )
    return null;

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
          {type === "image" && <ImageOption index={index} />}
          {(type === "list" || type === "work") && (
            <ListOption index={index} />
          )}
          {type === "calendar" && <CalendarOption index={index} />}
        </div>
      )}
    </div>
  );
}
