import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  FileText,
  ImageIcon,
  Link2,
  CalendarIcon,
  Medal,
  BookOpenText,
  ListChecks,
  Network,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

const blockList = [
  {
    category: "기본",
    blocks: [
      {
        type: "text",
        name: "텍스트",
        description: "간단한 문장을 작성해요",
        icon: FileText,
      },
      {
        type: "image",
        name: "이미지",
        description: "이미지를 업로드하거나 링크를 연결해요",
        icon: ImageIcon,
      },
      {
        type: "link",
        name: "링크",
        description: "외부 링크를 연결해요",
        icon: Link2,
      },
    ],
  },
  {
    category: "정보",
    blocks: [
      {
        type: "sns",
        name: "SNS",
        description: "SNS 링크를 연결해요",
        icon: Network,
      },
      {
        type: "calendar",
        name: "일정",
        description: "일정을 공유해요",
        icon: CalendarIcon,
      },
      {
        type: "event",
        name: "이벤트",
        description: "진행 중인 이벤트를 보여줘요",
        icon: ListChecks,
      },
    ],
  },
  {
    category: "콘텐츠",
    blocks: [
      {
        type: "work",
        name: "작품",
        description: "대표 작품을 보여줘요",
        icon: BookOpenText,
      },
      {
        type: "challenge",
        name: "챌린지",
        description: "진행 중인 챌린지를 보여줘요",
        icon: Medal,
      },
    ],
  },
];

interface BlockSelectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
}

export default function BlockDialog({
  open,
  onOpenChange,
  trigger,
}: BlockSelectDialogProps) {
  const [selectedType, setSelectedType] = useState<string>("");

  console.log(selectedType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>블록 선택</DialogTitle>
          <DialogDescription>추가할 블록을 하나 선택하세요.</DialogDescription>
        </DialogHeader>
        <div className="max-h-120 overflow-y-auto">
          <RadioGroup
            value={selectedType}
            onValueChange={setSelectedType}
            className="space-y-6"
          >
            {blockList.map((group) => (
              <div key={group.category} className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground">
                  {group.category}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {group.blocks.map((block) => {
                    const Icon = block.icon;
                    return (
                      <div key={block.type}>
                        <input
                          name="block"
                          type="radio"
                          value={block.type}
                          id={`block-${block.type}`}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={`block-${block.type}`}
                          className={cn(
                            "p-4 border h-32 rounded-md flex flex-col items-center gap-2 cursor-pointer transition",
                            "peer-checked:bg-secondary"
                          )}
                        >
                          <Icon className="w-6 h-6" />
                          <span className="font-medium text-sm">
                            {block.name}
                          </span>
                          <span className="text-xs text-muted-foreground text-center">
                            {block.description}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button onClick={() => {}} disabled={!selectedType}>
            추가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
