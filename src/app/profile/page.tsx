import Image from "next/image";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileDialog } from "@/feature/profile/ProfileDialog";
import { PostDialog } from "@/feature/profile/PostDialog";
import { WorkDialog } from "@/feature/profile/WorkDialog";

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-40">
      {/* 사용자 정보 */}
      <section className="pb-4 border-b border-gray-200">
        <b className="block text-base lg:text-lg">1008sb@gmail.com</b>
        <span className="text-sm text-gray-500">@username</span>
      </section>

      {/* 작가 정보 */}
      <section className="space-y-4 ">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-base lg:text-lg">작가 정보</h3>
          <ProfileDialog />
        </div>

        <div className="flex gap-4 items-start">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/test.png" alt="프로필 이미지" />
            <AvatarFallback>프로필이미지</AvatarFallback>
          </Avatar>
          <div className="text-sm space-y-1">
            <strong className="block font-medium">필명</strong>
            <p className="text-gray-500">소개글을 예시를 써주세요.</p>
          </div>
        </div>
      </section>

      {/* 글 등록 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-base lg:text-lg">글 등록</h3>
          <PostDialog />
        </div>

        <div className="border border-gray-200 rounded-md text-sm text-gray-500 p-4">
          등록된 글이 없습니다.
        </div>
      </section>

      {/* 작품 등록 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-base lg:text-lg">작품 등록</h3>
          <WorkDialog />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="overflow-hidden">
              <div className="w-full h-40 bg-gray-100">
                <Image
                  src="/test.png"
                  alt="작품 이미지"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="px-4 pb-3 text-sm">
                <CardTitle className="text-base">랑과 나의 사막</CardTitle>
                {/* <CardDescription className="text-xs">소설</CardDescription> */}
                <p className="text-sm text-gray-500">
                  랑과 나의 사막에서 펼쳐지는 아름다운 이야기
                </p>
                <div className="flex items-center justify-between mt-4">
                  <a href="#" className="text-primary hover:text-primary/80">
                    링크
                  </a>
                  <p className="text-gray-500">수정하기</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
