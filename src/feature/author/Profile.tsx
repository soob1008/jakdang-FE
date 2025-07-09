"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Mail } from "lucide-react";
import {
  Author,
  AuthorTag,
  AuthorSNS,
  AuthorLink,
  AuthorWork,
} from "@/feature/user/type";

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
  // const [likeCount, setLikeCount] = useState(32); // 초기 좋아요 수

  return (
    <section className="flex flex-col items-center gap-2 ">
      <div className="text-center">
        <div className="overflow-hidden w-24 h-24 mx-auto rounded-full">
          <Image
            src={
              user.profile_image_url
                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.profile_image_url}`
                : "/assets/profile_default.png"
            }
            width={240}
            height={240}
            alt="작가 프로필 사진"
            className="w-24 h-24 object-cover"
          />
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
        <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
          {/* Replace with actual icons */}
          {user.user_sns.map((sns) => (
            <a
              href={sns.url}
              target="_blank"
              rel="noopener noreferrer"
              key={sns.id}
            >
              <Image
                key={sns.id}
                src={`/assets/social/${sns.platform}.webp`}
                width={24}
                height={24}
                alt={sns.platform}
                className="w-6 h-6"
              />
            </a>
          ))}
          <a href={`mailto:${user.email}`} aria-label="이메일">
            <Mail className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
          </a>
        </div>
      </div>

      <div className="flex justify-around w-full sm:w-1/2 text-sm text-gray-600 mt-6">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">{user.user_works.length}</span>
          <span>Books</span>
        </div>
        <div className="w-[1px] h-12 bg-gray-100"></div>
        <button
          className="text-center"
          aria-label="응원하기"
          onClick={() => {
            // setIsLike((prev) => !prev);
            // setLikeCount((prev) => prev + (isLike ? -1 : 1));
          }}
        >
          <div className="font-semibold">{user.likes_count}</div>
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
