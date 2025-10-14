import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useState } from "react";

type WorkAddDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function WorkInfoDialog({ open, setOpen }: WorkAddDialogProps) {
  const [title, setTitle] = useState("");
  const handleAddWork = () => {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => {}}>새 작품</Button>
      </DialogTrigger>
      <DialogContent className="w-8/9 max-w-2xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>작품 추가</DialogTitle>
          <DialogDescription>
            생성된 작품 하위에 콘텐츠를 자유롭게 구성할 수 있습니다. <br />
            목차로 콘텐츠를 구성해 단일 작품으로 만들 수도 있고,
            <br /> 여러 편을 이어 시리즈 형태로 전개할 수도 있습니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddWork} className="space-y-6">
          <Input
            id="title"
            label="작품 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="작품 제목을 입력하세요."
          />
          <DialogFooter>
            <Button onClick={handleAddWork} disabled={!title}>
              작품 추가 하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
