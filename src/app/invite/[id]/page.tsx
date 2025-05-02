"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  PackageCheck,
  Copy,
  MessageCircleMore,
} from "lucide-react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function InvitationPage() {
  const invitation = {
    title: "수빈이네 집들이",
    date: "2025년 5월 5일",
    time: "오후 5시",
    location: "서울시 마포구 합정동 123-4",
    items: ["와인 한 병", "편한 복장", "간단한 간식"],
  };

  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKakaoShare = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("YOUR_KAKAO_JAVASCRIPT_KEY"); // ✅ 여기에 실제 키 입력
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: invitation.title,
        description: `${invitation.date} • ${invitation.time}\n${invitation.location}`,
        imageUrl: "https://via.placeholder.com/300x200.png?text=Invitation", // ✅ 썸네일 이미지 URL
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: "초대장 보기",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  };

  useEffect(() => {
    // 카카오 SDK 로드
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-gray-900">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          {invitation.title}
        </h1>

        <SectionItem
          icon={<Calendar className="w-5 h-5 text-indigo-500" />}
          label="날짜"
          content={invitation.date}
        />
        <SectionItem
          icon={<Clock className="w-5 h-5 text-indigo-500" />}
          label="시간"
          content={invitation.time}
        />
        <SectionItem
          icon={<MapPin className="w-5 h-5 text-indigo-500" />}
          label="장소"
          content={invitation.location}
        />
        <SectionItem
          icon={<PackageCheck className="w-5 h-5 text-indigo-500" />}
          label="준비물"
          content={
            <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
              {invitation.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          }
        />

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-sm py-2 rounded-lg transition"
          >
            <Copy className="w-4 h-4" />
            링크 복사
          </button>

          <button
            onClick={handleKakaoShare}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-sm py-2 rounded-lg transition"
          >
            <MessageCircleMore className="w-4 h-4" />
            카카오톡 공유
          </button>
        </div>

        {copied && (
          <p className="text-xs text-green-600 mt-2 text-center">
            링크가 복사되었습니다 ✅
          </p>
        )}
      </div>
    </main>
  );
}

function SectionItem({
  icon,
  label,
  content,
}: {
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode | string;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="pt-1">{icon}</div>
      <div>
        <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
        <div className="text-base font-medium text-gray-900">{content}</div>
      </div>
    </div>
  );
}
