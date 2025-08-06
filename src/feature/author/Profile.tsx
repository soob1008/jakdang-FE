"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Mail, Copy, Share2 } from "lucide-react";
import {
  Author,
  AuthorTag,
  AuthorSNS,
  AuthorLink,
  AuthorWork,
} from "@/feature/user/type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleAction } from "@/lib/api/action";
import { hasLikedAuthor, updateLikeAuthor } from "../viewer/api.server";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { event } from "@/lib/ga/gtag";

interface ProfileProps {
  user: Author & {
    user_tags: AuthorTag[];
    user_sns: AuthorSNS[];
    user_links: AuthorLink[];
    user_works: AuthorWork[];
  };
}
export default function Profile({ user }: ProfileProps) {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    const viewerId = localStorage.getItem("viewer_id");

    if (!viewerId) {
      console.error("Viewer ID가 없습니다. 좋아요 상태를 확인할 수 없습니다.");
      return;
    }

    (async () => {
      await handleAction(() => hasLikedAuthor(user.id, viewerId), {
        onSuccess: (data) => {
          setIsLike(Boolean(data.liked));
        },
      });
    })();
  }, [user]);

  const handleLikeToggle = async () => {
    event({
      action: "like_click",
      category: "engagement",
      label: "작가 좋아요",
    });

    const viewerId = localStorage.getItem("viewer_id");

    if (!viewerId) {
      console.error("Viewer ID가 없습니다. 좋아요를 처리할 수 없습니다.");
      return;
    }

    if (!user.slug) {
      console.error("User slug가 없습니다. 좋아요를 처리할 수 없습니다.");
      return;
    }

    await handleAction(
      () => updateLikeAuthor(user.id, viewerId, user.slug as string),
      {
        successMessage: isLike
          ? "좋아요를 취소했습니다."
          : "좋아요를 눌렀습니다.",
        errorMessage: "좋아요 처리 중 문제가 발생했어요.",
        onSuccess: (data) => {
          setIsLike(!!data.liked);
        },
      }
    );
  };

  const handleCopyLink = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/${user.slug}`);
    toast.success("링크가 클립보드에 복사되었습니다.");
  };

  const handleShare = async () => {
    event({
      action: "share_button_click",
      category: "engagement",
      label: "작가 공유하기",
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        // 공유 성공 후 처리 (선택 사항)
      } catch (error: unknown) {
        if ((error as Error).name !== "AbortError") {
          toast.error("공유에 실패했어요.");
        }
      }
    } else {
      toast.error("이 브라우저는 공유 기능을 지원하지 않아요.");
    }
  };

  return (
    <section className="flex flex-col items-center gap-2 ">
      <div className="text-center">
        <div className="overflow-hidden w-24 h-24 mx-auto rounded-full">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={
                user.profile_image_url
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.profile_image_url}`
                  : "/assets/profile_default.png"
              }
              alt="프로필 이미지"
              className="object-cover"
            />
            <AvatarFallback>
              <div className="w-full h-full bg-gray-200" />
            </AvatarFallback>
          </Avatar>
        </div>
        <h2 className="mt-3 text-lg font-bold">{user.display_name}</h2>
        <p className="text-sm text-gray-600 text-center">{user.tagline}</p>

        <ul className="mt-2 flex items-center justify-center gap-2">
          {user.user_tags.map((tag) => (
            <li key={tag.id} className="text-sm text-gray-400">
              #{tag.tag}
            </li>
          ))}
        </ul>

        {/* SNS 아이콘 자리 */}
        <div className="flex items-center justify-center gap-5 mt-4 flex-wrap">
          {/* Replace with actual icons */}
          {user.user_sns.map((sns) => (
            <a href={sns.url} rel="noopener noreferrer" key={sns.id}>
              <Image
                key={sns.id}
                src={`/assets/social/${sns.platform}.webp`}
                width={24}
                height={24}
                alt={sns.platform}
                className="w-5 h-5"
              />
            </a>
          ))}
          <a href={`mailto:${user.email}`} aria-label="이메일">
            <Mail className="w-6 h-6 text-gray-800 transition-colors" />
          </a>
        </div>
      </div>

      {/* 공유하기 */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleCopyLink}
          aria-label="링크 복사"
        >
          <Copy /> 복사
        </Button>
        <Button
          variant="outline-primary"
          size="sm"
          aria-label="링크 공유하기"
          onClick={handleShare}
        >
          <Share2 /> 공유
        </Button>
      </div>

      <div className="flex items-center justify-around w-full sm:w-1/2 text-sm text-gray-600 mt-6">
        <div className="flex flex-col items-center">
          <span className="font-semibold">{user.user_works.length}</span>
          <span>Works</span>
        </div>
        <div className="w-[1px] h-12 bg-gray-100"></div>
        <button
          className="text-center"
          aria-label="응원하기"
          onClick={handleLikeToggle}
        >
          <div className="font-semibold">{user.like_count || 0}</div>
          <div className="flex items-center gap-1">
            Likes
            <Heart
              className="w-4 h-4"
              fill={isLike ? "#f00" : "#fff"}
              stroke={isLike ? "#f00" : "currentColor"}
            />
          </div>
        </button>
      </div>
    </section>
  );
}
