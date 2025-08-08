import Image from "next/image";
import { Profile } from "@/feature/user/type";

interface ProfileBlockProps {
  profile: Profile;
}

export default function ProfileBlock({ profile }: ProfileBlockProps) {
  const { is_active, headline, avatar_url } = profile || {};

  if (!is_active) return null; // 프로필 비활성화 시 표시 안 함

  return (
    <section className="flex flex-col items-center text-center">
      {/* 프로필 이미지 */}
      <div className="relative w-17.5 h-17.5 rounded-full overflow-hidden bg-muted">
        {avatar_url ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${avatar_url}`}
            alt={headline || "작가 프로필"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* 대표 문구 */}
      {headline && (
        <h2 className="mt-3.5 font-bold text-gray-900">
          {profile.display_name || "-"}
        </h2>
      )}

      {/* 작가 소개 */}
      {headline && (
        <p className="mt-1 text-xs text-gray-600 max-w-prose whitespace-pre-line">
          {headline}
        </p>
      )}
    </section>
  );
}
