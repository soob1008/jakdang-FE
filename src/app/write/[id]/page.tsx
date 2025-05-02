"use client";

import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
// import { toast } from "sonner";

const hostPageUrl = "https://joiny.app/manage/abc123";
const guestPageUrl = "https://joiny.app/invite/abc123";

export default function WriteCompletePage() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // toast.success("링크가 복사되었어요!");
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10">
      <section className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-[#1F2937] mb-2">
            🎉 초대장이 완성되었어요!
          </h1>
          <p className="text-sm text-gray-500">
            링크를 복사하거나 바로 이동해보세요.
          </p>
        </div>

        {/* 관리 페이지 링크 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#1F2937]">관리 페이지 링크</p>
          <div className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white">
            <span className="truncate text-sm text-gray-700">
              {hostPageUrl}
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(hostPageUrl)}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href={hostPageUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* 게스트 초대장 링크 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#1F2937]">초대장 링크</p>
          <div className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white">
            <span className="truncate text-sm text-gray-700">
              {guestPageUrl}
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(guestPageUrl)}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a
                  href={guestPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* 하단 액션 */}
        <div className="flex flex-col gap-3 pt-4">
          <Button asChild className="w-full">
            <a href={guestPageUrl} target="_blank">
              초대장 보기
            </a>
          </Button>
          <Button variant="outline" className="w-full">
            다시 만들기
          </Button>
        </div>
      </section>
    </main>
  );
}
