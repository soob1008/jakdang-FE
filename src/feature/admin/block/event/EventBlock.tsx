import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";

interface EventItem {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  status: "open" | "closed";
  link: string;
}

export default function EventBlock() {
  const [event, setEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    // 예시 데이터 (실제로는 fetch로 교체 가능)
    const example: EventItem = {
      id: "evt-123",
      title: "7월 글쓰기 이벤트",
      description: "7월 한 달 동안 매일 글을 쓰고 인증하면 선물이 도착합니다!",
      image: "/images/event-banner.jpg",
      startDate: "2025-07-01",
      endDate: "2025-07-31",
      status: "open",
      link: "/admin/events/evt-123",
    };

    const today = new Date();
    if (new Date(example.endDate) >= today) {
      setEvent(example);
    }
  }, []);

  if (!event) {
    return (
      <p className="text-muted-foreground text-sm">
        진행 중인 이벤트가 없습니다.
      </p>
    );
  }

  return (
    <div className="">
      {/* 관리 링크 */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">{event.title}</h4>
        <Button variant="link" asChild className="text-sm px-0 h-auto">
          <a href={event.link} target="_blank" rel="noopener noreferrer">
            관리 <ExternalLink className="inline w-4 h-4 ml-1" />
          </a>
        </Button>
      </div>
      {/* 대표 이미지 */}
      {/* {event.image && (
        <div className="relative w-full h-40 overflow-hidden rounded-md">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      )} */}

      {/* 텍스트 정보 */}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{event.description}</p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(event.startDate), "PPP", { locale: ko })} ~{" "}
          {format(new Date(event.endDate), "PPP", { locale: ko })}
        </p>
        <Badge
          variant={event.status === "open" ? "default" : "secondary"}
          size="xs"
          className="mt-2 "
        >
          {event.status === "open" ? "모집중" : "마감"}
        </Badge>
      </div>
    </div>
  );
}
