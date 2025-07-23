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
  Gift,
  BookOpenText,
  ListChecks,
  Network,
} from "lucide-react";
import { useState } from "react";
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
        description: "이벤트 정보를 보여줘요",
        icon: Gift,
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
        icon: ListChecks,
      },
    ],
  },
];

export default function BlockSelectDialog({
  onSelect,
}: {
  onSelect: (type: string) => void;
}) {
  const [selectedType, setSelectedType] = useState<string>("");

  console.log(selectedType);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">블록 추가하기</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        {/* 너비 살짝 늘림 */}
        <DialogHeader>
          <DialogTitle>블록 선택</DialogTitle>
          <DialogDescription>추가할 블록을 하나 선택하세요.</DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <Button
            onClick={() => {
              if (selectedType) onSelect(selectedType);
            }}
            disabled={!selectedType}
          >
            추가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
