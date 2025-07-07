"use client";
import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function Profile() {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(32); // 초기 좋아요 수

  return (
    <section className="flex flex-col items-center gap-2 mb-6">
      <div className="text-center">
        <div className="overflow-hidden w-24 h-24 mx-auto rounded-full">
          <Image
            src="/test.png"
            width={240}
            height={240}
            alt="작가 프로필 사진"
            className="w-24 h-24"
          />
        </div>
        <h2 className="mt-3 text-lg font-bold">SUBIN</h2>
        <p className="text-sm text-gray-600 text-center">
          우연히 마주친 문장이 당신을 닮았으면 좋겠어요.
        </p>
        <p className="text-sm text-gray-400">#산문 #에세이</p>

        {/* SNS 아이콘 자리 */}
        <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
          {/* Replace with actual icons */}
          <Image
            src="/assets/social/instagram.webp"
            width={24}
            height={24}
            alt="Instagram"
            className="w-6 h-6"
          />
        </div>
      </div>

      <div className="flex justify-around w-full sm:w-1/2 text-sm text-gray-600 mt-6">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">0</span>
          <span>Books</span>
        </div>
        <div className="w-[1px] h-12 bg-gray-100"></div>
        <button
          className="text-center"
          aria-label="응원하기"
          onClick={() => {
            setIsLike((prev) => !prev);
            setLikeCount((prev) => prev + (isLike ? -1 : 1));
          }}
        >
          <div className="font-semibold">{likeCount}</div>
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
