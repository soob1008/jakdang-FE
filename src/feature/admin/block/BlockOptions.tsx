import { useState } from "react";
import { Button } from "@/components/ui/button";
import TextOption from "./text/TextOption";
import { ChevronDown, ChevronUp } from "lucide-react";

interface BlockOptionsProps {
  type: string;
}

export default function BlockOptions({ type }: BlockOptionsProps) {
  const [showOptions, setShowOptions] = useState(true);
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
        <div className="mt-2">
          {type === "text" && <TextOption index={0} />}
          {type === "image" && <p>이미지 관련 옵션</p>}
        </div>
      )}
    </div>
  );
}
