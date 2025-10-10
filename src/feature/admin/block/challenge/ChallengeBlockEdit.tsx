"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Progress } from "@/shared/ui/progress";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
  link: string;
}

export default function ChallengeBlockEdit() {
  const [challenge, setChallenge] = useState<ChallengeItem | null>(null);

  useEffect(() => {
    // 예시 데이터
    const example: ChallengeItem = {
      id: "1",
      title: "매일 1문단 글쓰기",
      description: "매일 꾸준히 글쓰기 습관을 들이기 위한 챌린지입니다.",
      progress: 64,
      startDate: "2025-07-01",
      endDate: "2025-07-31",
      link: "/admin/challenges/1",
    };

    const today = new Date();
    if (new Date(example.endDate) >= today) {
      setChallenge(example);
    }
  }, []);

  if (!challenge) {
    return (
      <p className="text-muted-foreground text-sm">
        진행 중인 챌린지가 없습니다.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="챌린지를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="birthday">🎂 생일파티</SelectItem>
            <SelectItem value="house">🏠 집들이</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">{challenge.title}</h4>
        <Button variant="link" asChild className="text-sm px-0 h-auto">
          <a href={challenge.link} target="_blank" rel="noopener noreferrer">
            관리 <ExternalLink className="inline w-4 h-4 ml-1" />
          </a>
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">{challenge.description}</p>

      <p className="text-xs text-muted-foreground">
        {format(new Date(challenge.startDate), "PPP", { locale: ko })} ~{" "}
        {format(new Date(challenge.endDate), "PPP", { locale: ko })}
      </p>

      <Progress value={challenge.progress} className="h-2" />
    </div>
  );
}
